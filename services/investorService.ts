import investors from "@/data/investors.json";
import type { Investor } from "@/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getInvestors(): Promise<Investor[]> {
  await delay(450);
  return investors as Investor[];
}
