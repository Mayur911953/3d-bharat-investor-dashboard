"use client";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/store/uiSlice";
import type { RootState } from "@/store/store";

export default function Header({ title, subtitle }: { title: string; subtitle: string }) {
  const dispatch = useDispatch();
  const dark = useSelector((s: RootState) => s.ui.darkMode);
  return (
    <header className="header">
      <div><h1>{title}</h1><p>{subtitle}</p></div>
      <div className="headerActions">
        <button className="iconBtn" onClick={() => dispatch(toggleDarkMode())}>{dark ? "☀" : "☾"}</button>
        <div className="profile"><span>MC</span><div><strong>Mayur</strong><small>Investor</small></div></div>
      </div>
    </header>
  );
}
