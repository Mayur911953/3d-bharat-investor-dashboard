"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import DealTable from "@/components/DealTable";
import { getDeals } from "@/services/dealService";
import { useDebounce } from "@/hooks/useDebounce";
import type { Deal, DealFilters } from "@/types";

const industries = ["All","FinTech","HealthTech","SaaS","CleanTech","DeepTech","EdTech","AgriTech"];
const initial: DealFilters = { search:"", industry:"All", risk:"All", minInvestment:0, maxInvestment:10000000, sort:"roi-desc", page:1, pageSize:10 };

export default function DealsPage() {
  const [filters, setFilters] = useState(initial);
  const [data, setData] = useState<{items: Deal[]; total:number}>({items:[],total:0});
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebounce(filters.search);

  const request = useCallback(async () => {
    setLoading(true);
    try { setData(await getDeals({...filters, search: debouncedSearch})); } finally { setLoading(false); }
  }, [filters, debouncedSearch]);

  useEffect(() => { request(); }, [request]);

  const totalPages = Math.max(1, Math.ceil(data.total / filters.pageSize));
  const set = (patch: Partial<DealFilters>) => setFilters(f => ({...f, ...patch, ...(patch.page === undefined ? {page:1} : {})}));

  const title = useMemo(() => `${data.total} opportunities`, [data.total]);

  return <div className="page"><Header title="Deal Explorer" subtitle="Search, filter and compare investment opportunities" />
    <div className="filterCard">
      <input className="search" placeholder="Search company, industry, city..." value={filters.search} onChange={e=>set({search:e.target.value})}/>
      <select value={filters.industry} onChange={e=>set({industry:e.target.value})}>{industries.map(i=><option key={i}>{i}</option>)}</select>
      <select value={filters.risk} onChange={e=>set({risk:e.target.value})}><option>All</option><option>Low</option><option>Medium</option><option>High</option></select>
      <select value={filters.sort} onChange={e=>set({sort:e.target.value})}><option value="roi-desc">ROI: High to Low</option><option value="roi-asc">ROI: Low to High</option><option value="investment-asc">Investment: Low to High</option><option value="investment-desc">Investment: High to Low</option></select>
    </div>
    <div className="sectionTitle"><h2>{title}</h2><span>Page {filters.page} of {totalPages}</span></div>
    {loading ? <div className="loadingBox">Fetching simulated API data…</div> : <DealTable deals={data.items}/>}
    <div className="pagination"><button disabled={filters.page===1} onClick={()=>setFilters(f=>({...f,page:f.page-1}))}>← Previous</button><span>{filters.page} / {totalPages}</span><button disabled={filters.page===totalPages} onClick={()=>setFilters(f=>({...f,page:f.page+1}))}>Next →</button></div>
  </div>;
}
