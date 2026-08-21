import deals from "@/data/deals.json";
import type { Deal, DealFilters } from "@/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getDeals(filters: DealFilters): Promise<{ items: Deal[]; total: number }> {
  await delay(300 + Math.floor(Math.random() * 500));

  let result = deals as Deal[];

  if (filters.search.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter((d) =>
      [d.company, d.industry, d.location, d.stage].some((v) => v.toLowerCase().includes(q))
    );
  }

  if (filters.industry !== "All") result = result.filter((d) => d.industry === filters.industry);
  if (filters.risk !== "All") result = result.filter((d) => d.risk === filters.risk);
  result = result.filter(
    (d) => d.investmentRequired >= filters.minInvestment && d.investmentRequired <= filters.maxInvestment
  );

  switch (filters.sort) {
    case "roi-desc": result.sort((a, b) => b.roi - a.roi); break;
    case "roi-asc": result.sort((a, b) => a.roi - b.roi); break;
    case "investment-desc": result.sort((a, b) => b.investmentRequired - a.investmentRequired); break;
    case "investment-asc": result.sort((a, b) => a.investmentRequired - b.investmentRequired); break;
    default: result.sort((a, b) => a.company.localeCompare(b.company));
  }

  const total = result.length;
  const start = (filters.page - 1) * filters.pageSize;
  return { items: result.slice(start, start + filters.pageSize), total };
}

export async function getDealById(id: string): Promise<Deal | null> {
  await delay(350);
  return (deals as Deal[]).find((deal) => deal.id === id) ?? null;
}

export async function getDealSummary() {
  await delay(300);
  const all = deals as Deal[];
  return {
    totalInvestments: all.reduce((sum, d) => sum + d.investmentRequired, 0),
    activeDeals: all.filter((d) => d.status === "Active").length,
    averageRoi: all.reduce((sum, d) => sum + d.roi, 0) / all.length,
    riskDistribution: ["Low", "Medium", "High"].map((risk) => ({
      name: risk,
      value: all.filter((d) => d.risk === risk).length
    }))
  };
}
