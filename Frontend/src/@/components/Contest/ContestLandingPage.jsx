import React, { useEffect, useState, useRef } from "react";
import ContestCard from "./ContestCard";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ContestLandingPage() {
  const location = useLocation();
  const [activeDiv, setActiveDiv] = useState(() => {
    return localStorage.getItem("lastActiveTab") || "PAST";
  });
  
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Data States
  const [contests, setContests] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1, // API is 1-indexed
    totalPages: 0,
    totalItems: 0
  });

  const tabOrder = ["PAST", "UPCOMING", "LIVE"];
  const tabRefs = { PAST: useRef(null), UPCOMING: useRef(null), LIVE: useRef(null) };
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const currentPath = location.pathname;
    return () => {
      if (!currentPath.includes("/contest-landing")) {
        localStorage.removeItem("lastActiveTab");
      }
    };
  }, [location]);

  const fetchWithToken = async (url) => {
    const token = localStorage.getItem("token");
    // if (!token) {
    //   console.error("Token missing");
    //   return null;
    // }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });

      if (response.status === 403) {
        console.error("403 Forbidden - Check CORS or Token");
        return null;
      }

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (err) { 
      console.error("Fetch error:", err);
      return null; 
    }
  };

  const fetchTabData = async (tab, page = 1) => {
    setLoading(true);
    let url = "";
    
    if (tab === "PAST") {
      url = `http://localhost:8090/contest/get-past-contests/${page}`;
    } else if (tab === "UPCOMING") {
      url = `http://localhost:8090/contest/get-upcoming-contests/${page}`;
    } else if (tab === "LIVE") {
      url = `http://localhost:8090/contest/get-live-contests/${page}`;
    }

    const data = await fetchWithToken(url);

    if (data) {
      if (data.content) {
        // Paginated Response (Past/Upcoming)
        setContests(data.content);
        setPagination({
          currentPage: data.currentPage || page,
          totalPages: data.totalPages,
          totalItems: data.totalItems
        });
      } else {
        // Direct Array Response (Live)
        setContests(Array.isArray(data) ? data : data.contests || []);
        setPagination({ currentPage: 1, totalPages: 0, totalItems: 0 });
      }
    } else {
      setContests([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTabData(activeDiv, 1);
  }, [activeDiv]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchTabData(activeDiv, newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const currentRef = tabRefs[activeDiv]?.current;
    if (currentRef) {
      const rect = currentRef.getBoundingClientRect();
      const parentRect = currentRef.parentElement.getBoundingClientRect();
      setSliderStyle({ left: rect.left - parentRect.left, width: rect.width });
    }
  }, [activeDiv]);

  const toggleDiv = (divName) => {
    if (divName !== activeDiv) {
      setDirection(tabOrder.indexOf(divName) > tabOrder.indexOf(activeDiv) ? 1 : -1);
      localStorage.setItem("lastActiveTab", divName);
      setActiveDiv(divName);
    }
  };

  const renderContests = () => (
    contests.length > 0 ? (
      <div className="flex flex-col items-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-6">
          {contests.map((item, i) => (
            <motion.div
              key={item.id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="w-full flex justify-center"
            >
              {/* TRANSFORMING DATA FOR CONTESTCARD */}
              <ContestCard 
                contestData={{ 
                  ...item,
                  contest: {
                    contestId: item.id,
                    contestName: item.title,
                    contestDescription: item.description,
                    startTime: item.startTime,
                    endTime: item.endTime,
                    duration: item.duration,
                  },
                  userAlreadyRegistered: item.userRegistered,
                  pastContest: activeDiv === "PAST",
                  upcoming: activeDiv === "UPCOMING",
                  live: activeDiv === "LIVE"
                }} 
              />
            </motion.div>
          ))}
        </div>

        {pagination.totalPages > 1 && (
          <div className="flex items-center gap-4 mt-12 mb-10">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="p-2 rounded-lg bg-[#0a0a0a] border border-white/5 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-zinc-900 transition-colors"
            >
              <FiChevronLeft size={20} />
            </button>
            
            <div className="flex gap-2">
              {[...Array(pagination.totalPages)].map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => handlePageChange(idx + 1)}
                  className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all ${
                    pagination.currentPage === (idx + 1) 
                    ? "bg-blue-600 text-white" 
                    : "bg-[#0a0a0a] border border-white/5 text-zinc-500 hover:text-white"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="p-2 rounded-lg bg-[#0a0a0a] border border-white/5 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-zinc-900 transition-colors"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    ) : (
      <div className="flex flex-col items-center py-24 text-zinc-700">
        <p className="text-[11px] font-black uppercase tracking-[0.4em]">No {activeDiv} Contests Scheduled</p>
      </div>
    )
  );

  return (
    <div className="w-full bg-[#050505] min-h-screen text-white relative overflow-hidden">
      <div className="pt-8 pb-5 flex flex-col items-center text-center">
        <h1 className="text-[2.5rem] font-black italic tracking-tighter uppercase mb-4">
          Welcome to Code<span className="text-blue-500 font-black">Lab</span> Contest
        </h1>
        <p className="text-zinc-500 text-sm max-w-lg font-medium italic">
          Your ultimate destination for mastering Data Structures and Algorithms!
        </p>
      </div>

      <div className="flex justify-center mb-16">
        <div className="relative bg-[#0a0a0a] border border-white/5 rounded-2xl p-1 flex shadow-2xl">
          <motion.div
            className="absolute top-1 bottom-1 bg-blue-600 rounded-xl z-0"
            animate={sliderStyle}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          />
          {tabOrder.map((type) => (
            <button
              key={type}
              ref={tabRefs[type]}
              onClick={() => toggleDiv(type)}
              className={`relative z-10 px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${
                activeDiv === type ? "text-white" : "text-zinc-600 hover:text-zinc-400"
              }`}
            >
              {type === "LIVE" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mr-2" />}
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="relative min-h-[400px] flex justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${activeDiv}-${pagination.currentPage}`}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full flex justify-center pb-20"
          >
            {loading ? (
              <div className="py-20 flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-zinc-800 border-t-blue-500 rounded-full animate-spin" />
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Loading Arena</span>
              </div>
            ) : renderContests()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}