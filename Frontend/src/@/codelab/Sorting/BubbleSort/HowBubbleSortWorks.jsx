import React from "react";

const HowBubbleSortWorks = () => {
  return (
    <div className="w-full mx-auto mt-8">
      <h2 className="text-2xl mt-3.5 mb-3.5 font-semibold">How Does Bubble Sort Work?</h2>

      <p>
        Bubble sort is a simple sorting algorithm known for its{" "}
        <span className="font-semibold">simplicity</span> and ease of{" "}
        <span className="font-semibold">implementation</span>. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.
      </p>

      <h3 className="text-xl font-semibold mt-3.5 mb-3.5">Step-by-step Explanation:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <span className="font-bold">Compare:</span> Compare adjacent elements in the array.
        </li>
        <li>
          <span className="font-bold">Swap:</span> If the current element is greater than the next one, swap them.
        </li>
        <li>
          <span className="font-bold">Repeat:</span> Repeat the process for all elements, and continue until no more swaps are needed (i.e., the array is sorted).
        </li>
      </ul>
    </div>
  );
};

export default HowBubbleSortWorks;
