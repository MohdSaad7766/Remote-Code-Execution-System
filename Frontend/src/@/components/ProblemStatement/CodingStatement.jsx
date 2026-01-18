import React, { useEffect, useRef, useState } from "react";
import CodeContainer from "../CodeSection/CodeContainer";
import LinkStat from "../LinkStatUrl/LinkStat";
import Submission from "./submission";
import Solution from "./Solution";
import Description from "./Description";
import Accepted from "./Accepted";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function CodingStatement() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [showAcceptedTab, setShowAcceptedTab] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [toggles, setToggles] = useState(false);

  const tabRefs = {
    description: useRef(null),
    solution: useRef(null),
    submission: useRef(null),
    accepted: useRef(null),
  };

  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);

    fetch(`http://localhost:8090/problem/get-by-id/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch problem");
        return res.json();
      })
      .then((responseData) => {
        const mappedData = {
          problemId: responseData.id,
          problemTitle: responseData.title,
          problemDifficulty: responseData.difficulty,
          problemDescription: responseData.description,
          topicList: responseData.topicList,
          companyList: responseData.companyList,
          problemConstraints: responseData.constraints,
          note: responseData.note,
          followUp: responseData.followUp,
          userProblemStatus: responseData.status,
          exampleList: responseData.exampleList.map((ex) => ({
            exampleInput: ex.input,
            exampleOutput: ex.output,
            exampleExplanation: ex.explanation,
          })),
          solution: responseData.solution,
          codeTemplates: responseData.codeTemplateList,
        };
        setData(mappedData);
      })
      .catch((error) => console.error("Error fetching problem:", error))
      .finally(() => setLoading(false));
  }, [id, toggles]);

  useEffect(() => {
    const currentTab = tabRefs[activeTab]?.current;
    if (currentTab) {
      const { offsetLeft, offsetWidth } = currentTab;
      setSliderStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab, showAcceptedTab, data]);

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleSubmited = (status) => {
    // Translate judge result to Enum status for immediate UI feedback
    // If judge says 'accepted', we show 'SOLVED'. Otherwise, 'ATTEMPTED'.
    const translatedStatus = status === "accepted" ? "SOLVED" : "ATTEMPTED";
    
    setSubmissionStatus(translatedStatus);
    setShowAcceptedTab(true);
    setActiveTab("accepted");
    
    // Trigger re-fetch so 'data.userProblemStatus' eventually syncs with DB
    setToggles(prev => !prev); 
  };

  const dynamicTabs = [
    { key: "description", label: "Description" },
    { key: "solution", label: "Solution" },
    { key: "submission", label: "Submissions" },
    ...(showAcceptedTab
      ? [
          {
            key: "accepted",
            label: submissionStatus === "accepted" ? "Accepted" : "Wrong Answer",
          },
        ]
      : []),
  ];

  if (loading) {
    return <div className="text-white text-center py-8 bg-black min-h-screen">Loading Problem...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden bg-black text-white">
      {/* LEFT PANEL */}
      <div className="w-full md:w-1/2 border-r border-gray-800 flex flex-col h-full">
        
        {/* STICKY NAVIGATION BAR */}
        <div className="sticky top-0 z-20 bg-[#0f0f0f] px-6 py-4 border-b border-gray-700 shrink-0">
          <div className="relative flex space-x-6">
            <motion.div
              className="absolute bottom-0 h-1 bg-blue-500 rounded-full"
              animate={sliderStyle}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
            {dynamicTabs.map(({ key, label }) => (
              <button
                key={key}
                ref={tabRefs[key]}
                onClick={() => handleTabClick(key)}
                className={`relative z-10 pb-1 text-sm font-medium transition-colors ${
                  activeTab === key ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* SCROLLABLE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto bg-[#0e0e0e] px-6 py-6 custom-scrollbar">
          {activeTab === "description" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Description data={data} submissionStatus={submissionStatus} />
            </motion.div>
          )}
          {activeTab === "solution" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Solution data={data} />
            </motion.div>
          )}
          {activeTab === "submission" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Submission problemId={id} />
            </motion.div>
          )}
          {activeTab === "accepted" && showAcceptedTab && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Accepted activeStatus={dynamicTabs.find((tab) => tab.key === "accepted")} />
            </motion.div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL (Editor) */}
      <div className="w-full md:w-1/2 bg-[#0d0d0d] flex flex-col border-l border-gray-800 h-full overflow-hidden">
        <CodeContainer
          onSubmit={handleSubmited}
          code={data}
          setToggles={setToggles}
        />
      </div>

      {/* Internal CSS for the scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2d2d2d;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3f3f3f;
        }
      `}</style>
    </div>
  );
}