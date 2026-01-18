import React from "react";
import { motion } from "framer-motion";

const complexityStyles = {
  BRUTE_FORCE: {
    text: "text-rose-500",
    accent: "bg-rose-500"
  },
  BETTER: {
    text: "text-amber-500",
    accent: "bg-amber-500"
  },
  OPTIMAL: {
    text: "text-emerald-500",
    accent: "bg-emerald-500"
  },
};

export default function Solution({ data }) {
  const approaches = data?.solution?.approachList || [];

  // Count occurrences of each type to decide if numbering is needed
  const typeCounts = approaches.reduce((acc, curr) => {
    const type = curr.approachType?.toUpperCase();
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  // Track the current index for each type as we map
  const typeTracker = {};

  const getFormattedType = (type) => {
    const upperType = type?.toUpperCase();
    let label = "";
    
    switch (upperType) {
      case "BRUTE_FORCE": label = "Brute Force"; break;
      case "BETTER": label = "Better Approach"; break;
      case "OPTIMAL": label = "Optimal Solution"; break;
      default: label = "Approach";
    }

    // Only add numbering if there are multiple approaches of the same category
    if (typeCounts[upperType] > 1) {
      typeTracker[upperType] = (typeTracker[upperType] || 0) + 1;
      return `${label} ${typeTracker[upperType]}`;
    }
    
    return label;
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
      className="max-w-4xl mx-auto space-y-12 py-8 text-gray-300 px-4 md:px-0"
      initial="hidden"
      animate="visible"
    >
      {approaches.length === 0 ? (
        <motion.p variants={fadeInUp} className="text-gray-500 italic text-sm font-light">
          No solution approaches available.
        </motion.p>
      ) : (
        approaches.map((item, index) => {
          const style = complexityStyles[item?.approachType?.toUpperCase()] || complexityStyles.BETTER;
          const finalTitle = getFormattedType(item?.approachType);
          
          return (
            <motion.div
              key={index}
              variants={fadeInUp}
              custom={index}
              className="space-y-4"
            >
              {/* Conditional Label Header */}
              <div className="flex items-center gap-3 ml-1">
                <div className={`h-1 w-1 rounded-full ${style.accent}`} />
                <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${style.text}`}>
                  {finalTitle}
                </span>
              </div>

              {/* Description Card */}
              <div className="bg-[#0D0D0D] border border-gray-800/50 rounded-lg transition-all hover:border-gray-700 p-7">
                <p className="text-[15px] leading-relaxed text-gray-400 whitespace-pre-line font-light tracking-wide">
                  {item?.approachDescription || "No description provided."}
                </p>
              </div>
            </motion.div>
          );
        })
      )}
    </motion.div>
  );
}