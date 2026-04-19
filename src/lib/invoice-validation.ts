import { DocumentData, InvoiceLine, TaxDetail, WorkshopSettings } from './pdf-generator'

export type ValidationSeverity = 'error' | 'warning' | 'info'

export interface ValidationMessage {
  code: string
  severity: ValidationSeverity
  field?: string
  message: string
  details?: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationMessage[]
  warnings: ValidationMessage[]
  infos: ValidationMessage[]
}

/**
 * Système de validation centralisé pour la conformité EN16931 / Factur-X
 */
export function validateInvoiceForIssuance(data: DocumentData): ValidationResult {
  const errors: ValidationMessage[] = []
  const warnings: ValidationMessage[] = []
  const infos: ValidationMessage[] = []

  // 1. Validation de l'en-tête
  validateHeader(data, errors, warnings)

  // 2. Validation du vendeur (Atelier)
  validateSeller(data, errors, warnings)

  // 3. Validation du client
  validateBuyer(data, errors, warnings)

  // 4. Validation des lignes
  validateLines(data.items, data.type, errors, warnings)

  // 5. Validation des totaux et taxes
  validateTotals(data, errors, warnings)

  // 6. Validation du paiement
  validatePayment(data, errors, warnings)

  // 7. Validation Factur-X / EN16931 specific
  validateFacturXCompatibility(data, errors, warnings, infos)

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    infos
  }
}

function validateHeader(data: DocumentData, errors: ValidationMessage[], warnings: ValidationMessage[]) {
  const label = data.type === 'quote' ? 'devis' : 'facture'
  if (!data.number || (data.number === 'NOUVEAU' && data.type === 'invoice')) {
    errors.push({ code: 'HDR_NUM_MISSING', severity: 'error', field: 'number', message: `Numéro de ${label} obligatoire.` })
  }
  if (!data.date) {
    errors.push({ code: 'HDR_DATE_MISSING', severity: 'error', field: 'date', message: 'Date d\'émission obligatoire.' })
  }
}

function validateSeller(data: DocumentData, errors: ValidationMessage[], warnings: ValidationMessage[]) {
  const settings = data.settings
  const isInvoice = data.type === 'invoice'

  if (!settings) {
    errors.push({ code: 'SEL_MISSING', severity: 'error', message: 'Paramètres de l\'atelier manquants.' })
    return
  }

  if (!settings.name) {
    const msg = 'Nom de la société obligatoire.'
    isInvoice ? errors.push({ code: 'SEL_NAME_MISSING', severity: 'error', field: 'settings.name', message: msg }) 
              : warnings.push({ code: 'SEL_NAME_MISSING', severity: 'warning', field: 'settings.name', message: msg })
  }
  if (!settings.address) {
    const msg = 'Adresse de la société obligatoire.'
    isInvoice ? errors.push({ code: 'SEL_ADDR_MISSING', severity: 'error', field: 'settings.address', message: msg })
              : warnings.push({ code: 'SEL_ADDR_MISSING', severity: 'warning', field: 'settings.address', message: msg })
  }
  if (!settings.zipCode) {
    const msg = 'Code postal de la société obligatoire.'
    isInvoice ? errors.push({ code: 'SEL_ZIP_MISSING', severity: 'error', field: 'settings.zipCode', message: msg })
              : warnings.push({ code: 'SEL_ZIP_MISSING', severity: 'warning', field: 'settings.zipCode', message: msg })
  }
  if (!settings.city) {
    const msg = 'Ville de la société obligatoire.'
    isInvoice ? errors.push({ code: 'SEL_CITY_MISSING', severity: 'error', field: 'settings.city', message: msg })
              : warnings.push({ code: 'SEL_CITY_MISSING', severity: 'warning', field: 'settings.city', message: msg })
  }
  
  const siret = (settings.siret || '').replace(/\s/g, '')
  if (!siret) {
    if (isInvoice) {
      errors.push({ code: 'SEL_SIRET_MISSING', severity: 'error', field: 'settings.siret', message: 'SIRET de votre atelier obligatoire.' })
    } else {
      warnings.push({ code: 'SEL_SIRET_MISSING', severity: 'warning', field: 'settings.siret', message: 'SIRET de votre atelier manquant (obligatoire pour la facture finale).' })
    }
  } else if (siret.length !== 14) {
    warnings.push({ code: 'SEL_SIRET_INVALID', severity: 'warning', field: 'settings.siret', message: 'Le SIRET doit comporter 14 chiffres.' })
  }

  if (!settings.vatNumber) {
    warnings.push({ code: 'SEL_VAT_MISSING', severity: 'warning', field: 'settings.vatNumber', message: 'Numéro de TVA intracommunautaire recommandé.' })
  }
}

function validateBuyer(data: DocumentData, errors: ValidationMessage[], warnings: ValidationMessage[]) {
  const client = data.client
  if (!client.name) errors.push({ code: 'BUY_NAME_MISSING', severity: 'error', field: 'client.name', message: 'Nom du client obligatoire.' })
  if (!client.address) errors.push({ code: 'BUY_ADDR_MISSING', severity: 'error', field: 'client.address', message: 'Adresse du client obligatoire.' })
  if (!client.zipCode) errors.push({ code: 'BUY_ZIP_MISSING', severity: 'error', field: 'client.zipCode', message: 'Code postal du client obligatoire.' })
  if (!client.city) errors.push({ code: 'BUY_CITY_MISSING', severity: 'error', field: 'client.city', message: 'Ville du client obligatoire.' })

  if (client.clientType === 'Professionnel' || (client.name && client.name.length > 20)) {
    if (!client.siret) {
      warnings.push({ code: 'BUY_SIRET_MISSING', severity: 'warning', field: 'client.siret', message: 'SIRET client manquant pour un professionnel.' })
    }
  }
}

function validateLines(items: InvoiceLine[], type: 'quote' | 'invoice', errors: ValidationMessage[], warnings: ValidationMessage[]) {
  if (!items || items.length === 0) {
    errors.push({ code: 'LNS_EMPTY', severity: 'error', message: 'Le document doit contenir au moins une ligne.' })
    return
  }

  items.forEach((item, index) => {
    const prefix = `Ligne ${index + 1}`
    if (!item.name) errors.push({ code: 'LNS_NAME_MISSING', severity: 'error', message: `${prefix} : Description manquante.` })
    if (item.quantity <= 0) errors.push({ code: 'LNS_QTY_INVALID', severity: 'error', message: `${prefix} : La quantité doit être supérieure à 0.` })
    if (item.price < 0) errors.push({ code: 'LNS_PRICE_INVALID', severity: 'error', message: `${prefix} : Le prix ne peut pas être négatif.` })
    
    if (!item.unit) {
      if (type === 'invoice') {
        errors.push({ code: 'LNS_UNIT_MISSING', severity: 'error', message: `${prefix} : Unité de mesure manquante (C62 recommandé).` })
      } else {
        warnings.push({ code: 'LNS_UNIT_MISSING', severity: 'warning', message: `${prefix} : Unité de mesure manquante.` })
      }
    } else if (!['C62', 'HUR'].includes(item.unit)) {
      warnings.push({ code: 'LNS_UNIT_UNKNOWN', severity: 'warning', message: `${prefix} : Unité '${item.unit}' non standard (C62 ou HUR recommandés).` })
    }
  })
}

function validateTotals(data: DocumentData, errors: ValidationMessage[], warnings: ValidationMessage[]) {
  const calculatedHT = data.items.reduce((sum, item) => {
    const rate = item.vatRate || 20
    const lineHT = (item.price * item.quantity) / (1 + rate / 100)
    return sum + lineHT
  }, 0)

  // Tolérance d'arrondi de 0.05€
  if (Math.abs(calculatedHT - data.totalHT) > 0.05) {
    errors.push({ 
      code: 'TOT_HT_MISMATCH', 
      severity: 'error', 
      message: 'Incohérence du Total HT.',
      details: `Calculé: ${calculatedHT.toFixed(2)}€ vs Document: ${data.totalHT.toFixed(2)}€`
    })
  }

  const calculatedTTC = data.totalHT + data.tva
  if (Math.abs(calculatedTTC - data.totalTTC) > 0.02) {
    errors.push({ code: 'TOT_TTC_MISMATCH', severity: 'error', message: 'Incohérence Total HT + TVA = TTC.' })
  }
}

function validatePayment(data: DocumentData, errors: ValidationMessage[], warnings: ValidationMessage[]) {
  const isInvoice = data.type === 'invoice'
  
  if (!data.paymentMethod) {
    const msg = 'Mode de règlement obligatoire.'
    isInvoice ? errors.push({ code: 'PAY_METHOD_MISSING', severity: 'error', field: 'paymentMethod', message: msg })
              : warnings.push({ code: 'PAY_METHOD_MISSING', severity: 'warning', field: 'paymentMethod', message: msg })
  }

  if (isInvoice) {
    if (!data.dueDate) {
      errors.push({ code: 'PAY_DUE_DATE_MISSING', severity: 'error', field: 'dueDate', message: 'Date d\'échéance obligatoire.' })
    } else {
      const issueDate = new Date(data.date).setHours(0,0,0,0)
      const dueDate = new Date(data.dueDate).setHours(0,0,0,0)
      if (dueDate < issueDate) {
        errors.push({ code: 'PAY_DUE_DATE_PAST', severity: 'error', field: 'dueDate', message: 'L\'échéance ne peut être antérieure à la date d\'émission.' })
      } else if (dueDate === issueDate) {
        warnings.push({ code: 'PAY_DUE_DATE_TODAY', severity: 'warning', field: 'dueDate', message: 'Échéance fixée au jour même.' })
      }
    }
  }

  if (data.paymentMethod === 'VIREMENT') {
    if (!data.settings?.iban) {
      errors.push({ code: 'PAY_IBAN_MISSING', severity: 'error', field: 'settings.iban', message: 'IBAN manquant pour un paiement par virement.' })
    }
    if (!data.settings?.bic) {
      warnings.push({ code: 'PAY_BIC_MISSING', severity: 'warning', field: 'settings.bic', message: 'BIC recommandé pour les virements.' })
    }
  }
}

function validateFacturXCompatibility(data: DocumentData, errors: ValidationMessage[], warnings: ValidationMessage[], infos: ValidationMessage[]) {
  infos.push({ code: 'FX_PROFILE', severity: 'info', message: 'Profil cible : EN 16931 (Comfort).' })
  
  if (data.type === 'invoice') {
    infos.push({ code: 'FX_XML_READY', severity: 'info', message: 'Structure XML prête pour injection Factur-X.' })
  }

  // Vérification de la mention légale si exonération TVA (TVA à 0%)
  const hasZeroVat = data.items.some(item => (item.vatRate || 20) === 0)
  if (hasZeroVat) {
    if (!data.notes || !data.notes.includes('293 B')) {
      warnings.push({ 
        code: 'TAX_EXEMPT_NOTE_MISSING', 
        severity: 'warning', 
        field: 'notes', 
        message: 'Mention d\'exonération (Art. 293 B) recommandée si TVA à 0%.' 
      })
    }
  }
}
