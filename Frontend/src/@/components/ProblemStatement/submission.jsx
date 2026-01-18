import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, History, ChevronRight, Inbox } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Submission({ problemId }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchSubmissionDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8090/submission/get-by-problem-id?problemId=${problemId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch submission data");

        const data = await response.json();
        const submissionsArray = Array.isArray(data) ? data : [];

        const sortedData = submissionsArray.sort(
          (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
        );

        setSubmissions(sortedData);
      } catch (err) {
        setError("Failed to load submissions.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissionDetails();
  }, [problemId, token]);

  const formatDate = (datetimeStr) => {
    const date = new Date(datetimeStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now - past) / 1000); // seconds

    if (diff < 5) return "just now";
    if (diff < 60) return `${diff} seconds ago`;

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

    return past.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };


  const getStatusStyle = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      case "WRONG_ANSWER":
        return "text-amber-500 bg-amber-500/10 border-amber-500/20";
      default:
        return "text-rose-500 bg-rose-500/10 border-rose-500/20";
    }
  };

  // --- LOGGED OUT STATE ---
  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 text-center px-6">
        <div className="p-4 rounded-full bg-zinc-900 border border-zinc-800">
          <Lock className="text-zinc-500" size={32} />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-medium text-white tracking-tight">
            Login to view history
          </h3>
          <p className="text-zinc-500 text-sm max-w-xs mx-auto font-light">
            Track your progress and review your previous code submissions for this problem.
          </p>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="px-8 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-zinc-200 transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="flex items-center gap-3 mb-8 ml-1">
        <History size={16} className="text-zinc-500" />
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">
          Submission History
        </span>
      </div>

      {loading ? (
        <div className="text-zinc-500 text-xs font-mono animate-pulse uppercase tracking-widest">
          Fetching records...
        </div>
      ) : error ? (
        <div className="p-4 rounded-lg border border-rose-500/20 bg-rose-500/5 text-rose-500 text-xs font-mono">
          {error}
        </div>
      ) : submissions.length > 0 ? (
        <div className="space-y-3">
          <AnimatePresence>
            {submissions.map((sub, index) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-[#0D0D0D] border border-gray-800/50 rounded-xl hover:border-gray-700 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div
                    className={`px-2.5 py-1 rounded text-[10px] font-black uppercase border ${getStatusStyle(sub.status)}`}
                  >
                    {sub.status?.replace("_", " ")}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-200 uppercase tracking-tight">
                      {sub.language}
                    </span>
                    <span className="text-[10px] text-zinc-600 font-mono">
                      {timeAgo(sub.submittedAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-8 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-tighter">
                        Time Complexcity
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">
                        {sub.timeComplexity || "—"}
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-tighter">
                        Space Complexcity
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">
                        {sub.spaceComplexity || "—"}
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-tighter">
                        Tests
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">
                        {sub.totalPassedTestcases}/{sub.totalTestcases}
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    size={16}
                    className="text-zinc-800 group-hover:text-zinc-400 transition-colors"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/10"
        >
          <div className="p-3 rounded-full bg-zinc-900/50 mb-4 border border-zinc-800/50">
            <Inbox className="text-zinc-600" size={24} />
          </div>
          <p className="text-zinc-400 text-sm font-medium tracking-tight">
            No submissions found
          </p>
          <p className="text-zinc-600 text-xs font-light mt-1">
            You haven't attempted this problem yet.
          </p>
        </motion.div>
      )}
    </div>
  );
}
