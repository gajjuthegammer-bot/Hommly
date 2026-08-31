import {
  LayoutDashboard,
  Building2,
  Users,
  UserRoundCog,
  MessageSquareText,
  Images,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  BedDouble,
  Bath,
  Ruler,
  MapPin,
  TrendingUp,
  CalendarDays,
  ChevronDown,
} from "lucide-react";
// import "./d-style.css";

const stats = [
  { label: "Total Properties", value: "248", change: "+12.5%", positive: true, icon: Building2 },
  { label: "Active Listings", value: "186", change: "+8.2%", positive: true, icon: TrendingUp },
  { label: "Total Agents", value: "42", change: "+4.7%", positive: true, icon: Users },
  { label: "New Inquiries", value: "128", change: "-2.4%", positive: false, icon: MessageSquareText },
];

const properties = [
  { title: "Modern Family Villa", location: "Surat, Gujarat", price: "₹1.85 Cr", beds: 4, baths: 3, area: "2,850", status: "Active", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" },
  { title: "Luxury City Apartment", location: "Mumbai, Maharashtra", price: "₹92 Lakh", beds: 3, baths: 2, area: "1,640", status: "Active", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" },
  { title: "Premium Office Space", location: "Ahmedabad, Gujarat", price: "₹1.25 Cr", beds: 0, baths: 2, area: "2,100", status: "Pending", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80" },
];

const activities = [
  ["New property listed", "Modern Family Villa was added by Rebecca Robinson", "8 min ago"],
  ["New inquiry received", "A customer requested a visit for Luxury City Apartment", "24 min ago"],
  ["Agent joined", "Susan Hernandez joined your team", "1 hour ago"],
  ["Property approved", "Premium Office Space was approved by admin", "2 hours ago"],
];

function NavItem({ icon: Icon, label, active }) {
  return (
    <a className={`nav-item ${active ? "active" : ""}`} href="#">
      <Icon size={19} strokeWidth={1.8} />
      <span>{label}</span>
    </a>
  );
}

export default function AdminDashboard() {
  return (
    <main className="admin-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">R</div>
          <div>
            <strong>REALTY</strong>
            <small>ADMIN PANEL</small>
          </div>
        </div>

        <div className="sidebar-section">
          <p className="section-label">MAIN MENU</p>
          <NavItem icon={LayoutDashboard} label="Dashboard" active />
          <NavItem icon={Building2} label="Properties" />
          <NavItem icon={Users} label="Users" />
          <NavItem icon={UserRoundCog} label="Agents" />
          <NavItem icon={MessageSquareText} label="Inquiries" />
          <NavItem icon={Images} label="Gallery" />
        </div>

        <div className="sidebar-section bottom-nav">
          <p className="section-label">SYSTEM</p>
          <NavItem icon={Settings} label="Settings" />
          <a className="nav-item logout" href="#"><LogOut size={19} /><span>Logout</span></a>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="mobile-brand"><button className="icon-btn"><Menu size={21}/></button><b>REALTY</b></div>
          <div className="search-box">
            <Search size={18} />
            <input placeholder="Search properties, users, agents..." />
          </div>
          <div className="top-actions">
            <button className="icon-btn notification"><Bell size={19}/><i /></button>
            <div className="profile">
              <div className="avatar">NP</div>
              <div className="profile-copy"><b>Nikunj Patel</b><span>Administrator</span></div>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        <div className="content">
          <div className="page-heading">
            <div>
              <span className="eyebrow">OVERVIEW</span>
              <h1>Dashboard</h1>
              <p>Welcome back. Here is what is happening with your property business.</p>
            </div>
            <button className="primary-btn"><Plus size={18}/> Add Property</button>
          </div>

          <div className="stat-grid">
            {stats.map(({ label, value, change, positive, icon: Icon }) => (
              <div className="stat-card" key={label}>
                <div className="stat-top"><div className="stat-icon"><Icon size={21}/></div><button className="dots"><MoreHorizontal size={18}/></button></div>
                <p>{label}</p>
                <div className="stat-bottom"><strong>{value}</strong><span className={positive ? "up" : "down"}>{positive ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>} {change}</span></div>
              </div>
            ))}
          </div>

          <div className="dashboard-grid">
            <section className="panel property-panel">
              <div className="panel-head">
                <div><h2>Recent Properties</h2><p>Latest listings added to your platform</p></div>
                <button className="text-btn">View All <ArrowUpRight size={15}/></button>
              </div>
              <div className="property-grid">
                {properties.map((property) => (
                  <article className="property-card" key={property.title}>
                    <div className="property-image">
                      <img src={property.image} alt={property.title}/>
                      <span className={`status ${property.status.toLowerCase()}`}>{property.status}</span>
                      <b className="price">{property.price}</b>
                    </div>
                    <div className="property-body">
                      <h3>{property.title}</h3>
                      <p className="location"><MapPin size={15}/>{property.location}</p>
                      <div className="property-meta">
                        {property.beds > 0 && <span><BedDouble size={15}/>{property.beds} Beds</span>}
                        <span><Bath size={15}/>{property.baths} Baths</span>
                        <span><Ruler size={15}/>{property.area} sq.ft.</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="panel activity-panel">
              <div className="panel-head">
                <div><h2>Recent Activity</h2><p>Latest admin updates</p></div>
                <button className="dots"><MoreHorizontal size={18}/></button>
              </div>
              <div className="activity-list">
                {activities.map(([title, text, time], i) => (
                  <div className="activity" key={title}>
                    <div className="activity-dot">{i + 1}</div>
                    <div><b>{title}</b><p>{text}</p><small>{time}</small></div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="bottom-grid">
            <section className="panel chart-panel">
              <div className="panel-head">
                <div><h2>Property Performance</h2><p>Monthly property inquiries</p></div>
                <button className="period-btn">Last 6 Months <ChevronDown size={15}/></button>
              </div>
              <div className="chart">
                <div className="chart-y"><span>200</span><span>150</span><span>100</span><span>50</span><span>0</span></div>
                <div className="chart-area">
                  <div className="grid-line g1"/><div className="grid-line g2"/><div className="grid-line g3"/><div className="grid-line g4"/><div className="grid-line g5"/>
                  <svg viewBox="0 0 700 250" preserveAspectRatio="none">
                    <defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a57a5a" stopOpacity=".25"/><stop offset="100%" stopColor="#a57a5a" stopOpacity="0"/></linearGradient></defs>
                    <path d="M0 190 C80 170, 105 185, 150 145 S230 160, 280 105 S365 130, 410 80 S495 110, 540 65 S625 85, 700 35 L700 250 L0 250 Z" fill="url(#fill)"/>
                    <path d="M0 190 C80 170, 105 185, 150 145 S230 160, 280 105 S365 130, 410 80 S495 110, 540 65 S625 85, 700 35" fill="none" stroke="#a57a5a" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                  <div className="months"><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span></div>
                </div>
              </div>
            </section>

            <section className="panel quick-panel">
              <div className="panel-head"><div><h2>Quick Actions</h2><p>Manage your platform</p></div></div>
              <div className="quick-grid">
                <button><Building2/><span>Add Property</span><small>Create listing</small></button>
                <button><Users/><span>Manage Users</span><small>View customers</small></button>
                <button><UserRoundCog/><span>Add Agent</span><small>Invite team member</small></button>
                <button><CalendarDays/><span>Appointments</span><small>View schedule</small></button>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
