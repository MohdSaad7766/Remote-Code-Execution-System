import React from 'react';
import Constraints from '../ProblemStatement/Constraints';

export default function ProblemConstraints() {
  return (
    <div className="p-8 text-white relative w-full text-justify">
      <p>Constraints:</p>
      <ul className="pl-9 list-disc">
        <Constraints list="-2 < 0 < 8" />
        <Constraints list="-2 < 0 < 8" />
        <Constraints list="-2 < 0 < 8" />
      </ul>
    </div>
  );
}
