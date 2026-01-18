import React from "react";

const MergeSortProsCons = () => {
  return (
    <div className="max-full mx-auto mt-8">
      <h2 className="text-2xl font-semibold">Advantages & Disadvantages of Merge Sort</h2>

      <div>
        <h3 className="text-xl font-semibold mt-3.5 mb-3.5">Advantages</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">Stability:</span> Maintains the relative order of equal elements.
          </li>
          <li>
            <span className="font-medium">Guaranteed worst-case performance:</span> Always performs in O(n log n), even on large datasets.
          </li>
          <li>
            <span className="font-medium">Simple to implement:</span> Based on the clear divide-and-conquer strategy.
          </li>
          <li>
            <span className="font-medium">Naturally parallel:</span> Subarrays can be sorted and merged independently, making it suitable for parallel processing.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-3.5 mb-3.5"> Disadvantages</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">Space complexity:</span> Requires additional memory to store temporary subarrays during merging.
          </li>
          <li>
            <span className="font-medium">Not in-place:</span> Needs extra space, which can be a drawback in memory-constrained systems.
          </li>
          <li>
            <span className="font-medium">Slower than QuickSort:</span> In general, due to lack of cache efficiency since it doesn’t sort in-place.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MergeSortProsCons;
