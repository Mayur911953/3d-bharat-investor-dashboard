"use client";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import { GrowthChart, IndustryChart } from "@/components/Charts";
import deals from "@/data/deals.json";
import type { Deal } from "@/types";

export default function Corporate() {
  const data = deals as Deal[];
  const funding = data.reduce((s,d)=>s+d.fundingRaised,0);
  return <div className="page"><Header title="Corporate Dashboard" subtitle="Funding analytics, investor activity and conversion trends" />
    <div className="statsGrid"><StatCard label="Total funding raised" value={`₹${(funding/10000000).toFixed(1)}Cr`} change="+18.6% YoY" icon="₹"/><StatCard label="Investor count" value="128" change="+14 this quarter" icon="◎"/><StatCard label="Conversion rate" value="24.8%" change="+3.1% this month" icon="%"/><StatCard label="Active pipeline" value="₹42.6Cr" change="31 opportunities" icon="↗"/></div>
    <div className="chartGrid"><GrowthChart deals={data}/><IndustryChart deals={data}/></div>
  </div>;
}
