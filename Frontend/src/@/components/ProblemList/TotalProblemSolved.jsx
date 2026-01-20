import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TotalProblemSolved = () => {
  const [stats, setStats] = useState({ totalProblemsSolved: 0, totalProblems: 0 });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = { "Content-Type": "application/json" };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch("http://localhost:8090/problem/get-solved-ctn-by-user", {
          headers: headers,
        });

        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching solved stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  
  // Logic: Use API value if logged in, otherwise force 0 for display
  const displaySolved = token ? stats.totalProblemsSolved : 0;
  const percentage = stats.totalProblems > 0 
    ? (displaySolved / stats.totalProblems) * 100 
    : 0;
  
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-4 h-11 px-5 bg-zinc-600/5 border border-zinc-500/50 rounded-xl shadow-[0_0_15px_-5px_rgba(59,130,246,0.2)] select-none transition-all hover:border-zinc-500">
      {/* Circle Section */}
      <div className="relative w-8 h-8 flex-shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <circle
            className="text-zinc-800"
            strokeWidth="3"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="18"
            cy="18"
          />
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: loading ? circumference : strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-blue-400"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="18"
            cy="18"
          />
        </svg>
      </div>

      {/* Text Section */}
      <div className="flex items-center gap-1 whitespace-nowrap">
        <span className="text-lg font-bold text-white tabular-nums">
          {displaySolved}
        </span>
        <span className="text-zinc-500 text-sm font-medium">
          /{stats.totalProblems}
        </span>
        <span className="text-zinc-400 text-sm ml-1 font-medium">
          Solved
        </span>
      </div>
    </div>
  );
};

export default TotalProblemSolved;