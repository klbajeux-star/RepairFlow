/**
 * RepairFlow Pricing Engine
 * Centralized logic for auto-pricing, commercial rounding, and margin analysis.
 */

export const PRICING_TIERS = [
  39, 49, 59, 69, 79, 89, 99, 109, 119, 129, 139, 149, 169, 189, 219, 249, 299, 349
];

export type ServiceCategory = 'SCREEN' | 'BATTERY' | 'CHARGING_PORT' | 'AUDIO' | 'CAMERA' | 'DIAGNOSTIC' | 'OTHER';

export const MIN_PRICES: Record<ServiceCategory, number> = {
  SCREEN: 99,
  BATTERY: 69,
  CHARGING_PORT: 89,
  AUDIO: 59,
  CAMERA: 79,
  DIAGNOSTIC: 29,
  OTHER: 0
};

export interface PricingParams {
  costHT: number;
  laborHT: number;
  extraHT: number;
  coeff: number;
  vatRate: number;
  name: string;
  categoryKey?: ServiceCategory;
}

export interface MarginAnalysis {
  marginHT: number;
  marginPercent: number;
  status: 'very_profitable' | 'profitable' | 'watch' | 'low';
  minMarginRate: number;
  suggestedPriceTTC: number;
}

/**
 * Detects the service category from the name as a fallback.
 */
export function detectCategory(name: string): ServiceCategory {
  const n = name.toUpperCase();
  if (n.includes('ÉCRAN') || n.includes('ECRAN') || n.includes('SCREEN') || n.includes('AFFICHEUR')) return 'SCREEN';
  if (n.includes('BATTERIE') || n.includes('BATTERY')) return 'BATTERY';
  if (n.includes('CONNECTEUR') || n.includes('CHARGE') || n.includes('DOCK') || n.includes('CHARGING')) return 'CHARGING_PORT';
  if (n.includes('AUDIO') || n.includes('MICRO') || n.includes('HAUT PARLEUR') || n.includes('SPEAKER') || n.includes('ÉCOUTEUR')) return 'AUDIO';
  if (n.includes('CAMÉRA') || n.includes('CAMERA') || n.includes('LENTILLE')) return 'CAMERA';
  if (n.includes('DIAGNOSTIC') || n.includes('DEVIS') || n.includes('RECHERCHE PANNE')) return 'DIAGNOSTIC';
  return 'OTHER';
}

/**
 * Calculates the suggested TTC price based on technical costs and business rules.
 */
export function calculateSuggestedPrice(params: PricingParams): number {
  const { costHT, laborHT, extraHT, coeff, vatRate, name, categoryKey } = params;
  
  // 1. Base technical calculation (Risk-adjusted markup on part + direct costs)
  const technicalPriceHT = (costHT * (coeff || 2.0)) + laborHT + extraHT;
  const technicalPriceTTC = technicalPriceHT * (1 + vatRate / 100);
  
  // 2. Commercial rounding (to the next tier)
  let roundedPrice = PRICING_TIERS.find(t => t >= technicalPriceTTC) || Math.ceil(technicalPriceTTC);
  
  // 3. Category minimum price enforcement
  const category = categoryKey || detectCategory(name);
  const minPrice = MIN_PRICES[category] || 0;
  
  return Math.max(roundedPrice, minPrice);
}

/**
 * Analyzes the profitability of a given final price.
 */
export function analyzeMargin(
  finalPriceTTC: number,
  params: PricingParams,
  minMarginRate: number = 30
): MarginAnalysis {
  const { costHT, laborHT, extraHT, vatRate } = params;
  
  const totalCostHT = costHT + laborHT + extraHT;
  const saleHT = finalPriceTTC / (1 + vatRate / 100);
  const marginHT = saleHT - totalCostHT;
  const marginPercent = saleHT > 0 ? (marginHT / saleHT) * 100 : 0;
  
  let status: MarginAnalysis['status'] = 'low';
  if (marginPercent >= minMarginRate + 15) status = 'very_profitable';
  else if (marginPercent >= minMarginRate) status = 'profitable';
  else if (marginPercent >= minMarginRate - 10) status = 'watch';
  else status = 'low';

  const suggestedPriceTTC = calculateSuggestedPrice(params);

  return {
    marginHT,
    marginPercent,
    status,
    minMarginRate,
    suggestedPriceTTC
  };
}

/**
 * Helper to convert TTC to HT
 */
export function ttcToHt(ttc: number, vatRate: number = 20): number {
  return ttc / (1 + vatRate / 100);
}

/**
 * Helper to convert HT to TTC
 */
export function htToTtc(ht: number, vatRate: number = 20): number {
  return ht * (1 + vatRate / 100);
}
