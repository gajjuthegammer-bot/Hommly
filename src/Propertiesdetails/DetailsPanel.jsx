import icons from "./icons";
// import { details } from "./data";
 const details = [
  { icon: "bed", label: "2 Bed Rooms" },
  { icon: "bath", label: "2 Bath Rooms" },
  { icon: "area", label: "200 sq. ft." },
  { icon: "calendar", label: "Year Build 2014" },
  { icon: "garage", label: "Garages" },
  { icon: "home", label: "Type House" },
];


function DetailsPanel() {
  return (
    <div className="panel">
      <h3>Details</h3>
      <div className="details-grid">
        {details.map((d) => (
          <div className="detail-item" key={d.label}>
            <span className="detail-icon">{icons[d.icon]}</span>
            <span>{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default DetailsPanel;