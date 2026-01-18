import React from 'react';
import ProblemDetails from './ProblemDetails';
import ProblemExamplesSection from './ProblemExamplesSection';
import ProblemConstraints from './ProblemConstraints';

export default function ProblemStatement() {
  return (
    <div className="w-full pt-2.5 scrollbar-thin scrollbar-thumb-rounded scrollbar h-185 overflow-y-auto overflow-x-hidden rounded-sm border border-gray-800 bg-black">
      <ProblemDetails />
      <div className="p-8 relative text-white w-full text-justify">
        <p>Lorem ipsum dolor sit amet consectetur... Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit amet consectetur... Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <ProblemExamplesSection />
      <ProblemConstraints />
    </div>
  );
}
