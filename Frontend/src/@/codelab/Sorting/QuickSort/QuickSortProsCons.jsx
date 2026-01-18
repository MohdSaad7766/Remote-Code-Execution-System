import React from "react";

const QuickSortProsCons = () => {
  return (
    <div className="w-full mx-auto mt-8">
      <h2 className="text-2xl font-semibold mt-3.5 mb-3.5">Pros and Cons</h2>

      <h3 className="text-xl font-semibold">Pros:</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Faster than other sorting algorithms in practice</li>
        <li>In-place sorting (no need for extra memory)</li>
        <li>Efficient for large datasets</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">Cons:</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Worst-case time complexity is O(n²)</li>
        <li>Not stable (order of equal elements may not be preserved)</li>
      </ul>
    </div>
  );
};

export default QuickSortProsCons;
