"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import { GrowthChart, IndustryChart, RiskChart, RoiRiskChart } from "@/components/Charts";
import { getDealSummary } from "@/services/dealService";
import deals from "@/data/deals.json";
import type { Deal } from "@/types";

export default function Dashboard() {
  const [summary, setSummary] = useState<any>(null);
  const allDeals = deals as Deal[];
  useEffect(() => { getDealSummary().then(setSummary); }, []);
  return <div className="page"><Header title="Investor Dashboard" subtitle="Portfolio intelligence and market opportunities" />
    {!summary ? <div className="loadingGrid">{[1,2,3,4].map(i => <div className="skeleton" key={i}/>)}</div> :
    <><div className="statsGrid">
      <StatCard label="Total Investments" value={`₹${(summary.totalInvestments/10000000).toFixed(1)}Cr`} change="+12.8% this quarter" icon="↗"/>
      <StatCard label="Active Deals" value={String(summary.activeDeals)} change="+8 new this month" icon="◆"/>
      <StatCard label="Average ROI" value={`${summary.averageRoi.toFixed(1)}%`} change="+2.4% vs benchmark" icon="%"/>
      <StatCard label="Portfolio Health" value="84/100" change="Strong risk-adjusted return" icon="✓"/>
    </div>
    <div className="chartGrid"><GrowthChart deals={allDeals}/><IndustryChart deals={allDeals}/><RiskChart deals={allDeals}/><RoiRiskChart deals={allDeals}/></div>
    <section className="riskDistributionCard"><div className="sectionTitle"><div><h2>Risk Distribution</h2><p>Current deal mix by risk level</p></div><span>Explicit portfolio risk view</span></div><div className="riskDistributionGrid">{["Low","Medium","High"].map((risk)=>{const count=allDeals.filter(d=>d.risk===risk).length;const percentage=Math.round((count/allDeals.length)*100);return <div className={`riskMetric ${risk.toLowerCase()}`} key={risk}><div className="riskMetricTop"><span>{risk} Risk</span><strong>{count}</strong></div><div className="riskBar"><span style={{width:`${percentage}%`}} /></div><small>{percentage}% of active dataset</small></div>;})}</div></section></>}
  </div>;
}
