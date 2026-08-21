import type { Deal, RecommendationProfile } from "@/types";

const riskWeight: Record<string, number> = { Low: 3, Medium: 2, High: 1 };

export function scoreDeal(deal: Deal, profile: RecommendationProfile): number {
  let score = 0;
  if (deal.industry === profile.industry) score += 30;
  if (deal.risk === profile.risk) score += 25;
  else score += Math.max(0, 18 - Math.abs(riskWeight[deal.risk] - riskWeight[profile.risk]) * 8);
  if (deal.investmentRequired <= profile.budget) score += 25;
  else score += Math.max(0, 25 - ((deal.investmentRequired - profile.budget) / profile.budget) * 25);
  score += Math.min(20, deal.roi * 0.8);
  return Math.round(Math.min(100, score));
}

export function recommendDeals(deals: Deal[], profile: RecommendationProfile) {
  return deals
    .map((deal) => ({ deal, score: scoreDeal(deal, profile) }))
    .sort((a, b) => b.score - a.score);
}
