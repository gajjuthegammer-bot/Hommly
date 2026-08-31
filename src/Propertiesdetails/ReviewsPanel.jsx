import React from "react";
import { reviews } from "./data";
import { StarRow } from "./Star";

function ReviewsPanel() {
  return (
    <div className="panel">
      <h3>({reviews.length} Reviews)</h3>
      <div className="reviews-list">
        {reviews.map((r) => (
          <div className="review-row" key={r.name}>
            <img className="review-avatar" src={r.avatar} alt={r.name} />
            <div className="review-body">
              <div className="review-head">
                <div>
                  <div className="review-name">{r.name}</div>
                  <div className="review-date">{r.date}</div>
                </div>
                <StarRow rating={r.rating} />
              </div>
              <p>{r.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsPanel;