import React, { useState, useEffect } from "react";
import {
  FiRotateCcw,
  FiX,
  FiTerminal,
  FiPlay,
  FiSend
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Editor from "@monaco-editor/react";
import DelayButton from "../DelayButton";
import SubmissionResultModal from "./SubmissionResultModal";

const monacoLangMap = {
  JAVA: "java",
  PYTHON: "python",
  JAVA_SCRIPT: "javascript",
  CPP: "cpp",
  C: "c",
};

const languages = [
  { id: 1, value: "JAVA", label: "Java" },
  { id: 2, value: "PYTHON", label: "Python" },
  { id: 3, value: "JAVA_SCRIPT", label: "JavaScript" },
  { id: 4, value: "CPP", label: "C++" },
  { id: 5, value: "C", label: "C" },
];

export default function CodeContainer({ code, onSubmit, setToggles }) {
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const storedLang = localStorage.getItem("preferredLanguage");
    return languages.some((lang) => lang.value === storedLang) ? storedLang : "JAVA";
  });

  const [codeValue, setCodeValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);
  const [pollingActive, setPollingActive] = useState(false);
  // const [resultStatus, setResultStatus] = useState(null);
  const [fullSubmissionData, setFullSubmissionData] = useState(null);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [compileResult, setCompileResult] = useState(null);
  const [showCompilePopup, setShowCompilePopup] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const template = code?.codeTemplates?.find((item) => item.language === selectedLanguage);
    setCodeValue(template?.visibleTemplateCode || "// Start coding here...");
  }, [selectedLanguage, code]);

  const handleLanguageChange = async (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    localStorage.setItem("preferredLanguage", newLang);
    if (token) {
      try {
        await fetch(`http://localhost:8090/app-user/user/update-language?language=${newLang}`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
      } catch (err) { console.error(err); }
    }
  };

  const handleRunCode = async () => {
    setLoading(true);
    const template = code?.codeTemplates?.find((item) => item.language === selectedLanguage);
    try {
      const response = await fetch("http://localhost:8080/central/execute/run", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) },
        body: JSON.stringify({
          problemId: code?.problemId,
          language: selectedLanguage,
          visibleCode: codeValue,
          invisibleCode: template?.invisibleTemplateCode || "",
        }),
      });
      const data = await response.json();
      setCompileResult(!data.success ? {
        verdict: data.runtimeError ? "Runtime Error" : "Compilation Error",
        message: data.errorMessage || data.runtimeError?.runtimeError,
        type: "error"
      } : {
        verdict: "Success",
        testResults: data.responses.map((res, i) => ({
          case: i + 1, matched: res.outputMatched,
        })),
        type: "success"
      });
      setShowCompilePopup(true);
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  const handleExecute = async () => {
    setLoadingSubmit(true);
    const template = code?.codeTemplates?.find((item) => item.language === selectedLanguage);

    try {
      const response = await fetch("http://localhost:8090/submission/submit-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          problemId: code.problemId,
          language: selectedLanguage,
          userCode: codeValue,
          mainCode: template?.invisibleTemplateCode || "",
        }),
      });

      if (!response.ok) throw new Error("Code submission failed");

      const data = await response.json();

      console.log("Code submitted successfully with id:", data.submissionId);

      // ✅ Start the polling lifecycle
      setSubmissionId(data.submissionId);
      setPollingActive(true);

    } catch (error) {
      console.error("Execution error:", error);
      setLoadingSubmit(false);
    }
  };

  /**
   * Polling logic: 
   * Wait 5s, then check. If PENDING, check every 2s.
   */
  useEffect(() => {
    if (!pollingActive || !submissionId) return;

    let pollInterval = null;

    const checkStatus = async () => {
      try {
        const res = await fetch(`http://localhost:8090/submission/get-by-id/${submissionId}`, {
          headers: { ...(token && { Authorization: `Bearer ${token}` }) },
        });
        const data = await res.json();



        if (data.submissionStatus !== "PENDING") {
          setPollingActive(false);
          setLoadingSubmit(false);

          // Save the whole DTO instead of just the status string
          setFullSubmissionData(data);
          setShowResultPopup(true);

          if (onSubmit) {
            onSubmit(data.submissionStatus);
          }
          return true;
        }
      } catch (err) {
        console.error("Poll Error:", err);
        setPollingActive(false);
        setLoadingSubmit(false);
        return true;
      }
      return false; // Still pending
    };

    // Step 1: Initial 5s Delay
    const initialDelay = setTimeout(() => {
      checkStatus().then((isFinished) => {
        if (!isFinished) {
          // Step 2: Start 2s Interval if not finished
          pollInterval = setInterval(async () => {
            const finished = await checkStatus();
            if (finished) clearInterval(pollInterval);
          }, 2000);
        }
      });
    }, 5000);

    return () => {
      clearTimeout(initialDelay);
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [pollingActive, submissionId, token, onSubmit]);

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/5">
      {/* TOP TOOLBAR */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#0d0d0d] border-b border-white/5">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Language</span>
            <select
              className="bg-zinc-900 text-zinc-300 text-xs font-bold rounded-lg border border-white/10 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all cursor-pointer"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              {languages.map((lang) => <option key={lang.id} value={lang.value}>{lang.label}</option>)}
            </select>
          </div>

          <button
            onClick={() => {
              const t = code?.codeTemplates?.find(x => x.language === selectedLanguage);
              setCodeValue(t?.visibleTemplateCode || "");
            }}
            className="text-zinc-600 hover:text-white transition-colors p-1"
            title="Reset to Template"
          >
            <FiRotateCcw size={14} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <DelayButton
            onDelayedClick={handleRunCode}
            bgColor="bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
            label={<span className="flex items-center gap-2"><FiPlay size={12} /> Run</span>}
            loading={loading}
            className="text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-lg border border-white/10 transition-all active:scale-95"
          />
          <DelayButton
            onDelayedClick={handleExecute}
            bgColor="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
            label={<span className="flex items-center gap-2"><FiSend size={12} /> {pollingActive ? "Judging..." : "Submit"}</span>}
            loading={loadingSubmit}
            className="text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-lg transition-all active:scale-95"
          />
        </div>
      </div>

      {/* EDITOR AREA */}
      <div className="flex-1 relative bg-[#0a0a0a]">
        <Editor
          height="100%"
          language={monacoLangMap[selectedLanguage] || "java"}
          value={codeValue}
          onChange={(val) => setCodeValue(val ?? "")}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: "'Fira Code', monospace",
            minimap: { enabled: false },
            scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
            automaticLayout: true,
            padding: { top: 20 },
            lineNumbersMinChars: 4,
            renderLineHighlight: "all",
          }}
          beforeMount={(monaco) => {
            monaco.editor.defineTheme('syncTheme', {
              base: 'vs-dark',
              inherit: true,
              rules: [],
              colors: {
                'editor.background': '#0a0a0a',
                'editor.lineHighlightBackground': '#ffffff05',
                'editorLineNumber.foreground': '#444444',
                'editorLineNumber.activeForeground': '#888888',
              }
            });
          }}
          onMount={(editor, monaco) => monaco.editor.setTheme('syncTheme')}
        />
      </div>

      {/* RESULT MODALS */}
      {/* RESULT MODALS */}
      <AnimatePresence>
        {/* 1. MAIN SUBMISSION MODAL (Now using Portal) */}
        {showResultPopup && fullSubmissionData && (
          <SubmissionResultModal 
            key="submission-modal"
            result={fullSubmissionData} 
            onClose={() => setShowResultPopup(false)} 
          />
        )}

        {/* 2. STANDARD RUN/COMPILE POPUP */}
        {showCompilePopup && !showResultPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 20 }} 
              className="bg-[#0d0d0d] border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                  <FiTerminal className="text-blue-500" /> 
                  {compileResult?.verdict}
                </h3>
                <button onClick={() => setShowCompilePopup(false)} className="text-zinc-500 hover:text-white transition-colors">
                  <FiX size={20} />
                </button>
              </div>

              <div className="max-h-[50vh] overflow-auto">
                {compileResult?.type === "success" ? (
                  <div className="grid grid-cols-1 gap-3">
                    {compileResult.testResults.map((t, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5">
                        <span className="text-xs font-bold text-zinc-400">Test Case {t.case}</span>
                        <span className={t.matched ? "text-emerald-500 text-[10px] font-black uppercase" : "text-red-500 text-[10px] font-black uppercase"}>
                          {t.matched ? "Passed" : "Failed"}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-red-400 bg-red-500/5 p-5 rounded-xl border border-red-500/20 font-mono text-[11px] whitespace-pre-wrap leading-relaxed">
                    {compileResult.message}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}