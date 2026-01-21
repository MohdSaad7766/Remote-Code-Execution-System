import React from "react";
import { motion } from "framer-motion";
import { FiX, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export default function SubmissionResult({ status, onClose }) {
  const isAccepted = status === "ACCEPTED";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#0d0d0d] border border-white/10 w-full max-w-md rounded-3xl shadow-2xl p-8 relative overflow-hidden"
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-zinc-500 hover:text-white transition-colors">
          <FiX size={24} />
        </button>

        <div className="flex flex-col items-center text-center py-4">
          <div className={`mb-6 p-4 rounded-full ${isAccepted ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
            {isAccepted ? <FiCheckCircle size={64} /> : <FiAlertCircle size={64} />}
          </div>
          
          <h2 className={`text-3xl font-black uppercase tracking-tighter mb-2 ${isAccepted ? "text-emerald-500" : "text-red-500"}`}>
            {isAccepted ? "Accepted" : "Wrong Answer"}
          </h2>
          
          <p className="text-zinc-400 text-sm font-medium leading-relaxed max-w-[250px]">
            {isAccepted 
              ? "All test cases passed successfully! Your solution is optimal." 
              : "Your code failed on one or more test cases. Try debugging your logic."}
          </p>

          <button 
            onClick={onClose}
            className={`mt-8 w-full py-3 rounded-xl font-bold transition-all active:scale-95 ${
                isAccepted ? "bg-emerald-600 hover:bg-emerald-500 text-white" : "bg-zinc-800 hover:bg-zinc-700 text-white"
            }`}
          >
            {isAccepted ? "Keep it up!" : "Try Again"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}