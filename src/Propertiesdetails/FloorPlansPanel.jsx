import React, { useState } from "react";
import icons from "./icons";
// import { floorPlans } from "./data";

const floorPlans = [
  {
    name: "First Floor",
    rooms: 2,
    baths: 2,
    size: "200 sq. ft.",
    image: "../assets/images/blue-print.png",
  },
  {
    name: "Second Floor",
    rooms: 2,
    baths: 2,
    size: "200 sq. ft.",
    image: "../assets/images/blue-print.png",
  },
  {
    name: "Third Floor",
    rooms: 2,
    baths: 2,
    size: "200 sq. ft.",
    image: "../assets/images/blue-print.png",
  },
];

function FloorPlansPanel() {
  const [open, setOpen] = useState(-1);  
  return (
    <div className="panel floorplans-panel">
      <h3>Floor Plans</h3>
      <div className="floorplans">
        {floorPlans.map((f, i) => {
          const isOpen = open === i;
          return (
            <div className={`floorplan-block ${isOpen ? "open" : ""}`} key={f.name}>
              <div className="floorplan-row">
                <button
                  className="floorplan-toggle"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className={`chevron ${isOpen ? "open" : ""}`}>{icons.chevron}</span>
                  {f.name}
                </button>
                <span>Rooms: {f.rooms}</span>
                <span>Baths: {f.baths}</span>
                <span>Size: {f.size}</span>
              </div>
              {f.image && (
                <div className={`floorplan-image-wrap ${isOpen ? "open" : ""}`}>
                  <div className="floorplan-image-inner">
                    <div className="floorplan-image">
                      <img src={f.image} alt={`${f.name} plan`} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FloorPlansPanel;