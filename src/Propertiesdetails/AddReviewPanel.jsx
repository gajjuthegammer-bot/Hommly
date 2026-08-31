import React, { useState } from "react";

function AddReviewPanel() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="panel">
      <h3>Add A Review</h3>
      <div className="rate-row">
        <span>Rating</span>
        <span className="rate-input">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className={n <= (hover || rating) ? "star filled" : "star"}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(n)}
            >
              ★
            </span>
          ))}
        </span>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="review-form">
        <div className="review-fields">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
        </div>
        <label className="checkbox-row">
          <input type="checkbox" />
          Keep me posted via email for future comments on this website.
        </label>
        <textarea placeholder="Review" rows={5} />
        <button type="submit" className="btn-primary">Submit Review</button>
      </form>
    </div>
  );
}
export default AddReviewPanel;