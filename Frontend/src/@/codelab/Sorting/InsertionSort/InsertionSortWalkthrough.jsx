import React from "react";

const InsertionSortWalkthrough = () => {
  return (
    <div className="w-full mx-auto mt-8">
      <h2 className="text-2xl font-semibold mt-3.5 mb-3.5 ">Insertion Sort: Step-by-Step</h2>
      <p>
        Let’s sort the array <span className="font-semibold ">[40, 20, 50, 10]</span> using Insertion Sort.
      </p>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Steps:</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Start with 40 (already sorted)</li>
          <li>Insert 20 → [20, 40, 50, 10]</li>
          <li>Insert 50 → [20, 40, 50, 10] (no change)</li>
          <li>Insert 10 → [10, 20, 40, 50]</li>
        </ul>
      </div>

      <div className="p-4 bg-gray-800 rounded-lg text-left text-xl font-mono">
        Final Sorted List: [10, 20, 40, 50]
      </div>
    </div>
  );
};

export default InsertionSortWalkthrough;
