import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Stack from "../codelab/Stack";
import Footer from "../Footer";
import { Menu, X, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function DSA() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#050505] text-zinc-300 selection:bg-blue-500/30">
      {/* Sidebar - Integrated with the same dark theme */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300 lg:ml-[280px]">
        
        {/* Top Header Bar - Matches the Login/Reg style */}
        <header className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-md border-b border-zinc-900 px-6 py-4 flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-2">
            <LayoutGrid size={20} className="text-blue-500" />
            <h2 className="text-sm font-black text-white uppercase italic tracking-tighter">
              CODE<span className="text-blue-500">LAB</span>
            </h2>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white active:scale-95 transition-all"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* Content Container */}
        <div className="flex-1 p-6 md:p-10 lg:p-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto space-y-8"
          >
            {/* Header section for the current topic */}
            <div className="relative p-8 rounded-[24px] bg-[#0a0a0a] border border-zinc-900 overflow-hidden group">
              {/* Subtle blue glow in corner */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-[80px] group-hover:bg-blue-600/20 transition-all duration-700" />
              
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em]">Data Structures</span>
                <h1 className="text-3xl font-black text-white mt-2 tracking-tighter italic uppercase">
                  Stack <span className="text-zinc-600">Implementation</span>
                </h1>
                <p className="text-zinc-500 text-sm mt-3 max-w-2xl leading-relaxed">
                  Master the Last-In-First-Out (LIFO) principle through interactive visualization and optimized code implementation.
                </p>
              </div>
            </div>

            {/* The Actual Lab/Stack Component */}
            <div className="bg-[#0a0a0a] border border-zinc-900 rounded-[32px] p-1 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
               <Stack />
            </div>
          </motion.div>
        </div>

        <Footer />
      </main>

      {/* Mobile Overlay for Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default DSA;