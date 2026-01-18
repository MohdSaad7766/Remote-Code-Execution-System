import React from 'react';
import { Link } from 'react-router-dom';
export default function LoginPopup({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black border h-[30%] border-gray-800 shadow-gray-600 p-6 rounded-lg shadow-sm text-center w-[80%] max-w-md">
        <h2 className="text-xl  text-white font-semibold mb-4">Login Required</h2>
        <p className="mb-6 text-white">You need to be logged in to access this feature.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}