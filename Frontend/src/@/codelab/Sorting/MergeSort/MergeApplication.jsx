import React from "react";

const MergeSortApplications = () => {
  return (
    <div className="w-full mx-auto mt-8">
      <h2 className="text-2xl font-semibold mt-3.5 mb-3.5">Applications of Merge Sort</h2>
      
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <span className="font-semibold">Sorting large datasets</span> – Efficient due to its predictable O(n log n) time complexity.
        </li>
        <li>
          <span className="font-semibold ">External Sorting</span> – Ideal for sorting data that doesn’t fit in RAM.
        </li>
        <li>
          <span className="font-semibold">Inversion Counting</span> – Merge Sort can be modified to count inversions in O(n log n) time.
        </li>
        <li>
          <span className="font-semibold ">Used in Language Libraries</span> – Many standard libraries use Merge Sort or its variations:
          <ul className="list-disc pl-6 mt-1 text-sm space-y-1">
            <li> <strong>TimSort</strong> (a hybrid of Merge Sort & Insertion Sort) is used in Python, Java (Android), and Swift.</li>
            <li> <code>Arrays.sort()</code> in Java uses QuickSort for primitives.</li>
            <li> <code>Collections.sort()</code> uses MergeSort for objects (due to stability).</li>
          </ul>
        </li>
        <li>
          <span className="font-semibold">Preferred for Linked Lists</span> – No random access needed, works efficiently with pointer-based data.
        </li>
        <li>
          <span className="font-semibold">Easily Parallelizable</span> – Subarrays can be sorted concurrently and merged later.
        </li>
        <li>
          <span className="font-semibold">Used for Set Operations</span> – The merge step can be adapted to perform union and intersection on sorted arrays.
        </li>
      </ul>
    </div>
  );
};

export default MergeSortApplications;
