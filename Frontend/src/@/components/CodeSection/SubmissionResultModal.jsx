import React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { FiX, FiCheckCircle, FiAlertCircle, FiClock, FiLayers } from "react-icons/fi";

const statusConfig = {
  ACCEPTED: { color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: <FiCheckCircle /> },
  WRONG_ANSWER: { color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20", icon: <FiAlertCircle /> },
  TIME_LIMIT_EXCEEDED: { color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", icon: <FiClock /> },
  MEMORY_LIMIT_EXCEEDED: { color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20", icon: <FiLayers /> },
};

export default function SubmissionResultModal({ result, onClose }) {
  if (!result) return null;

  const status = result.submissionStatus || "UNKNOWN";
  const config = statusConfig[status] || { 
    color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20", icon: <FiAlertCircle /> 
  };

  // createPortal moves this entire block to the <body> tag
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Background Overlay */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-[#0d0d0d] border border-white/10 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="flex justify-between items-center px-8 py-5 border-b border-white/5 bg-white/[0.02]">
          <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Execution Report</h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <FiX size={20} />
          </button>
        </div>

        <div className="p-8">
          <div className={`flex flex-col items-center text-center mb-8 p-6 rounded-2xl border ${config.bg} ${config.border}`}>
            <span className={`text-5xl mb-3 ${config.color}`}>{config.icon}</span>
            <h2 className={`text-3xl font-black italic tracking-tighter uppercase ${config.color}`}>
              {status.replace("_", " ")}
            </h2>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-2">
              Passed {result.totalPassedTestcases || 0} / {result.totalTestcases || 0} Test Cases
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/[0.03] border border-white/5 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <FiClock className="text-emerald-500" />
                <span className="text-[9px] font-black text-zinc-500 uppercase">Runtime</span>
              </div>
              <div className="text-sm font-mono font-bold text-zinc-200">{result.timeComplexity || "N/A"}</div>
            </div>
            <div className="bg-white/[0.03] border border-white/5 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <FiLayers className="text-orange-500" />
                <span className="text-[9px] font-black text-zinc-500 uppercase">Memory</span>
              </div>
              <div className="text-sm font-mono font-bold text-zinc-200">{result.spaceComplexity || "N/A"}</div>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 bg-white/[0.02] border-t border-white/5 flex justify-center">
          <button 
            onClick={onClose} 
            className="w-full py-3 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-zinc-200 transition-all active:scale-95"
          >
            Back to Editor
          </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}