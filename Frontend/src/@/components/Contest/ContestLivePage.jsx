import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProblemSidebar from "./ProblemSidebar";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

function getDifficultyColor(difficulty) {
  switch (difficulty.toUpperCase()) {
    case "EASY":
      return "text-green-600";
    case "MEDIUM":
      return "text-yellow-500";
    case "HARD":
      return "text-red-500";
    default:
      return "text-gray-400";
  }
}

const ContestLivePage = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();

  const [contestData, setContestData] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const [showFullscreenModal, setShowFullscreenModal] = useState(false);
  const [fullscreenTimeout, setFullscreenTimeout] = useState(10);
  const [problemList, setProblemList] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [problemStatusMap, setProblemStatusMap] = useState({});
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [redirectCountdown, setRedirectCountdown] = useState(5);

  // Request fullscreen on mount
  useEffect(() => {
    document.documentElement.requestFullscreen().catch(console.error);
  }, []);

  // Load problem statuses from localStorage
  useEffect(() => {
    const savedStatuses =
      JSON.parse(localStorage.getItem("problemStatuses")) || {};
    setProblemStatusMap(savedStatuses);
  }, []);

  // Load contest data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("contestData");
    const startTime = localStorage.getItem("contestStartTime");

    if (storedData && startTime) {
      const parsed = JSON.parse(storedData);
      setContestData(parsed.contest);

      const problems = parsed.problemList.map((entry) => entry.problem);
      setProblemList(problems);

      const elapsed = Math.floor((Date.now() - parseInt(startTime)) / 1000);
      const timeLeft = Math.max(parsed.remainingTimeInSeconds - elapsed, 0);
      setRemainingTime(timeLeft);
    }
  }, []);

  // Contest timer
  useEffect(() => {
    if (remainingTime <= 0) return;
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitContest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [remainingTime]);

  // Fullscreen exit detector
  useEffect(() => {
    let exited = false;
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !exited) {
        setShowFullscreenModal(true);
        setFullscreenTimeout(10);
        exited = true;
      } else if (document.fullscreenElement) {
        exited = false;
        setShowFullscreenModal(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Fullscreen countdown
  useEffect(() => {
    if (!showFullscreenModal || fullscreenTimeout <= 0) return;
    const timer = setTimeout(() => {
      setFullscreenTimeout((prev) => {
        if (prev === 1) {
          handleSubmitContest();
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [showFullscreenModal, fullscreenTimeout]);

  // Submission modal countdown
  useEffect(() => {
    if (!showSubmissionModal) return;
    const timer = setInterval(() => {
      setRedirectCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.close();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showSubmissionModal]);

  // Disable specific key actions
  useEffect(() => {
    const handleKeyDown = (e) => {
      const block = ["F5", "r", "c", "v", "x"];
      if (
        e.key === "F5" ||
        (e.ctrlKey && block.includes(e.key.toLowerCase())) ||
        (e.ctrlKey && /^[1-9]$/.test(e.key))
      ) {
        e.preventDefault();
      }
    };
    const handleContextMenu = (e) => e.preventDefault();
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("contextmenu", handleContextMenu);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const handleSubmitContest = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !contestData?.contestId)
        throw new Error("Missing token or contestId");

      const response = await fetch(
        `http://localhost:8080/central/contest/submit-contest?contestId=${contestData.contestId}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to submit contest");

      const result = await response.json();
      setSubmissionResult(result);
      setShowSubmissionModal(true);
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit contest.");
    }
  };

  const handleReEnterFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setShowFullscreenModal(false);
      setFullscreenTimeout(10);
    } catch (err) {
      console.error("Failed to enter fullscreen", err);
    }
  };

  const formatTime = (sec) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const renderMainContent = () => (
  <div className="w-full max-w-5xl px-6 py-4">
    <h2 className="text-3xl font-bold text-blue-400 drop-shadow-lg mb-6">Problem List</h2>

    {problemList.map((problem, index) => {
      const token = localStorage.getItem("token");
      const attemptKey = `${contestId}_${token}_${problem.problemId}`;
      const status = localStorage.getItem(attemptKey) || "Unattempted";

      return (
        <motion.div
          key={problem.problemId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
          className="bg-[#18181b] border border-zinc-700 rounded-2xl px-6 py-5 mb-5 shadow-md flex justify-between items-center transition-all hover:border-zinc-600 hover:scale-[1.01] hover:shadow-lg transform duration-150"
        >
          {/* Left Side: Problem Title and Difficulty */}
          <div className="flex flex-col gap-2">
            <div className="text-gray-300 font-semibold text-lg">
              {problem.problemTitle}
            </div>

            <span
              className={`font-semibold text-sm uppercase tracking-wide ${getDifficultyColor(
                problem.problemDifficulty
              )}`}
            >
              {problem.problemDifficulty}
            </span>
          </div>

          {/* Right Side: Solve Button & Attempt Status */}
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={() => navigate(`/contest/${contestId}/solve/${index}`)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition duration-150"
            >
              Solve Now
            </button>

            {status === "Solved" && (
              <div className="flex items-center gap-1 text-green-500 font-semibold text-sm">
                <CheckCircleIcon className="h-4 w-4" />
                Solved
              </div>
            )}
            {status === "Attempted" && (
              <div className="flex items-center gap-1 text-yellow-400 font-semibold text-sm">
                <ClockIcon className="h-4 w-4" />
                Attempted
              </div>
            )}
          </div>
        </motion.div>
      );
    })}
  </div>
);



  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {showSubmissionModal && submissionResult && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white text-center rounded-lg p-8 shadow-xl max-w-md w-full">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Your contest has been submitted successfully
            </h2>
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="h-10 w-10 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <p className="text-xl font-bold text-gray-800 mb-2">
              You have scored: {submissionResult.percentage} %
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Redirecting in <strong>{redirectCountdown}</strong> second
              {redirectCountdown > 1 ? "s" : ""}...
            </p>
            <p className="text-xs text-gray-500 mb-4">
              You can now close this tab. If it doesn’t close automatically,
              please close it manually.
            </p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => window.close()}
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <ProblemSidebar
          problems={problemList}
          selectedId={selectedProblem?.problemId}
          contestId={contestId}
          problemStatusMap={problemStatusMap}
        />
        <div className="flex-1 px-4 py-6 overflow-auto flex justify-center items-start">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};

export default ContestLivePage;
