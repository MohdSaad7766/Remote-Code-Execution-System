import React from "react";

const QuickSortApplications = () => {
  return (
    <div className="w-full mx-auto mt-8">
      <h2 className="text-2xl font-semibold mt-3.5 mb-3.5">Applications</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Used in libraries like C++ STL, Java Collections, Python’s sort (Timsort is hybrid)</li>
        <li>Efficient for large datasets and systems with limited memory</li>
        <li>Preferred when average case performance is more important than worst case</li>
      </ul>
    </div>
  );
};

export default QuickSortApplications;
