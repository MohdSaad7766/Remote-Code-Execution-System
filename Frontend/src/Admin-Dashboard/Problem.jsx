import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProblemForm from "./ProblemForm/ProblemForm";

function ProblemRow({ problem, index, onDelete, onEdit }) {
  return (
    <tr className="bg-gray-950 dark:bg-gray-900 hover:bg-gray-800 transition-colors duration-200 border-b border-gray-700">
      <td className="px-4 py-3 text-sm text-gray-200 text-center">{index + 1}</td>
      <td className="px-4 py-3 text-sm text-gray-200 max-w-xs truncate">{problem.title}</td>
      <td className="px-4 py-3 text-sm text-indigo-300 font-semibold">{problem.category || "DSA"}</td>
      <td className="px-4 py-3 text-gray-200 text-sm">
        <span
          className={`inline-block px-2 py-1 text-xs font-semibold rounded-full shadow-sm ${
            problem.difficulty === "Easy"
              ? "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300"
              : problem.difficulty === "Medium"
              ? "bg-yellow-200 text-yellow-900 dark:bg-yellow-800 dark:text-yellow-200"
              : "bg-red-200 text-red-900 dark:bg-red-800 dark:text-red-200"
          }`}
        >
          {problem.difficulty}
        </span>
      </td>
      <td className="px-4 py-3 text-center space-y-2 sm:space-y-0 sm:space-x-2 flex sm:inline-flex flex-col sm:flex-row justify-center items-center">
        <button
          onClick={() => onEdit(problem)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-semibold py-1.5 px-3 rounded-lg shadow-sm transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(problem._id)}
          className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-sm transition"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default function ProblemTable() {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  // Fetch problems from backend
  const fetchProblems = async () => {
    try {
      const response = await fetch("http://localhost:8090/problem/get");
      const data = await response.json();

      console.log("Fetched problems:", data);

      // If your backend sends { data: [...] }
      const actualData = Array.isArray(data) ? data : data.data;

      if (Array.isArray(actualData)) {
        setProblems(actualData);
      } else {
        console.error("Expected an array, got:", actualData);
        setProblems([]);
      }
    } catch (err) {
      console.error("Failed to fetch problems", err);
      setProblems([]);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleAddProblem = () => {
    setSelectedProblem(null);
    setShowForm(true);
  };

  const handleEdit = (problem) => {
    setSelectedProblem(problem);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:8080/central/problem/delete/${deleteId}`, {
        method: "DELETE",
      });
      setDeleteId(null);
      fetchProblems(); // Refresh list
    } catch (err) {
      console.error("Failed to delete problem", err);
    }
  };

  return (
    <div className="p-4 mt-0 md:ml-68">
      <div className="flex justify-between items-start sm:items-center mb-4 gap-2">
        <h1 className="text-xl font-bold text-gray-100">Problem List</h1>
        <button
          onClick={handleAddProblem}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded shadow"
        >
          + Add Problem
        </button>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="min-w-[600px] w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-900 text-left text-sm font-semibold text-gray-100">
              <th className="px-4 py-3 border-b text-center">#</th>
              <th className="px-4 py-3 border-b">Title</th>
              <th className="px-4 py-3 border-b">Category</th>
              <th className="px-4 py-3 border-b">Difficulty</th>
              <th className="px-4 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(problems) && problems.length > 0 ? (
              problems.map((problem, index) => (
                <ProblemRow
                  key={problem._id}
                  index={index}
                  problem={problem}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-400 py-4">
                  No problems found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4 text-white">Confirm Deletion</h2>
            <p className="text-sm text-gray-300 mb-6">
              Are you sure you want to delete this problem?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm rounded bg-gray-600 hover:bg-gray-700 text-white"
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

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-gray-950 mt-10 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4">
            <ProblemForm
              problem={selectedProblem}
              onClose={() => setShowForm(false)}
              onSaved={fetchProblems}
            />
          </div>
        </div>
      )}
    </div>
  );
}
