"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleSavedDeal } from "@/store/uiSlice";
import type { RootState } from "@/store/store";
import type { Deal } from "@/types";

const money = (n: number) => `₹${(n / 100000).toFixed(1)}L`;

export default function DealTable({ deals, scores }: { deals: Deal[]; scores?: Record<string, number> }) {
  const dispatch = useDispatch();
  const saved = useSelector((s: RootState) => s.ui.savedDeals);
  if (!deals.length) return <div className="empty">No deals match your filters.</div>;
  return <div className="tableWrap"><table><thead><tr><th>Company</th><th>Industry</th><th>Risk</th><th>Investment</th><th>ROI</th>{scores && <th>Match</th>}<th></th></tr></thead>
    <tbody>{deals.map(d => <tr key={d.id}>
      <td><Link href={`/deals/${d.id}`} className="companyLink"><strong>{d.company}</strong><small>{d.stage} · {d.location}</small></Link></td>
      <td>{d.industry}</td><td><span className={`pill ${d.risk.toLowerCase()}`}>{d.risk}</span></td><td>{money(d.investmentRequired)}</td><td><strong>{d.roi}%</strong></td>
      {scores && <td><span className="score">{scores[d.id] ?? 0}%</span></td>}
      <td><button className="saveBtn" onClick={() => dispatch(toggleSavedDeal(d.id))}>{saved.includes(d.id) ? "★" : "☆"}</button></td>
    </tr>)}</tbody></table></div>;
}
