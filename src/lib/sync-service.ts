import prisma from './prisma';
import { calculateSuggestedPrice } from './pricing-engine';

/**
 * Recalcule et synchronise les services liés à une pièce spécifique.
 */
export async function syncServicesByPart(partId: string, reason: string = "Mise à jour coût pièce détectée") {
  const part = await prisma.part.findUnique({
    where: { id: partId },
  });

  if (!part) return;

  const services = await prisma.service.findMany({
    where: { partId },
    include: { model: { include: { type: true } } }
  });

  console.log(`[Sync] Début synchronisation pour ${services.length} services liés à la pièce ${part.name}`);

  for (const service of services) {
    const coeff = service.model?.type?.defaultCoefficient || 2.0;
    
    // Calcul du nouveau prix suggéré via le moteur central
    const newSuggestedPriceTTC = calculateSuggestedPrice({
      costHT: part.costPrice,
      laborHT: service.laborCost,
      extraHT: service.extraCosts,
      coeff,
      vatRate: service.vatRate,
      name: service.name,
    });

    const updateData: any = {
      suggestedPriceTTC: newSuggestedPriceTTC,
    };

    // En mode AUTO, on met aussi à jour le prix final
    if (service.pricingMode === 'AUTO') {
      updateData.finalPriceTTC = newSuggestedPriceTTC;
      updateData.lastPriceSyncAt = new Date();
      updateData.lastPriceSyncReason = reason;
      console.log(`[Sync] Service ${service.name} mis à jour en AUTO -> ${newSuggestedPriceTTC}€`);
    } else {
      console.log(`[Sync] Service ${service.name} (MANUAL) : Recommandation mise à jour -> ${newSuggestedPriceTTC}€ (Prix final inchangé)`);
    }

    await prisma.service.update({
      where: { id: service.id },
      data: updateData,
    });
  }
}

/**
 * Recalcule et synchronise tous les services d'une catégorie donnée.
 */
export async function syncServicesByCategory(typeId: string, reason: string = "Changement paramètres catégorie") {
  const type = await prisma.deviceType.findUnique({
    where: { id: typeId },
  });

  if (!type) return;

  const services = await prisma.service.findMany({
    where: { 
      model: { typeId }
    },
    include: { part: true }
  });

  console.log(`[Sync] Début synchronisation pour ${services.length} services de la catégorie ${type.name}`);

  for (const service of services) {
    const costHT = service.part?.costPrice || 0;
    
    const newSuggestedPriceTTC = calculateSuggestedPrice({
      costHT,
      laborHT: service.laborCost,
      extraHT: service.extraCosts,
      coeff: type.defaultCoefficient,
      vatRate: service.vatRate,
      name: service.name,
      categoryKey: undefined // Sera détecté par le nom dans le moteur si besoin
    });

    const updateData: any = {
      suggestedPriceTTC: newSuggestedPriceTTC,
    };

    if (service.pricingMode === 'AUTO') {
      updateData.finalPriceTTC = newSuggestedPriceTTC;
      updateData.lastPriceSyncAt = new Date();
      updateData.lastPriceSyncReason = reason;
      console.log(`[Sync] Service ${service.name} mis à jour en AUTO -> ${newSuggestedPriceTTC}€`);
    }

    await prisma.service.update({
      where: { id: service.id },
      data: updateData,
    });
  }
}
