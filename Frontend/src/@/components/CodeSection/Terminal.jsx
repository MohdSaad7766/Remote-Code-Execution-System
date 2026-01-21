import React from "react";
import { motion } from "framer-motion";

export default function Terminal({ 
  showConsole, 
  activeTab, 
  setActiveTab, 
  userInput, 
  setUserInput, 
  compileResult, 
  loading 
}) {
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: showConsole ? 300 : 0 }} // Fixed height is safer for layout math
      className="shrink-0 flex flex-col bg-white border-t border-zinc-200 overflow-hidden w-full"
    >
      {/* Tab Header */}
      <div className="flex items-center px-4 border-b border-zinc-200 bg-white shrink-0">
        <button
          onClick={() => setActiveTab("input")}
          className={`px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
            activeTab === "input" ? "border-blue-600 text-blue-600" : "border-transparent text-zinc-400"
          }`}
        >
          Input
        </button>
        <button
          onClick={() => setActiveTab("output")}
          className={`px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
            activeTab === "output" ? "border-blue-600 text-blue-600" : "border-transparent text-zinc-400"
          }`}
        >
          Output
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-zinc-50 font-mono text-sm">
        {activeTab === "input" ? (
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Please enter your test input..."
            className="w-full h-full bg-transparent outline-none text-zinc-700 resize-none placeholder:text-zinc-300"
          />
        ) : (
          <div className="text-zinc-800">
            {loading ? (
              <div className="flex items-center gap-2 text-blue-600 font-bold">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" />
                Running code...
              </div>
            ) : compileResult ? (
              <div className="space-y-4">
                {compileResult.type === "error" ? (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                    <p className="text-red-600 font-bold mb-1 uppercase text-[10px]">{compileResult.verdict}</p>
                    <pre className="text-red-500 text-[11px] whitespace-pre-wrap">{compileResult.message}</pre>
                  </div>
                ) : (
                  <div className="grid gap-2">
                    {compileResult.testResults?.map((res, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-white border border-zinc-200 rounded-lg">
                        <span className="text-zinc-500 font-bold text-xs">Test Case {res.case}</span>
                        <span className={`font-black uppercase text-[10px] ${res.matched ? 'text-emerald-600' : 'text-red-600'}`}>
                          {res.matched ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <span className="text-zinc-400 italic">Run your code to see results.</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}