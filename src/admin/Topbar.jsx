"use client";

import { useState } from "react";
import { IconSearch, IconBell, IconChevronDown, IconSettings, IconLogout, IconUsers } from "./Icons";

export default function Topbar({ title, subtitle }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="page-title">
        <h1>{title}</h1>
        {subtitle ? <span>{subtitle}</span> : null}
      </div>

      <div className="search-box">
        <IconSearch />
        <input type="text" placeholder="Search properties, agents, bookings..." />
      </div>

      <button className="icon-btn" aria-label="Notifications">
        <IconBell />
        <span className="dot" />
      </button>

      <div className="user-dropdown-wrapper">
        <button className="user-trigger-btn" onClick={() => setOpen((v) => !v)}>
          <div className="user-avatar">RA</div>
          <div className="user-meta">
            <span className="user-name">Riya Agarwal</span>
            <span className="user-role">Admin</span>
          </div>
          <IconChevronDown className={`chevron${open ? " rotate" : ""}`} />
        </button>

        {open ? (
          <div className="user-dropdown-menu" style={{ minWidth: 220 }}>
            <div className="dropdown-header">
              <div className="user-avatar large">RA</div>
              <div>
                <p className="dropdown-user-name">Riya Agarwal</p>
                <p className="dropdown-user-email">riya@estatehub.com</p>
              </div>
            </div>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="#">
              <IconUsers /> My profile
            </a>
            <a className="dropdown-item" href="#">
              <IconSettings /> Account settings
            </a>
            <div className="dropdown-divider" />
            <button className="dropdown-item logout" style={{ width: "100%" }}>
              <IconLogout /> Log out
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}