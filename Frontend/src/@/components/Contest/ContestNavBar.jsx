import React from "react";

const ContestNavbar = ({ title, time, onSubmit }) => {
  const [hours, minutes, seconds] = (time || "00:00:00").split(":");

  return (
    <div className="w-full relative flex items-center px-10 py-3 bg-[#2c2f34] text-white sticky top-0 z-50 border-b border-gray-600">
      
      {/* Left: Contest Title */}
      <div className="flex-1">
        <h1 className="text-xl font-bold pl-4">{title || "CONTEST NAME"}</h1>
      </div>

      {/* Center: Timer (absolutely centered) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
        <div className="text-[10px] font-semibold text-gray-300 leading-tight text-right">
          <div>REMAINING</div>
          <div>TIME</div>
        </div>

        <div className="flex items-center gap-2 text-sm font-semibold">
          <div className="bg-[#1e1f22] border border-gray-400 rounded px-2 py-1 text-center min-w-[38px]">
            {hours}
          </div>
          <span className="text-[10px] text-gray-300">HRS</span>

          <div className="bg-[#1e1f22] border border-gray-400 rounded px-2 py-1 text-center min-w-[38px]">
            {minutes}
          </div>
          <span className="text-[10px] text-gray-300">MIN</span>

          <div className="bg-[#1e1f22] border border-gray-400 rounded px-2 py-1 text-center min-w-[38px]">
            {seconds}
          </div>
          <span className="text-[10px] text-gray-300">SEC</span>
        </div>
      </div>

      {/* Right: Submit Button */}
      <div className="flex-1 flex justify-end pr-2">
        <button
          onClick={onSubmit}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md font-semibold shadow-sm transition"
        >
          Submit Contest
        </button>
      </div>
    </div>
  );
};

export default ContestNavbar;
