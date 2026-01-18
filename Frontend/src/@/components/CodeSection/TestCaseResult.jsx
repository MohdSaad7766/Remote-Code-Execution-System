import { useState } from 'react';

// export default function TestCaseResults({ output, onBack }) {
//   const [expandedIdx, setExpandedIdx] = useState(null);

//   const toggleExpand = (idx) => {
//     setExpandedIdx(expandedIdx === idx ? null : idx);
//   };

//   if (!output || !output.responses || output.responses.length === 0) {
//     return (
     // src/components/CodeSection/TestCaseResult.jsx
export default function TestCaseResults({ testCases = [] }) {
  return (
    <div className="p-2 text-white">
      <h3 className="text-lg font-bold mb-2">Test Cases</h3>
      {testCases.length === 0 ? (
        <p>No test cases available</p>
      ) : (
        testCases.map((test, i) => (
          <div key={i} className="mb-2 p-2 border border-gray-600 rounded">
            <p><strong>Input:</strong> {test.input}</p>
            <p><strong>Expected:</strong> {test.expected}</p>
            <p><strong>Your Output:</strong> {test.output}</p>
            <p className={test.passed ? "text-green-400" : "text-red-400"}>
              {test.passed ? "Passed ✅" : "Failed ❌"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

