import React from "react";

export default function LinkStat({ item, activeTab, onClick , onRemove }) {
  const isActive = activeTab === item.link; 
console.log(activeTab)
  return (
    <button
      onClick={() => onClick(item.link)}
      className={`flex items-center lg:text-lg  text-white font-semibold px-1 py-3  hover:bg-gray-800 ${
        isActive ? "border-b-4 border-sky-500" : "border-b-4 border-transparent"
      }`}
    >
      <span className="text-blue-400 text-xs mr-2">{item.svg}</span> 
      {item.title}
      {item.link === 'accepted'  && <span className="ml-1.5" onClick={onRemove}> ❌ </span>}
    </button>
  );
}
