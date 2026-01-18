import React from "react";

const QuickSortWalkthrough = () => {
  return (
    <div className="w-full mx-auto mt-8">
      <h2 className="text-2xl font-semibold mt-3.5 mb-3.5">Quick Sort: Step-by-Step</h2>
      <p>Let’s sort the array <span className="font-semibold">[25, 10, 30, 5]</span> using Quick Sort.</p>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Process:</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Pick pivot = 25</li>
          <li>Partition: [10, 5] (less), 25 (pivot), [30] (greater)</li>
          <li>Sort [10, 5] → Pick pivot = 10 → [5], 10</li>
          <li>Sort [30] → Already sorted</li>
          <li>Final merge: [5, 10, 25, 30]</li>
        </ul>
      </div>

      <div className="p-4 bg-gray-800 rounded-lg text-left text-xl font-mono">
        Final Sorted List: [5, 10, 25, 30]
      </div>
    </div>
  );
};

export default QuickSortWalkthrough;
