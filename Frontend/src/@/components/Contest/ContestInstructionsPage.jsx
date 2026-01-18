import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ShieldAlert,
  Timer,
  ClipboardX,
  MonitorX,
  Rocket,
} from "lucide-react";

const ContestInstructionsPage = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const startContest = async () => {
    if (!token) {
      alert("🔒 You must be logged in to start the contest.");
      navigate("/login");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/central/contest/user-start-contest?contestId=${contestId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to start contest");

      const data = await response.json();
      localStorage.removeItem("contestData");
      localStorage.setItem("contestData", JSON.stringify(data));
      localStorage.setItem("contestStartTime", Date.now().toString());

      navigate(`/contest/${contestId}`);
    } catch (err) {
      console.error("Error starting contest:", err);
      alert("❌ Could not start contest. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-[#1a1a1a] border border-gray-800 p-10 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold text-center text-blue-500 mb-8">
          Contest Instructions
        </h1>

        <ul className="space-y-4 text-gray-300 text-base">
          <li className="flex items-start gap-3">
            <Timer className="text-yellow-400 mt-1" /> Once started, the contest
            timer cannot be paused.
          </li>
          <li className="flex items-start gap-3">
            <ClipboardX className="text-red-400 mt-1" /> Copy-paste will be
            disabled to ensure fairness.
          </li>
          <li className="flex items-start gap-3">
            <MonitorX className="text-pink-400 mt-1" /> Switching tabs or
            windows may disqualify your session.
          </li>
          <li className="flex items-start gap-3">
            <ShieldAlert className="text-purple-400 mt-1" /> Your actions may be
            monitored for integrity.
          </li>
          <li className="flex items-start gap-3">
            <Rocket className="text-green-400 mt-1" /> Submit only when you're
            confident. Early submission ends your attempt.
          </li>
          <li className="flex items-start gap-3">
            <ShieldAlert className="text-orange-500 mt-1" />
            If you exit fullscreen, your contest will be auto-submitted.
          </li>
        </ul>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShowConfirmModal(true)}
            disabled={isLoading}
            className={`px-8 py-3 rounded-xl text-lg font-semibold shadow-md transition-all duration-300
              ${
                isLoading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
              }`}
          >
            {isLoading ? "Starting..." : "Start Contest"}
          </button>
        </div>
      </div>

      {/* Custom Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-xl shadow-lg w-full max-w-md text-white border border-zinc-700">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Start Contest?
            </h2>
            <p className="text-gray-300 mb-6 text-center">
              Are you sure you want to begin? The timer will start immediately.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  startContest();
                }}
                className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg"
              >
                Yes, Start
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestInstructionsPage;
