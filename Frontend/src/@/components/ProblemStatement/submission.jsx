import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, 
  History, 
  ChevronRight, 
  X, 
  Copy, 
  ChevronLeft, 
  MoreHorizontal, 
  Terminal,
  Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";

export default function Submission({ problemId }) {
  const [submissions, setSubmissions] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalItems: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal States
  const [selectedSub, setSelectedSub] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch function mapped to your @PathVariable {pageNo}
  const fetchSubmissions = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8090/submission/get-by-problem-id/${page}?problemId=${problemId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch submission data");

      const data = await response.json();
      
      // Data mapping from your PaginatedResponse DTO
      setSubmissions(data.content || []);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalItems: data.totalItems
      });
    } catch (err) {
      setError("Failed to load submissions.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchSubmissions(0);
    } else {
      setLoading(false);
    }
  }, [problemId, token]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < pagination.totalPages) {
      fetchSubmissions(newPage);
      // Smooth scroll back to top of history section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now - past) / 1000);
    if (diff < 5) return "just now";
    if (diff < 60) return `${diff}s ago`;
    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return days < 7 ? `${days}d ago` : past.toLocaleDateString();
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "ACCEPTED": return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      case "WRONG_ANSWER": return "text-amber-500 bg-amber-500/10 border-amber-500/20";
      case "TIME_LIMIT_EXCEEDED": return "text-orange-500 bg-orange-500/10 border-orange-500/20";
      default: return "text-rose-500 bg-rose-500/10 border-rose-500/20";
    }
  };

  const openCodeModal = (sub) => {
    setSelectedSub(sub);
    setIsModalOpen(true);
  };

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 text-center px-6">
        <div className="p-4 rounded-full bg-zinc-900 border border-zinc-800">
          <Lock className="text-zinc-500" size={32} />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-medium text-white tracking-tight">Login to view history</h3>
          <p className="text-zinc-500 text-sm max-w-xs mx-auto font-light">Track your progress and review your code.</p>
        </div>
        <button onClick={() => navigate("/login")} className="px-8 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-lg">Sign In</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between mb-8 ml-1">
        <div className="flex items-center gap-3">
          <History size={16} className="text-zinc-500" />
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Submission History</span>
        </div>
        {!loading && (
          <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
            {pagination.totalItems} Total Records
          </span>
        )}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 w-full bg-white/[0.02] border border-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : submissions.length > 0 ? (
        <>
          <div className="min-h-[400px] space-y-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={pagination.currentPage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {submissions.map((sub, index) => (
                  <motion.div
                    key={sub.id}
                    onClick={() => openCodeModal(sub)}
                    className="group flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-[#0D0D0D] border border-gray-800/50 rounded-xl hover:border-blue-500/40 hover:bg-[#111111] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`px-2.5 py-1 rounded text-[10px] font-black uppercase border ${getStatusStyle(sub.status)}`}>
                        {sub.status?.replace("_", " ")}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-zinc-200 uppercase tracking-tight">{sub.language}</span>
                        <div className="flex items-center gap-2 text-[10px] text-zinc-600 font-mono">
                          <Calendar size={10} /> {timeAgo(sub.submittedAt)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                      <div className="flex gap-6">
                        <div className="flex flex-col items-end">
                          <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-tighter">Tests Passed</span>
                          <span className="text-xs text-zinc-400 font-mono">{sub.totalPassedTestcases}/{sub.totalTestcases}</span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-zinc-800 group-hover:text-zinc-400 transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* PAGINATION CONTROLLER */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-white/5">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 0}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white disabled:opacity-20 transition-colors"
            >
              <ChevronLeft size={14} /> Prev
            </button>

            <div className="flex items-center gap-2">
              {[...Array(pagination.totalPages)].map((_, i) => {
                // Logic to show truncated pages (1 ... 4 5 6 ... 20)
                if (pagination.totalPages > 6 && Math.abs(i - pagination.currentPage) > 1 && i !== 0 && i !== pagination.totalPages - 1) {
                  if (i === 1 || i === pagination.totalPages - 2) return <MoreHorizontal key={i} size={12} className="text-zinc-800" />;
                  return null;
                }
                return (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`w-8 h-8 rounded-lg text-[10px] font-bold transition-all ${
                      pagination.currentPage === i 
                      ? "bg-zinc-100 text-black shadow-lg shadow-white/5" 
                      : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages - 1}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white disabled:opacity-20 transition-colors"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </>
      ) : (
        <div className="text-zinc-500 text-center py-24 border border-dashed border-zinc-800 rounded-3xl">
          <Terminal size={30} className="mx-auto mb-4 opacity-20" />
          <p className="text-xs uppercase tracking-widest font-bold">No data compiled yet</p>
        </div>
      )}

      {/* --- CODE DETAIL MODAL --- */}
      <AnimatePresence>
        {isModalOpen && selectedSub && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md" 
            />

            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl h-[85vh] bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-[#0D0D0D]">
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded text-[10px] font-black border uppercase ${getStatusStyle(selectedSub.status)}`}>
                    {selectedSub.status?.replace("_", " ")}
                  </div>
                  <div className="h-4 w-[1px] bg-white/10" />
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">
                    {new Date(selectedSub.submittedAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => navigator.clipboard.writeText(selectedSub.code)} className="p-2.5 hover:bg-white/5 rounded-xl text-zinc-400 transition-all hover:text-white"><Copy size={18} /></button>
                  <button onClick={() => setIsModalOpen(false)} className="p-2.5 hover:bg-white/5 rounded-xl text-zinc-400 transition-all hover:text-white"><X size={22} /></button>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-10 py-6 bg-[#080808] border-b border-white/5">
                {[
                  { label: "Runtime", val: selectedSub.timeComplexity || "N/A", color: "text-emerald-500" },
                  { label: "Memory", val: selectedSub.spaceComplexity || "N/A", color: "text-blue-500" },
                  { label: "Language", val: selectedSub.language, color: "text-zinc-200" },
                  { label: "Test Cases", val: `${selectedSub.totalPassedTestcases}/${selectedSub.totalTestcases}`, color: "text-zinc-200" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[9px] text-zinc-600 font-black uppercase tracking-widest mb-1">{stat.label}</span>
                    <span className={`text-base font-mono font-bold ${stat.color}`}>{stat.val}</span>
                  </div>
                ))}
              </div>

              {/* Editor View */}
              <div className="flex-1 overflow-hidden relative bg-[#0a0a0a]">
                <Editor
                  theme="vs-dark"
                  language={selectedSub.language?.toLowerCase()}
                  value={selectedSub.code}
                  options={{
                    readOnly: true,
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    padding: { top: 25, bottom: 25 },
                    renderLineHighlight: "none",
                    contextmenu: false,
                    domReadOnly: true
                  }}
                  onMount={(editor, monaco) => {
                    monaco.editor.defineTheme('subTheme', {
                      base: 'vs-dark',
                      inherit: true,
                      rules: [],
                      colors: { 'editor.background': '#0A0A0A' }
                    });
                    monaco.editor.setTheme('subTheme');
                  }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}