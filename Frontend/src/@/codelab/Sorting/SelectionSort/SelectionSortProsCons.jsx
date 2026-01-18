import React from "react";

const SelectionSortProsCons = () => {
  return (
    <div className="w-full mx-auto mt-8">
      <h2 className="text-2xl font-semibold mt-3.5 mb-3.5">Pros and Cons</h2>

      <h3 className="text-xl font-semibold">Pros:</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Simple and easy to understand</li>
        <li>Works well for small datasets</li>
        <li>In-place sorting (no extra space required)</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">Cons:</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Not efficient for large datasets</li>
        <li>Time complexity is always O(n²), regardless of input</li>
      </ul>
    </div>
  );
};

export default SelectionSortProsCons;
