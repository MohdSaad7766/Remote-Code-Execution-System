import React from "react";

const HowQuickSortWorks = () => {
  return (
    <div className="w-full mx-auto mt-8">
      <h2 className="text-2xl mt-3.5 mb-3.5 font-semibold">How Does Quick Sort Work?</h2>
      <p>
        Quick sort is a highly efficient sorting algorithm that uses a{" "}
        <span className="font-semibold">divide-and-conquer</span> approach. It selects a{" "}
        <span className="font-semibold">pivot</span> element and partitions the array such that elements less than the pivot are on the left, and elements greater are on the right.
      </p>
      <h3 className="text-xl font-semibold mt-3.5 mb-3.5">Step-by-step Explanation:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li><span className="font-bold">Choose Pivot:</span> Pick a pivot element from the array.</li>
        <li><span className="font-bold">Partition:</span> Rearrange elements so that all elements less than pivot come before it, and greater after it.</li>
        <li><span className="font-bold">Recursively Sort:</span> Apply the same strategy to the left and right subarrays.</li>
      </ul>
    </div>
  );
};

export default HowQuickSortWorks;
