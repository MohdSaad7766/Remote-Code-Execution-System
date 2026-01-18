import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ContestNavbar from "./ContestNavbar";

const ContestLayout = () => {
  const [contestData, setContestData] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);

  const [showFullscreenModal, setShowFullscreenModal] = useState(false);
  const [fullscreenTimeout, setFullscreenTimeout] = useState(10);
  const [ignoreFullscreenExit, setIgnoreFullscreenExit] = useState(false);

  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [redirectCountdown, setRedirectCountdown] = useState(5);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [submissionTriggerSource, setSubmissionTriggerSource] = useState(null);

  const location = useLocation();
  const hideNavbar = /^\/contest\/[^/]+\/instructions$/.test(location.pathname);

  const formatTime = (sec) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleSubmitContest = (source = "manual") => {
    setSubmissionTriggerSource(source);
    setShowConfirmModal(true);
  };

  const confirmAndSubmit = async () => {
    try {
      setShowConfirmModal(false);
      setIgnoreFullscreenExit(true);

      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }

      const token = localStorage.getItem("token");
      const contestId = contestData?.contestId;

      if (!token || !contestId) throw new Error("Missing token or contestId");

      const response = await fetch(
        `http://localhost:8080/central/contest/submit-contest?contestId=${contestId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to submit contest");

      const result = await response.json();
      setSubmissionResult(result);
      setShowSubmissionModal(true);
      setRedirectCountdown(5);

      setTimeout(() => setIgnoreFullscreenExit(false), 1000);
    } catch (err) {
      console.error("❌ Submission error:", err);
      alert("Failed to submit contest.");
      setIgnoreFullscreenExit(false);
    }
  };

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

  useEffect(() => {
    const data = localStorage.getItem("contestData");
    const startTime = localStorage.getItem("contestStartTime");

    if (data && startTime) {
      const parsed = JSON.parse(data);
      const elapsed = Math.floor((Date.now() - parseInt(startTime)) / 1000);
      const remaining = Math.max(parsed.remainingTimeInSeconds - elapsed, 0);
      setContestData(parsed.contest);
      setRemainingTime(remaining);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (remainingTime <= 0) return;
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitContest("timeout");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [remainingTime]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (ignoreFullscreenExit) return;
      if (!document.fullscreenElement) {
        setShowFullscreenModal(true);
        setFullscreenTimeout(10);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [ignoreFullscreenExit]);

  useEffect(() => {
    let timer;
    if (showFullscreenModal && fullscreenTimeout > 0) {
      timer = setTimeout(() => {
        setFullscreenTimeout((prev) => prev - 1);
      }, 1000);
    } else if (fullscreenTimeout === 0) {
      handleSubmitContest("fullscreen");
    }
    return () => clearTimeout(timer);
  }, [showFullscreenModal, fullscreenTimeout]);

  const handleReEnterFullscreen = async () => {
    setShowFullscreenModal(false);
    try {
      await document.documentElement.requestFullscreen();
    } catch (err) {
      console.error("Failed to enter fullscreen", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-white">
      {!hideNavbar && (
        <ContestNavbar
          title={contestData?.contestName}
          time={formatTime(remainingTime)}
          onSubmit={() => handleSubmitContest("manual")}
        />
      )}

      {/* ✅ Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Confirm Submission</h2>
            <p className="mb-4">
              Are you sure you want to submit the contest?
              <br />
              {submissionTriggerSource === "timeout" && (
                <span className="text-sm text-gray-500">(Time is up)</span>
              )}
              {submissionTriggerSource === "fullscreen" && (
                <span className="text-sm text-gray-500">(Fullscreen exited)</span>
              )}
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={confirmAndSubmit}
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Submission Result Modal */}
      {showSubmissionModal && submissionResult && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
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
              You have scored : {submissionResult.percentage} %
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Redirecting in <strong>{redirectCountdown}</strong> second
              {redirectCountdown > 1 ? "s" : ""}...
            </p>
            <p className="text-xs text-gray-500 mb-4">
              You can close the contest window by clicking below; if it doesn’t
              close, you can close manually.
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

      {/* ✅ Fullscreen Exit Warning Modal */}
      {showFullscreenModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-2">⚠️ Fullscreen exited</h2>
            <p>
              You must return to fullscreen within {fullscreenTimeout} seconds.
            </p>
            <button
              onClick={handleReEnterFullscreen}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Re-enter Fullscreen
            </button>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default ContestLayout;
