import React from "react";

export function Star({ filled }) {
  return <span className={filled ? "star filled" : "star"}>★</span>;
}

export function StarRow({ rating }) {
  return (
    <span className="star-row">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} filled={n <= rating} />
      ))}
    </span>
  );
}