import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  ChevronDownIcon,
  CircleStackIcon,
  CommandLineIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import SidebarItem from "./SidebarItem";

// Adding default function to setIsOpen prevents the "is not a function" error
const Sidebar = ({ isOpen = false, setIsOpen = () => {} }) => {
  const [activeDropdown, setActiveDropdown] = useState("ds");
  const location = useLocation();

  useEffect(() => {
    // Close sidebar automatically when clicking a link on mobile
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }, [location.pathname]); // Listen specifically to path changes

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : (window.innerWidth < 1024 ? -300 : 0) }}
        className="fixed top-0 left-0 bottom-0 w-[300px] bg-[#111111] border-r border-white/5 z-[50] flex flex-col transition-all duration-300 shadow-2xl"
      >
        <div className="flex-1 overflow-y-auto p-4 space-y-2 pt-24 no-scrollbar">
          
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
          <div className="py-2 pl-4 space-y-1">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default Sidebar;