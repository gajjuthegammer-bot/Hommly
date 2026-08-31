import React from "react";
import icons from "./icons";
import { StarRow } from "./Star";

function LocationPanel() {
  return (
    <div className="panel">
      <h3>Location</h3>
      <div className="address">630 Ocean View Drive</div>
      <div className="map-box">
        <div className="map-card">
          <div className="map-card-title">Amphitheatre Pkwy</div>
          <div className="map-card-sub">140 Amphitheatre Pkwy</div>
          <div className="map-card-rating"><StarRow rating={4} /> <span>4.5</span></div>
        </div>
        <span className="map-pin">{icons.pin}</span>
      </div>
    </div>
  );
}

export default LocationPanel;