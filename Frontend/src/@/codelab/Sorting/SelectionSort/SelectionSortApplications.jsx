import React from "react";

const SelectionSortApplications = () => {
  return (
    <div className="w-full mx-auto mt-8">
      <h2 className="text-2xl font-semibold mt-3.5 mb-3.5">Applications</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Good for teaching basic sorting principles</li>
        <li>Useful when memory writes are costly (e.g., EEPROM)</li>
        <li>Simple logic makes it easy to implement in embedded systems</li>
      </ul>
    </div>
  );
};

export default SelectionSortApplications;
