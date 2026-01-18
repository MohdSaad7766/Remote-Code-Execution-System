import React from "react";

const BubbleSortWalkthrough = () => {
  return (
    <div className="w-full mx-auto mt-8">
      <h2 className="text-2xl font-semibold mt-3.5 mb-3.5">Bubble Sort: Step-by-Step</h2>
      <p>
        Let’s sort the array <span className="font-semibold">[30, 10, 40, 20]</span> using Bubble Sort.
      </p>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Pass 1:</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Compare 30 and 10 → swap → [10, 30, 40, 20]</li>
          <li>Compare 30 and 40 → no swap → [10, 30, 40, 20]</li>
          <li>Compare 40 and 20 → swap → [10, 30, 20, 40]</li>
        </ul>

        <h3 className="text-xl font-semibold">Pass 2:</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Compare 10 and 30 → no swap → [10, 30, 20, 40]</li>
          <li>Compare 30 and 20 → swap → [10, 20, 30, 40]</li>
          <li>Compare 30 and 40 → no swap → [10, 20, 30, 40]</li>
        </ul>

        <h3 className="text-xl font-semibold ">Pass 3:</h3>
        <ul className="list-disc pl-6  space-y-1">
          <li>Compare 10 and 20 → no swap → [10, 20, 30, 40]</li>
          <li>Compare 20 and 30 → no swap → [10, 20, 30, 40]</li>
        </ul>
      </div>

      <div className="p-4 bg-gray-700 rounded-lg text-left text-xl font-mono">
        Final Sorted List: [10, 20, 30, 40]
      </div>
    </div>
  );
};

export default BubbleSortWalkthrough;
