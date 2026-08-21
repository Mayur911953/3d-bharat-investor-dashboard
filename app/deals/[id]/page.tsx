"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Header from "@/components/Header";
import { getDealById } from "@/services/dealService";
import type { Deal } from "@/types";

export default function DealDetails({ params }: { params: Promise<{id:string}> }) {
  const [deal, setDeal] = useState<Deal | null>(null);
  const [tab, setTab] = useState("overview");
  useEffect(() => { params.then(p => getDealById(p.id).then(setDeal)); }, [params]);
  if (!deal) return <div className="page"><Header title="Deal Details" subtitle="Loading opportunity…" /><div className="loadingBox">Loading deal data…</div></div>;

  return <div className="page"><Header title={deal.company} subtitle={`${deal.industry} · ${deal.stage} · ${deal.location}`} />
    <Link href="/deals" className="back">← Back to deals</Link>
    <div className="heroDeal"><div><span className={`pill ${deal.risk.toLowerCase()}`}>{deal.risk} risk</span><h2>{deal.company}</h2><p>{deal.description}</p></div><div className="heroRoi"><small>Projected ROI</small><strong>{deal.roi}%</strong></div></div>
    <div className="metricGrid"><Metric label="Investment required" value={`₹${(deal.investmentRequired/100000).toFixed(1)}L`}/><Metric label="Funding raised" value={`₹${(deal.fundingRaised/100000).toFixed(1)}L`}/><Metric label="Revenue" value={`₹${(deal.metrics.revenue/100000).toFixed(1)}L`}/><Metric label="Growth" value={`${deal.metrics.growth}%`}/></div>
    <div className="tabs">{["overview","financials","risk"].map(t=><button key={t} className={tab===t?"tab active":"tab"} onClick={()=>setTab(t)}>{t}</button>)}</div>
    {tab==="overview" && <div className="detailGrid"><section className="chartCard"><div className="sectionTitle"><h3>ROI Projection</h3><span>5-year model</span></div><ResponsiveContainer width="100%" height={320}><LineChart data={deal.roiProjection}><CartesianGrid strokeDasharray="3 3" opacity={0.08}/><XAxis dataKey="year"/><YAxis/><Tooltip/><Line type="monotone" dataKey="value" strokeWidth={3}/></LineChart></ResponsiveContainer></section><section className="infoCard"><h3>Company profile</h3><Info label="Founded" value={String(deal.founded)}/><Info label="Employees" value={deal.employees.toLocaleString()}/><Info label="Status" value={deal.status}/><Info label="Location" value={deal.location}/></section></div>}
    {tab==="financials" && <div className="infoCard"><h3>Financial metrics</h3><Info label="Revenue" value={`₹${deal.metrics.revenue.toLocaleString()}`}/><Info label="EBITDA" value={`₹${deal.metrics.ebitda.toLocaleString()}`}/><Info label="Growth" value={`${deal.metrics.growth}%`}/></div>}
    {tab==="risk" && <div className="infoCard"><h3>Risk analysis</h3><p>This simulated assessment combines company stage, industry volatility and projected returns. The current profile is <strong>{deal.risk}</strong> risk.</p></div>}
  </div>;
}
function Metric({label,value}:{label:string;value:string}) { return <div className="metric"><small>{label}</small><strong>{value}</strong></div>; }
function Info({label,value}:{label:string;value:string}) { return <div className="infoRow"><span>{label}</span><strong>{value}</strong></div>; }
