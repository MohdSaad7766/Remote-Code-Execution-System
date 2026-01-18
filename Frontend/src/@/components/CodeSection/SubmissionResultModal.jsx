import React from "react";
import { X } from "lucide-react";

export default function SubmissionResultModal({ show, onClose, result }) {
  if (!show || !result) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-[#1e1e1e] text-white rounded-lg p-6 w-full max-w-xl relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">Submission Result</h2>

        <div className="mb-2">
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={
              result.submissionStatus === "ACCEPTED"
                ? "text-green-400"
                : "text-red-400"
            }
          >
            {result.submissionStatus}
          </span>
        </div>

        <div className="mb-2">
          <span className="font-semibold">Language:</span>{" "}
          {result.language}
        </div>

        <div className="mb-2">
          <span className="font-semibold">Time:</span> {result.executionTime ?? "N/A"} ms
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Test Cases:</h3>
          <ul className="space-y-1 max-h-40 overflow-y-auto pr-2">
            {(result.testCaseResults || []).map((tc, i) => (
              <li key={i} className="flex justify-between">
                <span>Test Case {i + 1}</span>
                <span className={tc.outputMatched ? "text-green-400" : "text-red-400"}>
                  {tc.outputMatched ? "Passed" : "Failed"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
