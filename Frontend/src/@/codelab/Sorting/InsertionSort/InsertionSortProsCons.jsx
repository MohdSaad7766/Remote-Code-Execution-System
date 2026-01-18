import React from "react";

const InsertionSortProsCons = () => {
  return (
    <div className="w-full mx-auto mt-8">
      <h2 className="text-2xl font-semibold mt-3.5 mb-3.5 ">Pros and Cons</h2>

      <h3 className="text-xl font-semibold">Advantages:</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Simple to implement and understand</li>
        <li>Efficient for small or nearly sorted arrays</li>
        <li>Stable sort (does not change the relative order of equal elements)</li>
        <li>In-place algorithm (no extra space required)</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 ">Disadvantages:</h3>
      <ul className="list-disc pl-6  space-y-1">
        <li>Poor performance on large arrays</li>
        <li>Time complexity is O(n²) in worst and average cases</li>
      </ul>
    </div>
  );
};

export default InsertionSortProsCons;
