import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, History, ChevronRight, Inbox, X, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";

export default function Submission({ problemId }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal States
  const [selectedSub, setSelectedSub] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        
        // Sorting by most recent
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
    <div className="max-w-4xl mx-auto py-6">
      <div className="flex items-center gap-3 mb-8 ml-1">
        <History size={16} className="text-zinc-500" />
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Submission History</span>
      </div>

      {loading ? (
        <div className="text-zinc-500 text-xs font-mono animate-pulse uppercase tracking-widest">Fetching records...</div>
      ) : submissions.length > 0 ? (
        <div className="space-y-3">
          <AnimatePresence>
            {submissions.map((sub, index) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => openCodeModal(sub)}
                className="group flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-[#0D0D0D] border border-gray-800/50 rounded-xl hover:border-blue-500/40 hover:bg-[#111111] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`px-2.5 py-1 rounded text-[10px] font-black uppercase border ${getStatusStyle(sub.status)}`}>
                    {sub.status?.replace("_", " ")}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-200 uppercase tracking-tight">{sub.language}</span>
                    <span className="text-[10px] text-zinc-600 font-mono">{timeAgo(sub.submittedAt)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-4 md:mt-0">
                    <div className="hidden lg:flex gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-tighter">Tests Passed</span>
                            <span className="text-xs text-zinc-400 font-mono">{sub.totalPassedTestcases}/{sub.totalTestcases}</span>
                        </div>
                    </div>
                    <ChevronRight size={16} className="text-zinc-800 group-hover:text-zinc-400 transition-colors" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-zinc-500 text-center py-20 border border-dashed border-zinc-800 rounded-2xl">No submissions found</div>
      )}

      {/* --- CODE DETAIL MODAL --- */}
      <AnimatePresence>
        {isModalOpen && selectedSub && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md" 
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl h-[85vh] bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0D0D0D]">
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded text-[10px] font-black border uppercase ${getStatusStyle(selectedSub.status)}`}>
                    {selectedSub.status?.replace("_", " ")}
                  </div>
                  <div className="h-4 w-[1px] bg-white/10" />
                  <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest">
                    {new Date(selectedSub.submittedAt).toLocaleDateString()} at {new Date(selectedSub.submittedAt).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => navigator.clipboard.writeText(selectedSub.code)} 
                        className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 transition-colors group"
                        title="Copy Code"
                    >
                        <Copy size={18} className="group-hover:text-white" />
                    </button>
                    <button 
                        onClick={() => setIsModalOpen(false)} 
                        className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 transition-colors group"
                    >
                        <X size={22} className="group-hover:text-white" />
                    </button>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="flex items-center gap-12 px-8 py-4 bg-[#080808] border-b border-white/5">
                <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-1">Runtime</span>
                    <span className="text-lg text-emerald-500 font-mono font-bold">{selectedSub.timeComplexity || "N/A"}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-1">Memory</span>
                    <span className="text-lg text-blue-500 font-mono font-bold">{selectedSub.spaceComplexity || "N/A"}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-1">Language</span>
                    <span className="text-lg text-zinc-200 font-mono uppercase font-bold">{selectedSub.language}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-1">Testcases</span>
                    <span className="text-lg text-zinc-200 font-mono font-bold">{selectedSub.totalPassedTestcases} / {selectedSub.totalTestcases}</span>
                </div>
              </div>

              {/* Editor Container */}
              <div className="flex-1 overflow-hidden relative bg-[#0a0a0a]">
                <Editor
                  theme="vs-dark"
                  language={selectedSub.language?.toLowerCase()}
                  value={selectedSub.code}
                  options={{
                    readOnly: true,
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    minimap: { enabled: false }, // <--- THIS LINE REMOVES THE MIRROR
                    scrollBeyondLastLine: false,
                    lineNumbers: "on",
                    padding: { top: 20, bottom: 20 },
                    renderLineHighlight: "none",
                    domReadOnly: true,
                    contextmenu: false
                  }}
                  onMount={(editor, monaco) => {
                    monaco.editor.defineTheme('submissionTheme', {
                      base: 'vs-dark',
                      inherit: true,
                      rules: [],
                      colors: { 'editor.background': '#0A0A0A' }
                    });
                    monaco.editor.setTheme('submissionTheme');
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