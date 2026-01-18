import React from "react";

const SelectionSortWalkthrough = () => {
  return (
    <div className="w-full mx-auto mt-8">
      <h2 className="text-2xl font-semibold mt-3.5 mb-3.5">Selection Sort: Step-by-Step</h2>
      <p>Let’s sort the array <span className="font-semibold">[29, 10, 14, 37]</span> using Selection Sort.</p>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Process:</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Find min in [29, 10, 14, 37] → 10, swap with 29 → [10, 29, 14, 37]</li>
          <li>Find min in [29, 14, 37] → 14, swap with 29 → [10, 14, 29, 37]</li>
          <li>Find min in [29, 37] → 29, already in place</li>
          <li>Find min in [37] → 37, already in place</li>
        </ul>
      </div>

      <div className="p-4 bg-gray-800 rounded-lg text-center text-xl font-mono">
        Final Sorted List: [10, 14, 29, 37]
      </div>
    </div>
  );
};

export default SelectionSortWalkthrough;
