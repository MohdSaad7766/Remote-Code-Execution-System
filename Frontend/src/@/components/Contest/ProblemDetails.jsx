import React from 'react';

export default function ProblemDetails() {
  return (
    <>
      <div className="border-b-2 border-gray-800 pt-1 m-2">
        <div className="w-full relative text-white flex justify-between items-baseline shadow-md px-6 py-1">
          <h1 className="text-2xl font-bold text-white">Two Sum</h1>
          <p className="text-green-600 flex items-center gap-1">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </span>
            Solved
          </p>
        </div>
        <div className="w-full relative text-sm flex flex-wrap text-white shadow-md px-6 py-2">
          <span className="p-1.5">Difficulty: "Medium"</span>
          <span className="p-1.5">Accuracy: "18.2%"</span>
          <span className="p-1.5">Submission: "83.54%"</span>
          <span className="p-1.5">Points: 4</span>
        </div>
      </div>
    </>
  );
}
