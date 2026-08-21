"use client";
import { useMemo } from "react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import type { Deal } from "@/types";

export function GrowthChart({ deals }: { deals: Deal[] }) {
  const data = useMemo(() => {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return months.map((month, i) => ({
      month,
      investments: Math.round(deals.slice(0, 12).reduce((s, d) => s + d.investmentRequired, 0) * (0.42 + i * 0.055))
    }));
  }, [deals]);
  return <ChartShell title="Investment growth"><ResponsiveContainer width="100%" height={260}><AreaChart data={data}><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopOpacity={0.35}/><stop offset="100%" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" opacity={0.08}/><XAxis dataKey="month"/><YAxis tickFormatter={(v) => `₹${Math.round(v/1000000)}M`}/><Tooltip formatter={(v) => `₹${Number(v).toLocaleString()}`}/><Area type="monotone" dataKey="investments" strokeWidth={3} fill="url(#g)" /></AreaChart></ResponsiveContainer></ChartShell>;
}

export function IndustryChart({ deals }: { deals: Deal[] }) {
  const data = useMemo(
    () => Array.from(new Set(deals.map(d => d.industry))).map(name => ({ name, value: deals.filter(d => d.industry === name).length })),
    [deals]
  );
  const industryColors = ["#22d3ee", "#4ade80", "#a78bfa", "#fbbf24", "#fb7185", "#60a5fa", "#f97316", "#34d399"];
  return <ChartShell title="Industry distribution"><ResponsiveContainer width="100%" height={260}><BarChart data={data}><CartesianGrid strokeDasharray="3 3" opacity={0.08}/><XAxis dataKey="name"/><YAxis allowDecimals={false}/><Tooltip formatter={(value) => [`${Number(value)} deals`, "Count"]} labelFormatter={(label) => `Industry: ${label}`}/><Bar dataKey="value" name="Deal count" radius={[8,8,0,0]}>{data.map((entry,index)=><Cell key={`industry-${entry.name}`} fill={industryColors[index % industryColors.length]}/>)}</Bar></BarChart></ResponsiveContainer></ChartShell>;
}

export function RiskChart({ deals }: { deals: Deal[] }) {
  const data = ["Low","Medium","High"].map(name => ({ name, value: deals.filter(d => d.risk === name).length }));
  return <ChartShell title="Risk distribution"><ResponsiveContainer width="100%" height={260}><PieChart><Pie data={data} dataKey="value" nameKey="name" innerRadius={65} outerRadius={95} paddingAngle={4}>{data.map((_, i) => <Cell key={i} />)}</Pie><Tooltip/><Legend /></PieChart></ResponsiveContainer></ChartShell>;
}

export function RoiRiskChart({ deals }: { deals: Deal[] }) {
  const data = deals.slice(0, 18).map(d => ({ name: d.company.split(" ")[0], roi: d.roi, risk: d.risk === "Low" ? 1 : d.risk === "Medium" ? 2 : 3 }));
  return <ChartShell title="Risk vs ROI"><ResponsiveContainer width="100%" height={260}><BarChart data={data}><CartesianGrid strokeDasharray="3 3" opacity={0.08}/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="roi" radius={[7,7,0,0]} /></BarChart></ResponsiveContainer></ChartShell>;
}

function ChartShell({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="chartCard"><div className="sectionTitle"><h3>{title}</h3><span>Live simulation</span></div>{children}</section>;
}
