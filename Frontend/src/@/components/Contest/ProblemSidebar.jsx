import React from "react";
import { useNavigate } from "react-router-dom";

const ProblemSidebar = ({ problems, selectedId, contestId }) => {
  const navigate = useNavigate();

  return (
    <div className="w-[64px] bg-zinc-900 flex flex-col items-center py-4 space-y-3 border-r border-gray-800">
      
      {/* All Button */}
      <button
        onClick={() => navigate(`/contest/${contestId}`)}
        title="All Problems"
        className={`w-10 h-10 rounded-full text-sm font-semibold transition-transform duration-200 ease-in-out
          ${
            !selectedId
              ? "bg-white text-black ring-2 ring-white"
              : "bg-zinc-700 text-white hover:bg-zinc-600"
          } hover:scale-105`}
      >
        All
      </button>

      {/* Problem Buttons */}
      {problems.map((p, idx) => {
        const isSelected = p.problemId === selectedId;

        return (
          <button
            key={p.problemId}
            onClick={() => navigate(`/contest/${contestId}/solve/${idx}`)}
            title={`Problem ${idx + 1}`}
            className={`w-10 h-10 rounded-full text-sm font-semibold transition-transform duration-200 ease-in-out
              ${
                isSelected
                  ? "bg-white text-black ring-2 ring-white"
                  : "bg-zinc-700 text-white hover:bg-zinc-600"
              } hover:scale-105`}
          >
            {idx + 1}
          </button>
        );
      })}
    </div>
  );
};

export default ProblemSidebar;
