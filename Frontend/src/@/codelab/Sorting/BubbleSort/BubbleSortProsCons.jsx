import React from "react";

const BubbleSortProsCons = () => {
  return (
    <div className="max-full mx-auto mt-8">
      <h2 className="text-2xl font-semibold">Advantages & Disadvantages of Bubble Sort</h2>

      <div>
        <h3 className="text-xl font-semibold mt-3.5 mb-3.5">Advantages</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">Simplicity:</span> Very simple and easy to implement, making it great for educational purposes.
          </li>
          <li>
            <span className="font-medium">No additional space needed:</span> Bubble sort is an in-place sorting algorithm with O(1) space complexity.
          </li>
          <li>
            <span className="font-medium">Detects already sorted array:</span> Optimized version can stop early if no swaps are needed, saving time.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-3.5 mb-3.5">Disadvantages</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">Poor time complexity:</span> Performs O(n²) comparisons and swaps in the worst and average case.
          </li>
          <li>
            <span className="font-medium">Not suitable for large datasets:</span> Inefficient compared to advanced sorting algorithms like Merge Sort or QuickSort.
          </li>
          <li>
            <span className="font-medium">Unstable in naive implementation:</span> While it can be stable, its basic version doesn't guarantee stability.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BubbleSortProsCons;
