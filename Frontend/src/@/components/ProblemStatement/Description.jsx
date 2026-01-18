import React, { useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Building2, Tag, Info, ArrowRight } from "lucide-react";

const difficultyStyles = {
  EASY: "bg-green-500/10 text-green-500 border-green-500/20",
  MEDIUM: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  HARD: "bg-red-500/10 text-red-500 border-red-500/20",
};

/**
 * Reusable Pill component matching your TrendingCompanies style
 */
const TagPill = ({ children, icon: Icon, colorClass = "hover:border-zinc-500" }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -1 }}
    className={`group flex items-center gap-2 px-3.5 py-1.5 h-8 rounded-full text-[11px] font-medium border shrink-0 transition-all duration-300 bg-zinc-900/50 border-zinc-700 text-zinc-300 ${colorClass}`}
  >
    {Icon && <Icon size={12} className="text-zinc-500 group-hover:text-inherit" />}
    <span>{children}</span>
  </motion.div>
);

function ConstraintsSection({ list }) {
  if (!list || list.length === 0) return null;
  return (
    <div className="space-y-4">
      <h2 className="text-[11px] font-bold text-gray-600 uppercase tracking-[0.25em]">
        Constraints
      </h2>
      <ul className="space-y-3">
        {list.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 group">
            <span className="mt-1.5 h-1 w-1 rounded-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors" />
            <code className="text-[13px] font-mono text-gray-400 bg-[#111111] px-1.5 py-0.5 rounded border border-gray-800/50">
              {item}
            </code>
          </li>
        ))}
      </ul>
    </div>
  );
}


function getStatusIcon(status) {
  if (!status || status === "UNATTEMPTED") return null;
  
  const base = "flex items-center gap-1.5 px-3 py-1 border rounded text-[10px] font-bold uppercase tracking-widest";
  
  // Normalize to handle any potential casing issues from API
  const s = status.toUpperCase();

  if (s === "SOLVED") {
    return (
      <div className={`${base} bg-emerald-500/10 border-emerald-500/20 text-emerald-500`}>
        <CheckCircle className="w-3 h-3" /> SOLVED
      </div>
    );
  }
  
  if (s === "ATTEMPTED") {
    return (
      <div className={`${base} bg-yellow-500/10 border-yellow-500/20 text-yellow-500`}>
        <Clock className="w-3 h-3" /> ATTEMPTED
      </div>
    );
  }
  
  return null;
}

export default function Description({ data, submissionStatus }) {
  const status = submissionStatus || data?.userProblemStatus;
  const topicsRef = useRef(null);
  const companiesRef = useRef(null);

  const scrollToRef = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-10 pb-8 text-gray-300 px-4 md:px-0"
    >
      {/* Header Section */}
      <motion.div variants={fadeInUp} custom={0} className="space-y-6 pt-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            {data?.problemTitle}
          </h1>
          {getStatusIcon(status)}
        </div>

        <div className="flex items-center gap-4 border-b border-blue-500/20 pb-6">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold border inline-block min-w-[80px] text-center uppercase tracking-wider ${difficultyStyles[data?.problemDifficulty?.toUpperCase()] || "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"}`}>
            {data?.problemDifficulty}
          </span>
          <div className="h-4 w-[1px] bg-blue-500/20" />
          <button onClick={() => scrollToRef(topicsRef)} className="flex items-center gap-2 text-[11px] font-bold text-gray-500 hover:text-blue-400 transition-all uppercase tracking-widest">
            <Tag size={12} /> Topics
          </button>
          <button onClick={() => scrollToRef(companiesRef)} className="flex items-center gap-2 text-[11px] font-bold text-gray-500 hover:text-purple-400 transition-all uppercase tracking-widest">
            <Building2 size={12} /> Companies
          </button>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div variants={fadeInUp} custom={1} className="prose prose-invert max-w-none">
        <div className="text-[15px] leading-relaxed text-gray-400 whitespace-pre-line font-light">
          {data?.problemDescription}
        </div>
      </motion.div>

      {/* Examples */}
      <motion.div variants={fadeInUp} custom={2} className="space-y-8">
        {data?.exampleList?.map((ex, idx) => (
          <div key={idx} className="bg-[#0D0D0D] border border-gray-800/50 rounded-lg overflow-hidden transition-all hover:border-gray-700">
            <div className="px-5 py-3 bg-[#111111] border-b border-gray-800/50">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Example {idx + 1}</span>
            </div>
            <div className="p-6 space-y-5 font-mono text-[13px]">
              <div className="space-y-2">
                <span className="text-blue-500/90 text-[10px] uppercase font-bold tracking-widest">Input</span>
                <div className="bg-black/40 p-3 rounded border border-gray-800/30 text-gray-300">{ex.exampleInput}</div>
              </div>
              <div className="space-y-2">
                <span className="text-emerald-500/90 text-[10px] uppercase font-bold tracking-widest">Output</span>
                <div className="bg-black/40 p-3 rounded border border-gray-800/30 text-emerald-50/80">{ex.exampleOutput}</div>
              </div>
              {ex.exampleExplanation && (
                <div className="space-y-2">
                  <span className="text-gray-600 text-[10px] uppercase font-bold tracking-widest">Explanation</span>
                  <p className="text-gray-400 font-sans leading-relaxed text-[14px] italic pl-1 border-l border-gray-800">{ex.exampleExplanation}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Constraints & Meta */}
      <div className="space-y-12">
        <motion.div variants={fadeInUp} custom={3}>
          <ConstraintsSection list={data?.problemConstraints} />
        </motion.div>

        {data?.followUp && (
          <motion.div variants={fadeInUp} custom={4} className="space-y-4">
            <h2 className="text-[11px] font-bold text-gray-600 uppercase tracking-[0.25em]">Follow-up</h2>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
              <ArrowRight size={16} className="text-emerald-500 mt-0.5 shrink-0" />
              <p className="text-[14px] text-gray-300 leading-relaxed tracking-wide">{data.followUp}</p>
            </div>
          </motion.div>
        )}

        {data?.note && (
          <motion.div variants={fadeInUp} custom={5} className="p-5 rounded-lg bg-blue-500/5 border border-blue-500/10">
            <div className="flex items-center gap-2 mb-3 text-blue-400">
              <Info size={16} />
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em]">Note</h4>
            </div>
            <p className="text-[14px] text-gray-400 leading-relaxed italic">{data.note}</p>
          </motion.div>
        )}
      </div>

      {/* Pill Section for Topics and Companies */}
      <div className="pt-10 border-t border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div ref={topicsRef} variants={fadeInUp} custom={6}>
          <h3 className="text-[11px] font-bold text-gray-600 uppercase tracking-[0.25em] mb-4">Topic Tags</h3>
          <div className="flex flex-wrap gap-2">
            {data?.topicList?.map((topic, i) => (
              <TagPill key={i} icon={Tag} colorClass="hover:border-blue-500/50 hover:text-blue-400">
                {topic}
              </TagPill>
            ))}
          </div>
        </motion.div>

        <motion.div ref={companiesRef} variants={fadeInUp} custom={7}>
          <h3 className="text-[11px] font-bold text-gray-600 uppercase tracking-[0.25em] mb-4">Company Tags</h3>
          <div className="flex flex-wrap gap-2">
            {data?.companyList?.map((company, i) => (
              <TagPill key={i} icon={Building2} colorClass="hover:border-purple-500/50 hover:text-purple-400">
                {company}
              </TagPill>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}