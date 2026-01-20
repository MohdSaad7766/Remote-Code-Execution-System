import React, { useState } from "react";
import ProblemTable from "./ProblemTable";
import TrendingCompanies from "./TrendingCompanies";
import TagList from "./TagsList";
import TotalProblemSolved from "./TotalProblemSolved";
import { RotateCcw, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

const categoryOptions = [
  { id: 1, name: "EASY" },
  { id: 2, name: "MEDIUM" },
  { id: 3, name: "HARD" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProblemList() {
  const [selectedCategory, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompanyIds, setSelectedCompanyIds] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState([]);

  const isLoggedIn = !!localStorage.getItem("token");

  const resetFilters = () => {
    setCategory("");
    setSelectedCompanyIds([]);
    setSelectedTagIds([]);
    setSearchQuery("");
  };

  const controlStyle = "bg-zinc-600/5 border-zinc-500/50 shadow-[0_0_15px_-5px_rgba(59,130,246,0.2)]";

  return (
    <motion.div
      initial="hidden" animate="visible" variants={containerVariants}
      className="min-h-screen text-white relative selection:bg-blue-500/30 font-sans"
      style={{ background: "radial-gradient(circle at center, #0f0f0f 0%, #000000 100%)" }}
    >
      {/* --- Header Section --- */}
      <div className="w-full relative overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-6 relative z-10">
          <motion.div variants={itemVariants} className="pt-10 pb-6">
            <TagList selectedTagIds={selectedTagIds} onTagsSelect={setSelectedTagIds} />
          </motion.div>

          <motion.div variants={itemVariants} className="pb-10">
            <div className="flex flex-col lg:flex-row items-center gap-6 w-full">

              {/* Left: Search & Filter Group */}
              <div className="flex flex-col md:flex-row items-center gap-3 flex-1 w-full">
                <div className="relative flex-grow h-11 group w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text" value={searchQuery}
                    placeholder="Search Problem by title..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full h-full ${controlStyle} text-zinc-200 text-sm pl-11 pr-4 rounded-xl border outline-none transition-all placeholder:text-zinc-600 focus:border-blue-400 focus:bg-blue-600/10 focus:shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)]`}
                  />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto h-11">
                  <div className="relative h-full w-44 group">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setCategory(e.target.value)}
                      className={`w-full h-full ${controlStyle} border rounded-xl text-xs pl-9 pr-8 appearance-none outline-none cursor-pointer text-zinc-400 focus:border-blue-400`}
                    >
                      <option value="" className="bg-zinc-950">Difficulties</option>
                      {categoryOptions.map(c => <option key={c.id} value={c.name} className="bg-zinc-950">{c.name}</option>)}
                    </select>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} onClick={resetFilters}
                    className={`h-full aspect-square ${controlStyle} border rounded-xl flex justify-center items-center group`}
                  >
                    <RotateCcw className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-all" />
                  </motion.button>
                </div>
              </div>

              <TotalProblemSolved />
              
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- Table Section --- */}
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 pb-20 items-start">
          <motion.div variants={itemVariants} className="min-w-0">
            <ProblemTable
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              selectedTopicIds={selectedTagIds}
              selectedCompanyIds={selectedCompanyIds}
            />
          </motion.div>

          <motion.aside variants={itemVariants} className="hidden lg:block sticky top-6">
            <TrendingCompanies
              selectedCompanyIds={selectedCompanyIds}
              onCompaniesChange={setSelectedCompanyIds}
            />
          </motion.aside>
        </div>
      </div>
    </motion.div>
  );
}