import React from "react";
// Renamed props for clarity and consistency with mapped data
export default function ProblemExample({srno, exampleInput, exampleOutput, exampleExplanation}) { 
    return (
        <div className="ml-8 mb-4 relative pl-3.5 w-fit text-justify  border-gray-400 border-l-2">
            <h2 className="font-bold">Example {srno}:</h2>
            <p className="relative pr-2.5">Input: <span className="text-sm text-gray-400">{exampleInput}</span></p>
            <p className="relative pr-2.5 ">Output: <span className="text-sm text-gray-400" >{exampleOutput}</span> </p>
            <p className="relative pr-2.5">Explanation: <span className="text-sm text-gray-400">{exampleExplanation}</span> </p>
        </div>
    )
    
}