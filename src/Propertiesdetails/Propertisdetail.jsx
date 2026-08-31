import React, { useState } from "react";
import ScheduleTour from "./ScheduleTour";
import AgentCard from "./AgentCard";
import DetailsPanel from "./DetailsPanel";
import OverviewPanel from "./OverviewPanel";
import LocationPanel from "./LocationPanel";
import FloorPlansPanel from "./FloorPlansPanel";
import VideoPanel from "./VideoPanel";
import ReviewsPanel from "./ReviewsPanel";
import AddReviewPanel from "./AddReviewPanel";
import { thumbnails } from "./data";
// import "./ForestHeightsPropertyDetails.css";

const defaultHeroImage =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80";

export default function Propertisdetail() {
  const [activeImage, setActiveImage] = useState(thumbnails[0] || defaultHeroImage);

  return (
    <div className="fh-page">
      <h1 className="fh-title">Forest Heights Homes</h1>

      <div className="hero-image">
        <img src={activeImage} alt="Forest Heights Homes" />
      </div>

      <div className="thumb-row">
        {thumbnails.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`View ${i + 1}`}
            className={activeImage === src ? "active" : ""}
            onClick={() => setActiveImage(src)}
          />
        ))}
      </div>

      <div className="fh-grid">
        <aside className="fh-sidebar">
          <ScheduleTour />
          <AgentCard />
        </aside>

        <main className="fh-main">
          <DetailsPanel />
          <OverviewPanel />
          <LocationPanel />
          <FloorPlansPanel />
          <VideoPanel />
          <ReviewsPanel />
          <AddReviewPanel />
        </main>
      </div>

    </div>
  );
}