import React, { useEffect } from "react";
import "../Card/Card2.css";

export default function Card2() {
  useEffect(() => {
    const card = document.querySelector(".card-border");

    if (card) {
      card.addEventListener("mousemove", (e) => {
        let rect = card.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);
      });
    }
  }, []); // Runs only once after component mounts

  return (
    <div className="card-border">
      <p className="text-white text-center p-5">Hover over this card!</p>
    </div>
  );
}
