import React from "react";

const MergeSortWalkthrough = () => {
  return (
    <div className="w-full mx-auto mt-8">
      <h2 className="text-2xl font-semibold mt-3.5 mb-3.5">Merge Sort: Step-by-Step</h2>
      <p>Let’s sort the array <span className="font-semibold">[50, 20, 60, 10]</span> using Merge Sort.</p>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold"> Divide:</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>[50, 20, 60, 10] → [50, 20] and [60, 10]</li>
          <li>[50, 20] → [50] and [20]</li>
          <li>[60, 10] → [60] and [10]</li>
        </ul>

        <h3 className="text-xl font-semibold"> Conquer:</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>[50] is already sorted</li>
          <li>[20] is already sorted</li>
          <li>[60] is already sorted</li>
          <li>[10] is already sorted</li>
        </ul>

        <h3 className="text-xl font-semibold"> Merge:</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Merge [50] and [20] → [20, 50]</li>
          <li>Merge [60] and [10] → [10, 60]</li>
          <li>Merge [20, 50] and [10, 60] → [10, 20, 50, 60]</li>
        </ul>
      </div>

      <div className="p-4 bg-gray-800 rounded-lg text-center text-xl font-mono">
        Final Sorted List: [10, 20, 50, 60]
      </div>
    </div>
  );
};

export default MergeSortWalkthrough;
