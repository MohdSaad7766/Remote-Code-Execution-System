// All your imports remain the same
import React, { useState, useEffect } from "react";

export default function ContestForm({ setToggle }) {
  const [contestName, setContestName] = useState("");
  const [contestDescription, setContestDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState(0);

  const [allProblems, setAllProblems] = useState([]);
  const [existingProblems, setExistingProblems] = useState([]);
  const [selectedProblemDetail, setSelectedProblemDetail] = useState(null);

  const [problems, setProblems] = useState([
    {
      problemTitle: "",
      problemDescription: "",
      problemDifficulty: "EASY",
      topicList: [""],
      companyList: [""],
      problemConstraintsList: [""],
      exampleRequestDTOList: [
        { exampleInput: "", exampleOutput: "", exampleExplanation: "" },
      ],
      solutionRequestDTO: {
        approachRequestDTOList: [
          { approachType: "BRUTE_FORCE", approachDescription: "" },
        ],
      },
      codeTemplateRequestDTOList: [
        {
          visibleTemplateCode: "",
          invisibleTemplateCode: "",
          language: "CPP",
        },
      ],
      testCaseRequestDTOList: [
        { testCaseInput: "", testCaseOutput: "", visible: false },
      ],
      note: "",
    },
  ]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await fetch("http://localhost:8080/central/problem/get-all");
        const data = await res.json();
        const problemList = Array.isArray(data) ? data : data.problems || [];
        setAllProblems(problemList);
      } catch (err) {
        console.error("Error fetching problems:", err);
      }
    };
    fetchProblems();
  }, []);

  const toggleProblemSelection = (id) => {
    setExistingProblems((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const openProblemDetail = async (problemId) => {
    try {
      const res = await fetch(`http://localhost:8080/central/problem/get/${problemId}`);
      const data = await res.json();
      setSelectedProblemDetail(data);
    } catch (err) {
      console.error("Problem fetch failed:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const contestPayload = {
      contestName,
      contestDescription,
      startTime,
      endTime,
      duration: Number(duration),
      existingProblemList: existingProblems,
      newProblemList: problems,
    };

    console.log("Submitting Contest Data:", contestPayload);
    alert("Check console for submitted contest data.");
  };

  const handleCancelForm = () => setToggle(false);

  return (
    <div className="p-6 bg-gray-950 text-white overflow-y-auto h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-500">
        Add New Contest
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contest Info */}
        <div>
          <label className="block text-sm">Contest Name</label>
          <input
            className="w-full bg-gray-800 text-white p-2 rounded"
            value={contestName}
            onChange={(e) => setContestName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm">Description</label>
          <textarea
            className="w-full bg-gray-800 text-white p-2 rounded"
            value={contestDescription}
            onChange={(e) => setContestDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm">Start Time</label>
          <input
            type="datetime-local"
            className="w-full bg-gray-800 text-white p-2 rounded"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm">End Time</label>
          <input
            type="datetime-local"
            className="w-full bg-gray-800 text-white p-2 rounded"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm">Duration (seconds)</label>
          <input
            type="number"
            className="w-full bg-gray-800 text-white p-2 rounded"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

       {/* Existing Problem Selection */}
<div className="bg-gray-800 p-4 rounded">
  <h3 className="text-lg font-semibold text-indigo-400 mb-3">
    Select Existing Problems
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
    {allProblems.map((item) => {
      const problem = item.problem || item; // handles both { problem } and flat structures
      if (!problem || !problem.id) return null;

      return (
        <div
          key={problem.id}
          className="flex items-center space-x-2 bg-gray-900 p-2 rounded"
        >
          <input
            type="checkbox"
            checked={existingProblems.includes(problem.id)}
            onChange={() => toggleProblemSelection(problem.id)}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="flex-1 text-sm text-white truncate">
            {problem.problemTitle}
          </span>
          <button
            type="button"
            onClick={() => openProblemDetail(problem.id)}
            className="text-blue-400 underline text-xs"
          >
            Preview
          </button>
        </div>
      );
    })}
  </div>

  {/* Debug Preview of Selected IDs (Optional) */}
  <pre className="text-xs text-gray-400 mt-2">
    Selected IDs: {JSON.stringify(existingProblems, null, 2)}
  </pre>
</div>


        {/* Problem Preview Modal */}
        {selectedProblemDetail && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-8">
            <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-indigo-400 mb-4">
                {selectedProblemDetail.problemTitle}
              </h2>
              <pre className="text-sm whitespace-pre-wrap">
                {selectedProblemDetail.problemDescription}
              </pre>
              <button
                onClick={() => setSelectedProblemDetail(null)}
                className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}

        {/* Add New Problem Fields */}
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="text-lg font-semibold text-green-400 mb-4">
            Add New Problems
          </h3>

          {problems.map((problem, index) => (
            <div
              key={index}
              className="border border-gray-700 p-4 rounded space-y-4 mb-6 bg-gray-900"
            >
              <div>
                <label className="block text-sm">Title</label>
                <input
                  className="w-full bg-gray-800 text-white p-2 rounded"
                  value={problem.problemTitle}
                  onChange={(e) => {
                    const updated = [...problems];
                    updated[index].problemTitle = e.target.value;
                    setProblems(updated);
                  }}
                />
              </div>

              <div>
                <label className="block text-sm">Description</label>
                <textarea
                  className="w-full bg-gray-800 text-white p-2 rounded"
                  value={problem.problemDescription}
                  onChange={(e) => {
                    const updated = [...problems];
                    updated[index].problemDescription = e.target.value;
                    setProblems(updated);
                  }}
                />
              </div>

              <div>
                <label className="block text-sm">Difficulty</label>
                <select
                  className="w-full bg-gray-800 text-white p-2 rounded"
                  value={problem.problemDifficulty}
                  onChange={(e) => {
                    const updated = [...problems];
                    updated[index].problemDifficulty = e.target.value;
                    setProblems(updated);
                  }}
                >
                  <option value="EASY">EASY</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HARD">HARD</option>
                </select>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setProblems([
                ...problems,
                JSON.parse(JSON.stringify(problems[0])), // clone structure
              ])
            }
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
          >
            + Add Another New Problem
          </button>
        </div>

        {/* Submit / Cancel Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white"
          >
            Submit Contest
          </button>
          <button
            type="button"
            onClick={handleCancelForm}
            className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
