import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import ProblemSidebar from "./ProblemSidebar";
import { FiRotateCcw, FiSettings } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Zap,
  ServerCrash,
} from "lucide-react";

import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

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

const FINAL_STATUSES = [
  "ACCEPTED",
  "WRONG_ANSWER",
  "RUNTIME_ERROR",
  "INTERNAL_ERROR",
  "COMPILE_ERROR",
];

const themes = ["vs-dark", "vs-light", "hc-black"];
const fonts = ["Fira Code", "Courier New", "Consolas", "Monaco", "monospace"];
const fontSizes = [14, 16, 18, 20, 24];

const defaultSettings = {
  theme: "vs-dark",
  fontSize: 18,
  fontFamily: "Fira Code",
  wordSuggestions: true,
};

const updatePreferredLanguageOnServer = async (language) => {
  const token = localStorage.getItem("token");
  if (!token) return;
  try {
    await fetch(
      `http://localhost:8080/central/user/update-preferred-language?langauge=${language}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Error updating preferred language:", error);
  }
};

const SolveProblemPage = () => {
  const { contestId, index } = useParams();
  const [problemList, setProblemList] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const stored = localStorage.getItem("preferredLanguage");
    return languages.some((l) => l.value === stored) ? stored : "JAVA";
  });

  const [editorSettings, setEditorSettings] = useState(defaultSettings);

  const [showSettings, setShowSettings] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [attemptStatus, setAttemptStatus] = useState(null);

  const [showResultPopup, setShowResultPopup] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("contestData");
    if (data) {
      const parsed = JSON.parse(data);
      const problems = parsed.problemList.map((entry) => entry.problem);
      setProblemList(problems);
      setSelectedProblem(problems[parseInt(index)]);
    }
  }, [index]);

  useEffect(() => {
    if (!selectedProblem || !selectedLanguage) return;
    const template = selectedProblem.codeTemplateList?.find(
      (item) => item.language === selectedLanguage
    );
    setCode(template?.visibleTemplateCode || "// No code template found.");
  }, [selectedProblem, selectedLanguage]);

  useEffect(() => {
    if (!selectedProblem) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const problemId = selectedProblem.problemId;
    const attemptKey = `${contestId}_${token}_${problemId}`;

    const status = localStorage.getItem(attemptKey);
    if (status) setAttemptStatus(status);
  }, [selectedProblem, contestId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent reload with F5 or Ctrl+R
      if (e.key === "F5" || (e.ctrlKey && e.key === "r")) {
        e.preventDefault();
      }

      // Prevent Ctrl + 1 through Ctrl + 9 (tab switching)
      if (e.ctrlKey && /^[1-9]$/.test(e.key)) {
        e.preventDefault();
      }

      // Prevent copy, cut, paste (Ctrl + C/V/X)
      if (e.ctrlKey && ["c", "v", "x"].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault(); // Disable right-click
    };

    // const handleVisibilityChange = () => {
    //   if (document.visibilityState === "hidden") {
    //     handleSubmitContest(); // Auto-submit on tab switch or window minimize
    //   }
    // };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("contextmenu", handleContextMenu);
    // document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleContextMenu);
      // document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!submissionId) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token not found. Please login again.");
      return;
    }

    // const token = localStorage.getItem("token");

    const template = selectedProblem.codeTemplateList?.find(
      (item) => item.language === selectedLanguage
    );

    const problemId = selectedProblem.problemId;
    const attemptKey = `${contestId}_${token}_${problemId}`;

    let attempts = 0;
    const maxAttempts = 15;

    const intervalId = setInterval(async () => {
      attempts += 1;

      try {
        const res = await fetch(
          `http://localhost:8080/central/contest/get-partial-submission?submissionId=${submissionId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        const status = data.submissionStatus;

        setSubmissionStatus(status);

        if (FINAL_STATUSES.includes(status)) {
          // ✅ Store status in localStorage
          if (localStorage.getItem(attemptKey) !== "Solved") {
            localStorage.setItem(
              attemptKey,
              status === "ACCEPTED" ? "Solved" : "Attempted"
            );
          }

          // console.log(localStorage.getItem(attemptKey));

          clearInterval(intervalId);
          setLoading(false);
          setSubmissionResult(status);
        } else if (attempts >= maxAttempts) {
          clearInterval(intervalId);
          setLoading(false);
          setSubmissionResult("Polling timed out. Please check back later.");
          localStorage.setItem(attemptKey, "Attempted"); // fallback on timeout
        }
      } catch (error) {
        console.error("Error while polling submission", error);
        clearInterval(intervalId);
        setLoading(false);
        setSubmissionResult("Error checking submission status.");
        localStorage.setItem(attemptKey, "Attempted"); // fallback on error
      }
    }, 2000); // every 2 seconds

    return () => clearInterval(intervalId);
  }, [submissionId]);

  const handleLanguageChange = async (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    localStorage.setItem("preferredLanguage", newLang);
    await updatePreferredLanguageOnServer(newLang);
  };

  const handleResetCode = () => {
    const template = selectedProblem.codeTemplateList?.find(
      (item) => item.language === selectedLanguage
    );
    setCode(template?.visibleTemplateCode || "// No code template found.");
  };

  const resetSettings = () => setEditorSettings(defaultSettings);

  const handleSubmit = async () => {
    if (!selectedProblem || !selectedLanguage || !contestId) {
      alert("Missing required data.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token not found. Please login again.");
      return;
    }

    const template = selectedProblem.codeTemplateList?.find(
      (item) => item.language === selectedLanguage
    );

    const submissionPayload = {
      problemId: selectedProblem.problemId,
      language: selectedLanguage,
      visibleCode: code,
      invisibleCode: template?.invisibleTemplateCode || "",
    };

    setLoading(true);
    // setShowModal(true);

    try {
      const response = await fetch(
        `http://localhost:8080/central/contest/partial-contest-submission?contestId=${contestId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(submissionPayload),
        }
      );

      const data = await response.json();
      const submissionId = data.submissionId;

      setSubmissionId(submissionId); // triggers useEffect
    } catch (error) {
      console.error("Submission failed", error);
      setLoading(false);
    }
  };

  const loadAttemptData = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const problemId = selectedProblem.problemId;
    const attemptKey = `${contestId}_${token}_${problemId}`;
    const stored = localStorage.getItem(attemptKey);
    if (stored) {
      setAttemptStatus(stored);
    }
  };

  // Call this when submission result is ready
  const handleCloseResultPopup = () => {
    setShowResultPopup(false);
    loadAttemptData(); // Reload attempt data when popup closes
  };

  return (
    <div className="flex flex-1 overflow-hidden relative">
      <ProblemSidebar
        problems={problemList}
        selectedId={selectedProblem?.problemId}
        contestId={contestId}
      />

      <div className="flex-1 flex overflow-hidden">
        
        {/* Problem Description Panel */}
        <motion.div
          className="w-1/2 overflow-auto bg-zinc-900 text-gray-100 p-6 border-r border-zinc-800 space-y-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {selectedProblem ? (
            <>
              {/* Header */}
              <motion.div
                className="flex flex-col gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-3xl font-bold text-white">
                  {selectedProblem.problemTitle}
                </h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className={`px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full ${
                      selectedProblem.problemDifficulty === "EASY"
                        ? "bg-green-800 text-white"
                        : selectedProblem.problemDifficulty === "MEDIUM"
                        ? "bg-yellow-700 text-white"
                        : "bg-red-800 text-white"
                    }`}
                  >
                    {selectedProblem.problemDifficulty}
                  </span>

                  {attemptStatus === "Solved" && (
                    <span className="flex items-center text-green-400 font-semibold text-sm gap-1">
                      <CheckCircleIcon className="w-4 h-4" />
                      Solved
                    </span>
                  )}

                  {attemptStatus === "Attempted" && (
                    <span className="flex items-center text-red-400 font-semibold text-sm gap-1">
                      <ClockIcon className="w-4 h-4" />
                      Attempted
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Divider */}
              <hr className="border-zinc-800" />

              {/* Description */}
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {selectedProblem.problemDescription}
                </p>
              </motion.section>

              {/* Examples */}
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-xl font-semibold mb-2">Examples</h2>
                <div className="space-y-4">
                  {selectedProblem.exampleList.map((ex, i) => (
                    <motion.div
                      key={i}
                      className="bg-zinc-800 rounded-lg border border-zinc-700 p-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 + i * 0.1 }}
                    >
                      <p className="mb-1">
                        <strong className="text-gray-200">Input:</strong>{" "}
                        <code className="font-mono text-gray-400">
                          {ex.exampleInput}
                        </code>
                      </p>
                      <p className="mb-1">
                        <strong className="text-gray-200">Output:</strong>{" "}
                        <code className="font-mono text-gray-400">
                          {ex.exampleOutput}
                        </code>
                      </p>
                      {ex.exampleExplanation && (
                        <p className="text-sm text-gray-400">
                          <strong className="text-gray-200">
                            Explanation:
                          </strong>{" "}
                          {ex.exampleExplanation}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Constraints */}
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-xl font-semibold mb-2">Constraints</h2>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-300">
                  {selectedProblem.problemConstraints.split(",").map((c, i) => (
                    <li key={i}>{c.trim()}</li>
                  ))}
                </ul>
              </motion.section>

              {/* Note */}
              {selectedProblem.note && (
                <motion.section
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <h2 className="text-xl font-semibold mb-2">Note</h2>
                  <p className="text-sm text-gray-400">
                    {selectedProblem.note}
                  </p>
                </motion.section>
              )}
            </>
          ) : (
            <p className="text-gray-400">Loading...</p>
          )}
        </motion.div>

        {/* Code Editor Panel */}
        <motion.div
          className="w-1/2 flex flex-col bg-zinc-950 p-0"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Sticky Top Bar */}
          <motion.div
            className="sticky top-0 z-10 bg-zinc-950 p-4 border-b border-zinc-800"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-2 text-white">
              <div>
                <label className="text-sm font-semibold">
                  Language:
                  <select
                    className="ml-2 bg-zinc-800 text-white p-1 rounded"
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                  >
                    {languages.map((lang) => (
                      <option key={lang.id} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleResetCode}
                  className="p-2 hover:bg-zinc-700 rounded text-white"
                >
                  <FiRotateCcw size={18} />
                </button>
                {/* <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 hover:bg-zinc-700 rounded text-white"
                >
                  <FiSettings size={18} />
                </button> */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  {loading && <FaSpinner className="animate-spin" />}
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Editor Area */}
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            {showSettings && (
              <motion.div
                className="w-full bg-zinc-800 border border-zinc-700 shadow-md rounded-md px-4 py-3 mb-3 text-sm text-white space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {/* settings content here */}
              </motion.div>
            )}

            <motion.div
              className="h-[75vh] border border-zinc-700 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            >
              <Editor
                height="100%"
                language={monacoLangMap[selectedLanguage]}
                theme={editorSettings.theme}
                value={code}
                onChange={setCode}
                options={{
                  fontSize: editorSettings.fontSize,
                  fontFamily: editorSettings.fontFamily,
                  minimap: { enabled: false },
                  wordWrap: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  formatOnType: true,
                  suggestOnTriggerCharacters: editorSettings.wordSuggestions,
                  quickSuggestions: editorSettings.wordSuggestions,
                  acceptSuggestionOnEnter: "on",
                  lineNumbers: "on",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {submissionResult && (
        <ResultPopup
          status={submissionResult}
          onClose={() => {
            setSubmissionResult(null); // Close popup
            loadAttemptData(); // Reload attempt status
            // window.location.reload();
          }}
        />
      )}
    </div>
  );
};

const ResultPopup = ({ status, onClose }) => {
  const statusMap = {
    ACCEPTED: {
      color: "bg-green-600",
      icon: <CheckCircle className="w-12 h-12 text-white" />,
      text: "Accepted",
    },
    WRONG_ANSWER: {
      color: "bg-yellow-500",
      icon: <AlertTriangle className="w-12 h-12 text-white" />,
      text: "Wrong Answer",
    },
    COMPILE_ERROR: {
      color: "bg-red-600",
      icon: <XCircle className="w-12 h-12 text-white" />,
      text: "Compile Error",
    },
    RUNTIME_ERROR: {
      color: "bg-orange-500",
      icon: <Zap className="w-12 h-12 text-white" />,
      text: "Runtime Error",
    },
    INTERNAL_SERVER_ERROR: {
      color: "bg-zinc-600",
      icon: <ServerCrash className="w-12 h-12 text-white" />,
      text: "Internal Server Error",
    },
  };

  const style = statusMap[status];
  if (!style) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className={`rounded-2xl border border-white/10 shadow-2xl px-8 py-10 w-[420px] max-w-[90%] bg-[#18181b] text-white transition-all`}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Glowing Icon */}
            <div className={`rounded-full p-4 ${style.color} shadow-lg`}>
              {style.icon}
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-center tracking-wide">
              {style.text}
            </h2>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="mt-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-medium px-6 py-2 rounded-lg backdrop-blur transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SolveProblemPage;
