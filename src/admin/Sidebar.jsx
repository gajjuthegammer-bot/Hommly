"use client";

import { useState } from "react";
import {
  IconGrid,
  IconBuilding,
  IconUsers,
  IconCalendar,
  IconStar,
  IconMessage,
  IconSettings,
  IconLogout,
} from "./Icons";

const NAV_ITEMS = [
  { section: "Overview", items: [{ label: "Dashboard", icon: IconGrid }] },
  {
    section: "Management",
    items: [
      { label: "Properties", icon: IconBuilding, count: 128 },
      { label: "Agents", icon: IconUsers, count: 14 },
      { label: "Bookings", icon: IconCalendar, count: 9 },
      { label: "Reviews", icon: IconStar },
      { label: "Messages", icon: IconMessage, count: 3 },
    ],
  },
  { section: "System", items: [{ label: "Settings", icon: IconSettings }] },
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">EH</div>
        <span className="brand-name">EstateHub</span>
      </div>

      <nav>
        {NAV_ITEMS.map((group) => (
          <div key={group.section}>
            <div className="nav-label">{group.section}</div>
            {group.items.map(({ label, icon: Icon, count }) => (
              <button
                key={label}
                className={`nav-item${active === label ? " active" : ""}`}
                onClick={() => setActive(label)}
              >
                <Icon />
                {label}
                {count ? <span className="count">{count}</span> : null}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="upgrade-card">
          <h5>Go Pro</h5>
          <p>Unlock analytics, bulk exports and priority support.</p>
          <button>Upgrade plan</button>
        </div>
        <button className="nav-item">
          <IconLogout />
          Log out
        </button>
      </div>
    </aside>
  );
}