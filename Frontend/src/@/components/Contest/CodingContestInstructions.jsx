import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CodingContestInstructions = () => {
  const navigate = useNavigate();


  useEffect(() => {
    
        window.location.reload(); // Reload page when token is removed
     
  }, localStorage.getItem('token'));

  const handleStartContest = () => {
    navigate("/contest-started");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full shadow-xl rounded-2xl border border-gray-800 p-6">
        <h1 className="text-3xl text-white font-bold mb-4 text-center">
          Coding Contest Instructions
        </h1>

        <div className="space-y-4 text-white text-base">
          <div>
            <h2 className="font-semibold text-lg">General Instructions:</h2>
            <ul className="list-disc list-inside">
              <li>Total Duration: <strong>90 minutes</strong></li>
              <li>Each question carries different weightage</li>
              <li>You can choose any language from the supported list</li>
              <li>All answers are auto-evaluated against hidden test cases</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg">Rules:</h2>
            <ul className="list-disc list-inside">
              <li>Do not close or refresh the page once the contest begins</li>
              <li>Any kind of plagiarism will result in disqualification</li>
              <li>You can view all questions during the contest</li>
              <li>Internet connectivity is your responsibility</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg">Ready to begin?</h2>
            <p>Click the button below to start the contest timer and begin solving questions.</p>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={handleStartContest}
              className="bg-white hover:bg-gray-300 text-black text-lg px-6 py-2 rounded-xl"
            >
              Start Contest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingContestInstructions;
