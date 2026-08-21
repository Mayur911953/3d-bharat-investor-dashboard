"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  ["Dashboard", "/"],
  ["Deal Explorer", "/deals"],
  ["Recommendations", "/recommendations"],
  ["My Investments", "/investments"],
  ["Corporate", "/corporate"]
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brandMark">3D</span>

        <div>
          <strong>Bharat</strong>
          <small>Investment OS</small>
        </div>
      </div>

      <nav>
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className={path === href ? "navItem active" : "navItem"}
          >
            <span className="navDot" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}