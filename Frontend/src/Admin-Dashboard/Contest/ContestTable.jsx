import React, { useState } from "react";
import ContestForm from "./ContestForm";

const tempContests = [
  {
    contestName: "Mock Contest June 2025",
    contestDescription: "This is a mock contest for demonstration.",
    startTime: "2025-06-12T11:42:00",
    endTime: "2025-06-12T12:00:00",
    duration: 1080,
  },
  {
    contestName: "DSA Weekly Challenge",
    contestDescription: "Practice contest for weekly DSA sessions.",
    startTime: "2025-06-10T10:00:00",
    endTime: "2025-06-10T11:00:00",
    duration: 3600,
  },
];

function ContestRow({ contest, index, onDelete, onEdit }) {
  return (
    <tr className="bg-gray-950 dark:bg-gray-900 hover:bg-gray-900 dark:hover:bg-gray-800 transition-colors duration-200 border-b border-gray-700 dark:border-gray-700">
      <td className="px-4 py-3 text-sm text-center text-white">{index + 1}</td>
      <td className="px-4 py-3 text-sm text-white">{contest.contestName}</td>
      <td className="px-4 py-3 text-sm text-gray-400 truncate max-w-sm">
        {contest.contestDescription}
      </td>
      <td className="px-4 py-3 text-sm text-green-400">{new Date(contest.startTime).toLocaleString()}</td>
      <td className="px-4 py-3 text-sm text-red-400">{new Date(contest.endTime).toLocaleString()}</td>
      <td className="px-4 py-3 text-sm text-indigo-300 text-center">{Math.floor(contest.duration / 60)} min</td>
      <td className="px-4 py-3 text-center space-x-2">
        {/* <button
          onClick={() => onEdit(index)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-semibold py-1.5 px-3 rounded-lg shadow-sm transition"
        >
          Edit
        </button> */}
        <button
          onClick={() => onDelete(index)}
          className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-sm transition"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default function ContestTable() {
  const [modalIndex, setModalIndex] = useState(null);
  const [contests, setContests] = useState(tempContests);
  const [toggle,setToggle] = useState(false)

  const handleEdit = (index) => {
    alert(`Edit Contest: ${contests[index].contestName}`);
  };
  const handleAddContest = () =>{
    setToggle(!toggle);
  }
  const handleDelete = (index) => {
    setModalIndex(index);
  };

  const confirmDelete = () => {
    const updated = contests.filter((_, idx) => idx !== modalIndex);
    setContests(updated);
    setModalIndex(null);
  };

  return (
    <div className="p-4 md:ml-68 mt-0">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-white">Contest List</h1>
        <button
          onClick={handleAddContest}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded shadow"
        >
          + Add Contest
        </button>
      </div>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-900 dark:bg-gray-700 text-left text-sm font-semibold text-white">
            <th className="px-4 py-3 border-b text-center">#</th>
            <th className="px-4 py-3 border-b">Name</th>
            <th className="px-4 py-3 border-b">Description</th>
            <th className="px-4 py-3 border-b">Start</th>
            <th className="px-4 py-3 border-b">End</th>
            <th className="px-4 py-3 border-b text-center">Duration</th>
            <th className="px-4 py-3 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contests.map((contest, index) => (
            <ContestRow
              key={index}
              index={index}
              contest={contest}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
      {
        toggle && (
           <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn">
                         <div className="bg-gray-950 mt-10 dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[100vh] codeBar overflow-y-auto">
                           <ContestForm setToggle={setToggle} />
                        </div>
                      </div>
        )
      }
      {modalIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-gray-900 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4 text-amber-50 dark:text-white">Confirm Deletion</h2>
            <p className="text-sm text-gray-100 dark:text-gray-300 mb-6">
              Are you sure you want to delete contest #{modalIndex + 1}?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setModalIndex(null)}
                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-900 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
