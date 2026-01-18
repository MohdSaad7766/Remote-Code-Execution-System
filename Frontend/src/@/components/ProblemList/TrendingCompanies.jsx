import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ChevronDown, ChevronUp, X, Search } from "lucide-react";

const TrendingCompanies = ({ selectedCompanyIds = [], onCompaniesChange }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const INITIAL_VISIBLE_COUNT = 12;
  const transitionConfig = { type: "spring", stiffness: 300, damping: 30 };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("http://localhost:8090/problem/get-all-companies");
        const data = await response.json();
        const sorted = data.sort((a, b) => (b.problemCtn || 0) - (a.problemCtn || 0));
        setCompanies(sorted);
      } catch (err) {
        console.error("Error fetching companies", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((c) =>
    c.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleCompany = (companyId) => {
    const currentIds = Array.isArray(selectedCompanyIds) ? selectedCompanyIds : [];
    const newSelection = currentIds.includes(companyId)
      ? currentIds.filter((id) => id !== companyId)
      : [...currentIds, companyId];
    onCompaniesChange(newSelection);
  };

  if (loading) return (
    <div className="w-full flex justify-center py-10">
      <div className="h-6 w-32 bg-zinc-900 animate-pulse rounded-full" />
    </div>
  );

  return (
    <LayoutGroup>
      <motion.div 
        layout
        transition={transitionConfig}
        /* Applied permanent blue border, glowing shadow, and subtle tint */
        className="w-full rounded-2xl p-6  backdrop-blur-xl border border-zinc-500/50 bg-zinc-600/5 shadow-[0_0_25px_-5px_rgba(59,130,246,0.2)] flex flex-col overflow-hidden transition-all duration-500"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 px-1 h-5 shrink-0">
          <motion.span layout className="text-[10px] font-bold text-blue-400 hover:text-blue-300 uppercase tracking-[0.2em]">
            Filter by Company
          </motion.span>
          <AnimatePresence>
            {selectedCompanyIds.length > 0 && (
              <motion.button 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={() => onCompaniesChange([])} 
                className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400 hover:text-blue-300 uppercase tracking-[0.1em]"
              >
                <X size={12} /> Clear ({selectedCompanyIds.length})
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Search Bar */}
        <div 
          className={`flex items-center w-full h-8 mb-4 rounded-full border transition-colors duration-300 ${
            searchQuery || isFocused
              ? "bg-zinc-900 border-blue-500 shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]" 
              : "bg-zinc-900/50 border-zinc-700 hover:border-zinc-500"
          }`}
        >
          <div className="pl-3 pr-1 text-zinc-500">
            <Search size={14} className={searchQuery || isFocused ? "text-blue-400" : ""} />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search companies..."
            value={searchQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-[11px] text-zinc-200 placeholder:text-zinc-600 focus:ring-0 px-2"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="pr-3 text-zinc-500 hover:text-zinc-300"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Company Pills Grid */}
        <motion.div 
          layout
          className={`flex flex-wrap justify-center items-start gap-2 pt-1 overflow-y-auto no-scrollbar transition-[max-height] duration-500 ${
            expanded || searchQuery ? "max-h-[400px]" : "max-h-[120px]"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredCompanies.map((company, index) => {
              const isSelected = selectedCompanyIds.includes(company.id);
              const isHidden = !expanded && !searchQuery && index >= INITIAL_VISIBLE_COUNT;

              if (isHidden) return null;

              return (
                <motion.button
                  key={company.id}
                  layout="position"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleToggleCompany(company.id)}
                  className={`group flex items-center gap-2 px-3.5 py-1.5 h-8 rounded-full text-[11px] font-medium border shrink-0 transition-colors duration-300 ${
                    isSelected
                      ? "bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_-3px_rgba(59,130,246,0.6)]"
                      : "bg-zinc-900/50 border-zinc-700 text-white-400 hover:border-zinc-500 hover:text-zinc-200"
                  }`}
                >
                  <span>{company.companyName}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? "bg-blue-400/30 text-blue-100" : "bg-zinc-800 text-zinc-500"
                  }`}>
                    {company.problemCtn}
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Footer Toggle */}
        {!searchQuery && companies.length > INITIAL_VISIBLE_COUNT && (
          <motion.div layout className="mt-5 pt-4 border-t border-white/5 flex justify-center">
            <button 
              onClick={() => setExpanded(!expanded)} 
              className="group flex items-center gap-2 text-[9px] font text-zinc-400 hover:text-zinc-300 uppercase tracking-[0.2em] transition-colors"
            >
              <AnimatePresence mode="wait">
                <motion.span 
                  key={expanded ? "less" : "more"}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-2"
                >
                  {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  {expanded ? "Show Less" : `Show More (${companies.length - INITIAL_VISIBLE_COUNT})`}
                </motion.span>
              </AnimatePresence>
            </button>
          </motion.div>
        )}

        <style jsx>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </motion.div>
    </LayoutGroup>
  );
};

export default TrendingCompanies;