import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, Trophy, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContestCard({ contestData }) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const isLoggedIn = token !== null;

  // State for API calls and UI
  const [loading, setLoading] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const {
    contest,
    userRegistered,
    userRejoin,
    contestSubmitted,
    userAlreadyRegistered,
    userParticipated,
    pastContest = false,
    upcoming = false,
    live = false,
    remainingTimeInSeconds = null,
  } = contestData;

  const {
    contestId,
    contestName,
    contestDescription,
    startTime,
    endTime,
    duration,
  } = contest;

  const [registered, setRegistered] = useState(userAlreadyRegistered);

  useEffect(() => {
    setRegistered(userAlreadyRegistered);
  }, [userAlreadyRegistered]);

  // Date Formatting
  const formattedStart = new Date(startTime).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const formattedEnd = new Date(endTime).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  // Logic: Require Login
  const handleRequireLogin = (actionFn) => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
    } else {
      actionFn();
    }
  };

  // Logic: Register for Contest
  const handleRegister = async () => {
    if (!token) {
      setShowLoginPopup(true);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8090/contest/register?contestId=${contestId}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register");
      }

      setRegistered(true);
      alert("✅ Registration Successful! You are now locked into the arena.");
    } catch (error) {
      console.error("❌ Registration error:", error);
      alert(error.message || "❌ Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Logic: Open Contest Instructions (Join/Rejoin)
  const handleOpenInstructions = () => {
    const url = `${window.location.origin}/contest/${contestId}/instructions`;
    const newTab = window.open(url, "_blank");
    if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
      alert("❌ Please allow popups to open the instructions page.");
    }
  };

  // Logic: View Results or Editorial
  const handleViewContest = async () => {
    navigate(`/contest/${contestId}/view`);
  };

  // UI Component: Status Badge
  const StatusBadge = () => {
    if (live) return <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-red-500/10 text-red-500 text-[10px] font-black tracking-widest uppercase border border-red-500/20"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Live</span>;
    if (upcoming) return <span className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-500 text-[10px] font-black tracking-widest uppercase border border-blue-500/20">Upcoming</span>;
    return <span className="px-2 py-1 rounded-md bg-zinc-500/10 text-zinc-500 text-[10px] font-black tracking-widest uppercase border border-zinc-500/20">Ended</span>;
  };

  // Dynamic Button Renderer
  const renderActionButton = () => {
    const baseBtn = "w-full py-3 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ";

    if (remainingTimeInSeconds !== null && remainingTimeInSeconds <= 0) {
      return <div className="text-red-400 text-xs font-bold text-center py-2 flex items-center justify-center gap-2"><AlertCircle size={14} /> Auto-Submitted</div>;
    }

    if (contestSubmitted) {
      return <div className="text-green-500 text-xs font-bold text-center py-2 flex items-center justify-center gap-2"><CheckCircle2 size={14} /> Successfully Submitted</div>;
    }

    if (upcoming) {
      if (registered) return <div className="text-blue-400 text-xs font-bold text-center py-3 border border-blue-500/20 rounded-xl bg-blue-500/5 uppercase tracking-widest">Already Registered</div>;
      return (
        <button 
          disabled={loading}
          onClick={() => handleRequireLogin(handleRegister)} 
          className={baseBtn + "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50"}
        >
          {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Register Now <ChevronRight size={14} /></>}
        </button>
      );
    }

    if (live) {
      if (!registered) return <div className="text-red-500/80 text-[10px] font-bold text-center py-2 uppercase tracking-tighter italic">Registration Closed</div>;
      return (
        <button onClick={() => handleRequireLogin(handleOpenInstructions)} className={baseBtn + "bg-green-600 hover:bg-green-500 text-white shadow-[0_0_20px_rgba(22,163,74,0.3)]"}>
          {userRejoin ? "Rejoin Arena" : "Join Contest"} <ChevronRight size={14} />
        </button>
      );
    }

    return (
      <button onClick={() => handleRequireLogin(handleViewContest)} className={baseBtn + "bg-white/5 hover:bg-white/10 text-white border border-white/10"}>
        {userParticipated ? "View My Result" : "View Editorial"} <Trophy size={14} />
      </button>
    );
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative w-full max-w-[400px] bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-500"
    >
      {/* Top Glow Accent Line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] z-10 opacity-70 ${live ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : upcoming ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-zinc-600'}`} />

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <StatusBadge />
          <div className="flex items-center gap-1 text-zinc-500 text-[10px] font-bold">
            <Clock size={12} /> {Math.floor(duration / 60)} MIN
          </div>
        </div>

        <h2 className="text-xl font-black italic tracking-tighter uppercase text-white mb-2 group-hover:text-blue-400 transition-colors">
          {contestName}
        </h2>

        <p className="text-zinc-500 text-xs leading-relaxed mb-6 line-clamp-2 italic font-medium">
          {contestDescription || "Join this arena to test your skills against the best developers."}
        </p>

        {/* Info Grid */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3 text-zinc-400">
            <div className="p-2 rounded-lg bg-white/5 border border-white/5"><Calendar size={14} className="text-blue-500" /></div>
            <div className="text-[11px] font-bold uppercase tracking-widest">
              <span className="block text-zinc-600 text-[9px]">Starts</span> {formattedStart}
            </div>
          </div>
          <div className="flex items-center gap-3 text-zinc-400">
            <div className="p-2 rounded-lg bg-white/5 border border-white/5"><Clock size={14} className="text-zinc-500" /></div>
            <div className="text-[11px] font-bold uppercase tracking-widest">
              <span className="block text-zinc-600 text-[9px]">Ends</span> {formattedEnd}
            </div>
          </div>
        </div>

        {renderActionButton()}
      </div>

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#0f0f0f] border border-white/10 p-8 rounded-2xl max-w-sm w-full text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/50" />
            <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="text-blue-500" size={32} />
            </div>
            <h2 className="text-xl font-black italic uppercase tracking-tighter mb-2 text-white">Login Required</h2>
            <p className="text-zinc-500 text-xs mb-6 uppercase font-bold tracking-widest">You need to be authenticated to enter this arena.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowLoginPopup(false)} className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Cancel</button>
              <button 
                onClick={() => navigate("/login", { state: { from: location } })} 
                className="flex-1 py-3 bg-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.3)] text-white"
              >
                Login Now
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}