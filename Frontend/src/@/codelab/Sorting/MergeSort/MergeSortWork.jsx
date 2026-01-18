import React from "react";

const HowMergeSortWorks = () => {
  return (
    <div className="w-full mx-auto mt-8 ">
      <h2 className="text-2xl mt-3.5 mb-3.5 font-semibold">How Does Merge Sort Work?</h2>

      <p>
        Merge sort is a popular sorting algorithm known for its{" "}
        <span className="font-semibold">efficiency</span> and{" "}
        <span className="font-semibold">stability</span>. It follows the{" "}
        <span className="font-medium">divide-and-conquer</span> approach to sort a given array of elements.
      </p>

      <h3 className="text-xl font-semibold mt-3.5 mb-3.5">Step-by-step Explanation:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <span className="font-bold">Divide:</span> Recursively divide the array into two halves until each subarray has one element.
        </li>
        <li>
          <span className="font-bold">Conquer:</span> Sort each subarray individually using the merge sort algorithm.
        </li>
        <li>
          <span className="font-bold">Merge:</span> Merge the sorted subarrays back together in sorted order. Repeat the process until all elements are merged.
        </li>
      </ul>
    </div>
  );
};

export default HowMergeSortWorks;
