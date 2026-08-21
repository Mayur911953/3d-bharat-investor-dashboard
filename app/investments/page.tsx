"use client";
import Header from "@/components/Header";
import DealTable from "@/components/DealTable";
import deals from "@/data/deals.json";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import type { Deal } from "@/types";

export default function Investments() {
  const saved = useSelector((s: RootState) => s.ui.savedDeals);
  const items = (deals as Deal[]).filter(d => saved.includes(d.id));
  return <div className="page"><Header title="My Investments" subtitle="Saved opportunities persisted in your local session" />
    <div className="statsGrid"><div className="statCard"><span>Saved opportunities</span><strong className="statValue">{items.length}</strong><span className="positive">LocalStorage-ready state</span></div><div className="statCard"><span>Potential capital</span><strong className="statValue">₹{(items.reduce((s,d)=>s+d.investmentRequired,0)/100000).toFixed(1)}L</strong><span className="positive">Based on selected deals</span></div></div>
    <div className="sectionTitle"><h2>Saved deals</h2></div>
    {items.length === 0 ? (
      <div className="emptyState"><div className="emptyIcon">☆</div><h3>No investments yet</h3><p>You haven&apos;t saved any investment opportunities. Explore the Deal Explorer to find deals that match your strategy.</p><a className="ctaButton" href="/deals">Explore Deals</a></div>
    ) : <DealTable deals={items}/>}
  </div>;
}
