import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CodeBracketIcon,
  ChevronDownIcon,
  CircleStackIcon,
  CommandLineIcon,
  MagnifyingGlassIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [activeDropdown, setActiveDropdown] = useState("ds");
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 1024) setIsOpen(false);
  }, [location, setIsOpen]);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : (window.innerWidth < 1024 ? -300 : 0) }}
        className={`fixed top-0 left-0 bottom-0 w-[300px] bg-[#111111] border-r border-white/5 z-[50] flex flex-col transition-all duration-300 shadow-2xl`}
      >
        {/* Header */}
        {/* <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20">
            <CodeBracketIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-black text-lg tracking-tight uppercase italic">
              CODE<span className="text-blue-500">LAB</span>
            </h1>
            <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">DSA Masterclass</p>
          </div>
        </div> */}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 pt-25 no-scrollbar">
          
          {/* Section: Data Structures */}
          <DropdownGroup
            title="Data Structures"
            icon={<CircleStackIcon className="w-5 h-5" />}
            isOpen={activeDropdown === "ds"}
            onClick={() => toggleDropdown("ds")}
          >
            <SidebarItem text="Arrays" path="/dsa/array" />
            <SidebarItem text="String" path="/dsa/string" />
            <SidebarItem text="Stacks" path="/dsa/stack" />
            <SidebarItem text="Queues" path="/dsa/queue" />
            <SidebarItem text="Trees" path="/dsa/tree" />
            <SidebarItem text="Graphs" path="/dsa/graph" />
            <SidebarItem text="Linked Lists" path="/dsa/linked-lists" />
          </DropdownGroup>

          {/* Section: Algorithms */}
          <DropdownGroup
            title="Algorithms"
            icon={<CommandLineIcon className="w-5 h-5" />}
            isOpen={activeDropdown === "algo"}
            onClick={() => toggleDropdown("algo")}
          >
            <SidebarItem text="Bubble Sort" path="/dsa/sorting/bubble-sort" />
            <SidebarItem text="Quick Sort" path="/dsa/sorting/quick-sort" />
            <SidebarItem text="Binary Search" path="/dsa/searching/binary-search" />
            <SidebarItem text="Prim's Algo" path="/dsa/algorithm/prims" />
          </DropdownGroup>

          {/* Section: Advanced */}
          <DropdownGroup
            title="Techniques"
            icon={<SparklesIcon className="w-5 h-5" />}
            isOpen={activeDropdown === "tech"}
            onClick={() => toggleDropdown("tech")}
          >
            <SidebarItem text="Recursion" path="/dsa/recursion" />
            <SidebarItem text="Backtracking" path="/dsa/backtracking" />
          </DropdownGroup>
        </div>

        {/* Footer Info */}
        {/* <div className="p-4 border-t border-white/5">
          <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-xs text-gray-400 font-medium">System Ready</span>
          </div>
        </div> */}
      </motion.aside>
    </>
  );
};

const DropdownGroup = ({ title, icon, children, isOpen, onClick }) => (
  <div className="mb-2">
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
        isOpen ? "bg-white/5 text-white" : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-bold tracking-wide">{title}</span>
      </div>
      <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden ml-4 border-l border-white/10"
        >
          <div className="py-2 pl-4 space-y-1">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default Sidebar;