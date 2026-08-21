export type Risk = "Low" | "Medium" | "High";
export type DealStatus = "Active" | "Closed";

export interface RoiPoint {
  year: string;
  value: number;
}

export interface Deal {
  id: string;
  company: string;
  industry: string;
  risk: Risk;
  stage: string;
  location: string;
  investmentRequired: number;
  roi: number;
  fundingRaised: number;
  status: DealStatus;
  founded: number;
  employees: number;
  description: string;
  metrics: {
    revenue: number;
    ebitda: number;
    growth: number;
  };
  roiProjection: RoiPoint[];
}

export interface Investor {
  id: string;
  name: string;
  type: string;
  budget: number;
  preferredIndustries: string[];
  riskTolerance: Risk;
  portfolioSize: number;
}

export interface DealFilters {
  search: string;
  industry: string;
  risk: string;
  minInvestment: number;
  maxInvestment: number;
  sort: string;
  page: number;
  pageSize: number;
}

export interface RecommendationProfile {
  industry: string;
  risk: Risk;
  budget: number;
}
