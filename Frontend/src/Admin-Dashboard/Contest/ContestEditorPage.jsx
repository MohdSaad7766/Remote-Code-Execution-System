import React, { useState } from "react";
import ProblemForm from "./ProblemForm"; // adjust the path as needed
import { Dialog } from "@headlessui/react";

export default function ContestEditorPage() {
  const [showAddProblemModal, setShowAddProblemModal] = useState(false);
  const [contestProblems, setContestProblems] = useState([]);
  const [refreshProblemList, setRefreshProblemList] = useState(false);

  const handleProblemSaved = (newProblem) => {
    // Add the newly saved problem to contestProblems
    setContestProblems((prev) => [...prev, newProblem]);
    setRefreshProblemList((prev) => !prev);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Edit Contest</h1>
        <button
          onClick={() => setShowAddProblemModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          + Add New Problem
        </button>
      </div>

      {/* Problem List Section */}
      <div className="bg-gray-900 rounded p-4 shadow mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Selected Problems</h2>
        {contestProblems.length === 0 ? (
          <p className="text-gray-400 text-sm">No problems added yet.</p>
        ) : (
          <ul className="space-y-2">
            {contestProblems.map((problem, idx) => (
              <li
                key={idx}
                className="bg-gray-800 px-4 py-2 rounded flex justify-between items-center text-white"
              >
                <span>{problem.problemTitle}</span>
                <button
                  onClick={() =>
                    setContestProblems((prev) =>
                      prev.filter((_, i) => i !== idx)
                    )
                  }
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Problem Form Modal */}
      <Dialog
        open={showAddProblemModal}
        onClose={() => setShowAddProblemModal(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
        <div className="relative bg-gray-900 p-6 rounded-lg w-[90%] max-w-5xl h-[90%] overflow-y-auto z-50">
          <ProblemForm
            onClose={() => setShowAddProblemModal(false)}
            onSaved={handleProblemSaved}
          />
        </div>
      </Dialog>
    </div>
  );
}
