import React from "react";
import "../Card/Feature.css";

export default function Feature({ title, description, icon, color }) {
  return (
    <div className={`flex items-center justify-center h-full  p-4 border-b-2 border-gray-800 ${color}`}>
    <div className="flex flex-col items-center text-center">
      <div className="mb-2 font-extrabold text-9xl text-center">{icon}</div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  </div>
  );
}
