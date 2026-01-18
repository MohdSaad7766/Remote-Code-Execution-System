import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { ChevronDown, ChevronUp, X, Search } from "lucide-react";

export default function TagList({ selectedTagIds = [], onTagsSelect }) {
  const [topicList, setTopicList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef(null);

  const INITIAL_VISIBLE_COUNT = 12;

  const transitionConfig = { type: "spring", stiffness: 300, damping: 30 };
  const tagTransition = { type: "spring", stiffness: 400, damping: 35 };

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("http://localhost:8090/problem/get-all-topics");
        const data = await response.json();
        const sorted = data.sort((a, b) => {
          if (b.problemCtn !== a.problemCtn) return b.problemCtn - a.problemCtn;
          return a.topicName.localeCompare(b.topicName);
        });
        setTopicList(sorted);
      } catch (e) {
        console.error("Failed to load topics.");
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  const handleBlur = () => {
    if (searchQuery.trim() === "") setIsSearchOpen(false);
  };

  const filteredTopics = topicList.filter((topic) =>
    topic.topicName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTagClick = (topicId) => {
    const currentIds = Array.isArray(selectedTagIds) ? selectedTagIds : [];
    const newSelection = currentIds.includes(topicId)
      ? currentIds.filter((id) => id !== topicId)
      : [...currentIds, topicId];
    onTagsSelect(newSelection);
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
        // Permanently set to the blue border and glowing shadow
        className="w-full rounded-2xl p-4 backdrop-blur-md border border-zinc-500/50 bg-zinc-600/5 shadow-[0_0_25px_-5px_rgba(59,130,246,0.2)] flex flex-col overflow-hidden transition-all duration-500"
      >
        {/* Header */}
        <div className="relative flex items-center justify-center mb-4 h-5 shrink-0">
          <motion.span layout className="text-[10px] font-bold text-blue-400 hover:text-blue-300 uppercase tracking-[0.2em]">
            Filter by Topic
          </motion.span>
          <div className="absolute right-1">
            <AnimatePresence>
              {selectedTagIds.length > 0 && (
                <motion.button 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onClick={() => onTagsSelect([])} 
                  className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400 hover:text-blue-300 uppercase tracking-[0.1em]"
                >
                  <X size={12} /> Clear ({selectedTagIds.length})
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Main Scrollable Container */}
        <motion.div 
          layout
          className={`flex flex-wrap justify-center items-center gap-2 pt-1 overflow-y-auto pr-2 custom-scrollbar transition-[max-height] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            expanded || searchQuery || isSearchOpen ? "max-h-[350px]" : "max-h-[100px]"
          }`}
        >
          {/* Unified Search Control */}
          <motion.div 
            layout
            transition={transitionConfig}
            className={`flex items-center h-8 rounded-full border shrink-0 overflow-hidden ${
              isSearchOpen || searchQuery 
                ? "bg-zinc-900 border-blue-500 shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]" 
                : "bg-zinc-900/50 border-zinc-700 hover:border-zinc-500"
            }`}
          >
            <motion.button
              layout
              onClick={() => {
                const newState = !isSearchOpen;
                setIsSearchOpen(newState);
                if (newState) setTimeout(() => inputRef.current?.focus(), 150);
              }}
              className={`p-2 transition-colors ${isSearchOpen || searchQuery ? "text-blue-400" : "text-zinc-500"}`}
            >
              <Search size={14} />
            </motion.button>

            <motion.input
              ref={inputRef}
              initial={false}
              animate={{ 
                width: isSearchOpen ? 140 : 0,
                opacity: isSearchOpen ? 1 : 0
              }}
              transition={transitionConfig}
              onBlur={handleBlur}
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-[11px] text-zinc-200 placeholder:text-zinc-600 focus:ring-0"
            />
          </motion.div>

          {/* Tags List */}
          <AnimatePresence mode="popLayout">
            {filteredTopics.map((topic, index) => {
              const isSelected = selectedTagIds.includes(topic.id);
              const isHidden = !expanded && !searchQuery && !isSearchOpen && index >= INITIAL_VISIBLE_COUNT;

              if (isHidden) return null;

              return (
                <motion.button
                  key={topic.id}
                  layout="position"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={tagTransition}
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleTagClick(topic.id)}
                  className={`group px-3 py-1.5 h-8 rounded-full text-[11px] font-medium border shrink-0 transition-colors duration-300 ${
                    isSelected 
                      ? "bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_-3px_rgba(59,130,246,0.6)]" 
                      : "bg-zinc-900/50 border-zinc-700 text-white-400  hover:border-zinc-500 hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{topic.topicName}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                      isSelected ? "bg-blue-400/30 text-blue-100" : "bg-zinc-800 text-zinc-500"
                    }`}>
                      {topic.problemCtn}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Footer Toggle */}
        {!searchQuery && !isSearchOpen && topicList.length > INITIAL_VISIBLE_COUNT && (
          <motion.div layout transition={transitionConfig} className="mt-4 pt-3 border-t border-white/5 shrink-0 flex justify-center">
            <button 
              onClick={() => setExpanded(!expanded)} 
              className="group flex items-center gap-2 text-[9px] font text-zinc-400 hover:text-blue-300 uppercase tracking-[0.2em] transition-colors"
            >
              <AnimatePresence mode="wait">
                <motion.span 
                  key={expanded ? "less" : "more"}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  {expanded ? "Show Less" : `Show More (${topicList.length - INITIAL_VISIBLE_COUNT})`}
                </motion.span>
              </AnimatePresence>
            </button>
          </motion.div>
        )}

        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
        `}</style>
      </motion.div>
    </LayoutGroup>
  );
}