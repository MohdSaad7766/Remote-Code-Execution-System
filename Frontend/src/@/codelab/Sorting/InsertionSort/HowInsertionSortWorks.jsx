import React from "react";

const HowInsertionSortWorks = () => {
  return (
    <div className="w-full mx-auto mt-8">
      <h2 className="text-2xl font-semibold mt-3.5 mb-3.5">How Does Insertion Sort Work?</h2>
      <p>
        Insertion sort is a <span className="font-semibold">simple</span> and <span className="font-semibold">intuitive</span> sorting algorithm. It builds the sorted array one element at a time by comparing each new element to those before it and inserting it into the correct position.
      </p>

      <h3 className="text-xl font-semibold mt-3.5 mb-3.5">Step-by-step Explanation:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li><span className="font-bold">Start:</span> Assume the first element is already sorted.</li>
        <li><span className="font-bold">Insert:</span> Take the next element and compare it with the sorted portion.</li>
        <li><span className="font-bold">Shift:</span> Shift all larger sorted elements to the right to make space.</li>
        <li><span className="font-bold">Place:</span> Insert the element into the correct position.</li>
        <li><span className="font-bold">Repeat:</span> Continue the process until all elements are sorted.</li>
      </ul>
    </div>
  );
};

export default HowInsertionSortWorks;
