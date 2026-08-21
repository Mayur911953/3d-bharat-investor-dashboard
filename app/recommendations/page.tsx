"use client";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import DealTable from "@/components/DealTable";
import deals from "@/data/deals.json";
import { recommendDeals } from "@/services/recommendationService";
import type { Deal, Risk } from "@/types";

export default function Recommendations() {
  const [industry, setIndustry] = useState("FinTech");
  const [risk, setRisk] = useState<Risk>("Medium");
  const [budget, setBudget] = useState(2500000);
  const recommendations = useMemo(() => recommendDeals(deals as Deal[], {industry, risk, budget}), [industry, risk, budget]);
  const top = recommendations.slice(0, 10).map(x => x.deal);
  const scores = Object.fromEntries(recommendations.map(x => [x.deal.id, x.score]));
  return <div className="page"><Header title="Recommendation Engine" subtitle="Deals ranked by risk, industry, budget and ROI fit" />
    <div className="recommendCard"><div><small>Your investment profile</small><h2>Find your best-fit opportunities</h2></div><select value={industry} onChange={e=>setIndustry(e.target.value)}><option>FinTech</option><option>HealthTech</option><option>SaaS</option><option>CleanTech</option><option>DeepTech</option><option>EdTech</option><option>AgriTech</option></select><select value={risk} onChange={e=>setRisk(e.target.value as Risk)}><option>Low</option><option>Medium</option><option>High</option></select><input type="range" min="500000" max="10000000" step="250000" value={budget} onChange={e=>setBudget(Number(e.target.value))}/><strong>Budget ₹{(budget/100000).toFixed(1)}L</strong></div>
    <div className="sectionTitle"><h2>Top matches</h2><span>Memoized scoring</span></div><DealTable deals={top} scores={scores}/></div>;
}
