import React from "react";

const HowSelectionSortWorks = () => {
  return (
    <div className="w-full mx-auto mt-8">
      <h2 className="text-2xl mt-3.5 mb-3.5 font-semibold ">How Does Selection Sort Work?</h2>
      <p >
        Selection sort is a simple comparison-based sorting algorithm. It works by repeatedly selecting the{" "}
        <span className="font-semibold">minimum element</span> from the unsorted part of the array and moving it to the sorted part.
      </p>
      <h3 className="text-xl font-semibold mt-3.5 mb-3.5">Step-by-step Explanation:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li><span className="font-bold">Find Min:</span> Find the smallest element in the unsorted portion.</li>
        <li><span className="font-bold">Swap:</span> Swap it with the first element of the unsorted portion.</li>
        <li><span className="font-bold">Repeat:</span> Move the boundary of the sorted portion one element forward and repeat.</li>
      </ul>
    </div>
  );
};

export default HowSelectionSortWorks;
