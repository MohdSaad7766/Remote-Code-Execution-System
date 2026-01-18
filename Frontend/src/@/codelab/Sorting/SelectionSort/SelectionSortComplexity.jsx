import React from "react";

const SelectionSortComplexity = () => {
  return (
    <div className="w-full mx-auto mt-8">
      <h2 className="text-2xl font-semibold mt-3.5 mb-3.5">Complexity Analysis</h2>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Time Complexity:</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li><span className="font-medium ">Best Case:</span> O(n²)</li>
          <li><span className="font-medium ">Average Case:</span> O(n²)</li>
          <li><span className="font-medium ">Worst Case:</span> O(n²)</li>
        </ul>

        <h3 className="text-xl font-semibold">Auxiliary Space:</h3>
        <p><span className="font-medium">O(1)</span> – In-place sorting</p>
      </div>
    </div>
  );
};

export default SelectionSortComplexity;
