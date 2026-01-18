import React, { useState } from "react";
import ProblemTable from "./ProblemTable";
import TrendingCompanies from "./TrendingCompanies";
import TagList from "./TagsList"; 
import { RotateCcw, Search, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categoryOptions = [
  { id: 1, name: "EASY" },
  { id: 2, name: "MEDIUM" },
  { id: 3, name: "HARD" },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Elements appear one by one
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  },
};

export default function ProblemList() {
  const [selectedCategory, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompanyIds, setSelectedCompanyIds] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState([]);

  const resetFilters = () => {
    setCategory("");
    setSelectedCompanyIds([]);
    setSelectedTagIds([]);
    setSearchQuery("");
  };

  const controlElementStyle = "bg-zinc-600/5 border-zinc-500/50 shadow-[0_0_15px_-5px_rgba(59,130,246,0.2)]";

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen text-white relative selection:bg-blue-500/30 font-sans"
      style={{ background: "radial-gradient(circle at center, #0f0f0f 0%, #000000 100%)" }}
    >
      {/* --- TOP SECTION --- */}
      <div className="w-full relative overflow-hidden">
        {/* Subtle Background Glow Animation */}
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-full h-[500px] bg-zinc-600/10 blur-[120px] rounded-full pointer-events-none" 
        />

        <div className="max-w-[1300px] mx-auto px-6 relative z-10">
          {/* 1. TagList with Slide-in */}
          <motion.div variants={itemVariants} className="pt-10 pb-6">
            <TagList 
              selectedTagIds={selectedTagIds} 
              onTagsSelect={setSelectedTagIds} 
            />
          </motion.div>

          {/* 2. Control Bar */}
          <motion.div variants={itemVariants} className="pb-10">
            <div className="flex flex-col md:flex-row items-center gap-3 w-full">
              {/* Search Bar */}
              <div className="relative flex-grow h-11 group w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  placeholder="Search Problem by title..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full h-full ${controlElementStyle} text-zinc-200 text-sm pl-11 pr-4 rounded-xl border outline-none transition-all placeholder:text-zinc-600 focus:border-blue-400 focus:bg-blue-600/10 focus:shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)]`}
                />
              </div>

              {/* Filters Group */}
              <div className="flex items-center gap-3 w-full md:w-auto h-11">
                <div className="relative h-full w-44 group">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setCategory(e.target.value)} 
                    className={`w-full h-full ${controlElementStyle} border rounded-xl text-xs pl-9 pr-8 appearance-none outline-none cursor-pointer transition-all text-zinc-400 focus:border-blue-400`}
                  >
                    <option value="" className="bg-zinc-950">Difficulties</option>
                    {categoryOptions.map(c => (
                      <option key={c.id} value={c.name} className="bg-zinc-950">{c.name}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1L5 5L9 1" /></svg>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={resetFilters} 
                  className={`h-full aspect-square ${controlElementStyle} border rounded-xl flex justify-center items-center group transition-all duration-300`}
                >
                  <RotateCcw className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 group-hover:rotate-[-180deg] transition-all duration-700" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="max-w-[1300px] mx-auto px-6 pt-0">
        <motion.div 
          layout // Smoothly re-layouts when items change
          className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 pb-20 relative items-start"
        >
          {/* Main Table Column */}
          <motion.div 
            variants={itemVariants}
            className="min-w-0"
          >
              <ProblemTable
                selectedCategory={selectedCategory}
                searchQuery={searchQuery}
                selectedTopicIds={selectedTagIds}
                selectedCompanyIds={selectedCompanyIds}
              />
          </motion.div>

          {/* Sidebar Column */}
          <motion.aside 
            variants={itemVariants}
            className="hidden lg:block h-fit" 
          >
              <TrendingCompanies 
                selectedCompanyIds={selectedCompanyIds} 
                onCompaniesChange={setSelectedCompanyIds} 
              />
          </motion.aside>
        </motion.div>
      </div>
    </motion.div>
  );
}