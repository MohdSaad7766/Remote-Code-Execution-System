import React from "react";

const InsertionSortApplications = () => {
  return (
    <div className="w-full mx-auto mt-8">
      <h2 className="text-2xl font-semibold mt-3.5 mb-3.5">Applications</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Used in sorting small datasets</li>
        <li>Useful when the input is already partially sorted</li>
        <li>Frequently used as a basic building block in more complex algorithms</li>
        <li>Efficient for online sorting where data is continuously received</li>
      </ul>
    </div>
  );
};

export default InsertionSortApplications;
