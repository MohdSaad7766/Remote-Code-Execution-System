import React, { useState, useEffect } from "react";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Helper to get themed difficulty styles
 */
function getDifficultyColor(difficulty) {
  switch (difficulty?.toUpperCase()) {
    case "EASY":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "MEDIUM":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "HARD":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  }
}

/**
 * Helper to get status icons with glow effects
 */
function getStatusIcon(status) {
  switch (status) {
    case "SOLVED":
      return <CheckCircleIcon className="w-5 h-5 text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]" />;
    case "ATTEMPTED":
      return <ClockIcon className="w-5 h-5 text-yellow-500/70" />;
    default:
      return <div className="w-5 h-5 rounded-full border border-zinc-800" />;
  }
}

export default function ProblemTable({
  selectedCategory,
  searchQuery,
  selectedCompanyIds,
  selectedTopicIds,
}) {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    const params = new URLSearchParams();
    if (searchQuery?.trim()) params.append("title", searchQuery.trim());
    if (selectedCategory && selectedCategory.toLowerCase() !== "all") {
      params.append("difficulty", selectedCategory.toUpperCase());
    }
    if (selectedTopicIds?.length > 0) {
      selectedTopicIds.forEach((id) => params.append("topicIds", id));
    }
    if (selectedCompanyIds?.length > 0) {
      selectedCompanyIds.forEach((id) => params.append("companyIds", id));
    }

    const query = params.toString();
    const url = `http://localhost:8090/problem/get/${currentPage}${query ? `?${query}` : ""}`;

    fetch(url, { headers })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        const problemsWithFlags = (data.content || []).map(p => ({
          ...p,
          topicList: p.topics || [],
          companyList: p.companies || [],
        }));
        setProblems(problemsWithFlags);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) => console.error("Error fetching problems:", err))
      .finally(() => setLoading(false));
  }, [currentPage, selectedCategory, searchQuery, selectedCompanyIds, selectedTopicIds]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, selectedCompanyIds, selectedTopicIds]);

  return (
    <div className="w-full bg-zinc-600/5 backdrop-blur-xl rounded-2xl border border-zinc-500/50 shadow-[0_0_25px_-5px_rgba(59,130,246,0.2)] overflow-hidden transition-all duration-500 flex flex-col min-h-[650px]">
      
      {/* Table Container with scrollbar suppression */}
      <div className="overflow-x-auto overflow-y-hidden custom-scrollbar">
        <table className="w-full border-collapse text-sm min-w-[800px]">
          <thead>
            <tr className="border-b border-blue-500/20 text-zinc-500 text-[11px] uppercase tracking-[0.15em] font-bold bg-black/20">
              <th className="px-6 py-5 text-center w-[100px]">Status</th>
              <th className="px-6 py-5 text-left">Problem Title</th>
              <th className="px-6 py-5 text-center">Topics</th>
              <th className="px-6 py-5 text-center w-[140px]">Difficulty</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-white/5">
            <AnimatePresence mode="wait">
              {loading ? (
                /* Skeleton Loader with fixed heights to prevent layout shift */
                [...Array(8)].map((_, i) => (
                  <tr key={`skeleton-${i}`} className="animate-pulse">
                    <td className="px-6 py-8"><div className="w-5 h-5 bg-zinc-800 rounded-full mx-auto" /></td>
                    <td className="px-6 py-8">
                      <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2" />
                      <div className="h-2 bg-zinc-900 rounded w-1/4" />
                    </td>
                    <td className="px-6 py-8"><div className="h-4 bg-zinc-800 rounded w-24 mx-auto" /></td>
                    <td className="px-6 py-8"><div className="h-6 bg-zinc-800 rounded-full w-16 mx-auto" /></td>
                  </tr>
                ))
              ) : problems.length === 0 ? (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td colSpan="4" className="text-center py-40 text-zinc-500 italic">
                    No Problem Found.
                  </td>
                </motion.tr>
              ) : (
                problems.map((p, idx) => (
                  <motion.tr
                    key={p.problemId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="group hover:bg-blue-500/5 transition-colors cursor-default"
                  >
                    <td className="px-6 py-6 text-center">
                      <div className="flex justify-center">{getStatusIcon(p.problemStatus)}</div>
                    </td>
                    
                    <td className="px-6 py-6">
                      <Link 
                        to={`/problemstat/${p.problemId}`}
                        className="font-semibold text-zinc-200 hover:text-blue-400 transition-colors block mb-1"
                      >
                        {p.title}
                      </Link>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {(p.companyList || []).slice(0, 3).map((comp, i) => (
                          <span key={i} className="text-[10px] text-zinc-600 font-medium lowercase">#{comp}</span>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-6">
                      <div className="flex flex-wrap justify-center gap-1.5 max-w-[280px] mx-auto">
                        {(p.topicList || []).slice(0, 2).map((topic, i) => (
                          <span key={i} className="bg-zinc-800/40 text-zinc-400 border border-zinc-700/50 px-2.5 py-0.5 rounded-md text-[10px]">
                            {topic}
                          </span>
                        ))}
                        {p.topicList.length > 2 && (
                          <span className="text-zinc-600 text-[10px] self-center">
                            +{p.topicList.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold border inline-block min-w-[80px] ${getDifficultyColor(p.difficulty)}`}>
                        {p.difficulty}
                      </span>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Modern Pagination Bar - Pinned to bottom using mt-auto */}
      <div className="mt-auto px-8 py-5 border-t border-blue-500/20 flex justify-between items-center bg-black/40 backdrop-blur-xl">
        <span className="text-[11px] text-zinc-500 font-medium uppercase tracking-widest">
          Showing Page <span className="text-zinc-200">{currentPage}</span> of {totalPages}
        </span>
        
        <div className="flex items-center gap-3">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(v => v - 1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/50 disabled:opacity-20 disabled:cursor-not-allowed transition-all text-xs font-bold"
          >
            <ChevronLeft size={14} /> Prev
          </button>
          
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(v => v + 1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/50 disabled:opacity-20 disabled:cursor-not-allowed transition-all text-xs font-bold"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <style jsx>{`
        /* Suppresses the flash of vertical scrollbars */
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
          width: 0px; 
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 10px;
        }
        /* Handle scrollbar on horizontal if table is too wide for screen */
        @media (max-width: 1024px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
            height: 4px;
          }
        }
      `}</style>
    </div>
  );
}