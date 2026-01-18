import React from "react";
export default function ButtonContest({ label, onClick, bgColor, textColor, hoverColor }) {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} ${textColor} ${hoverColor} px-4 py-2 rounded-md transition duration-300`}
    >
      {label}
    </button>
  );
}