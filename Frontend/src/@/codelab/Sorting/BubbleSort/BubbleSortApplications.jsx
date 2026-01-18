import React from "react";

const BubbleSortApplications = () => {
  return (
    <div className="w-full mx-auto mt-8">
      <h2 className="text-2xl font-semibold mt-3.5 mb-3.5">Applications of Bubble Sort</h2>

      <ul className="list-disc pl-6 space-y-2">
        <li>
          <span className="font-semibold">Educational Purposes</span> – Commonly used to teach basic sorting algorithms and concepts.
        </li>
        <li>
          <span className="font-semibold">Small Datasets</span> – Effective for small or nearly sorted datasets due to simplicity.
        </li>
        <li>
          <span className="font-semibold">Detecting Sorted Data</span> – Useful to check if the array is already sorted (early exit optimization).
        </li>
        <li>
          <span className="font-semibold">Simulations and Visualizations</span> – Simple logic makes it ideal for algorithm visualizations and demonstrations.
        </li>
        <li>
          <span className="font-semibold">Minimal Memory Usage</span> – Works in-place with O(1) auxiliary space.
        </li>
        <li>
          <span className="font-semibold">Works Well When Few Swaps Are Needed</span> – Adaptive version improves performance when array is nearly sorted.
        </li>
      </ul>
    </div>
  );
};

export default BubbleSortApplications;
