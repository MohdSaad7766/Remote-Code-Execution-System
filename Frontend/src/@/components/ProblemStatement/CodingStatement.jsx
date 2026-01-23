import React, { useEffect, useRef, useState } from "react";
import CodeContainer from "../CodeSection/CodeContainer";
import Submission from "./submission";
import Solution from "./Solution";
import Description from "./Description";
// Removed Accepted import
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function CodingStatement() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(true);
  const [toggles, setToggles] = useState(false);

  const tabRefs = {
    description: useRef(null),
    solution: useRef(null),
    submission: useRef(null),
  };

  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);

    fetch(`http://localhost:8090/problem/get-by-id/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => res.json())
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
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id, toggles]); // toggles triggers a refresh after submission

  useEffect(() => {
    const currentTab = tabRefs[activeTab]?.current;
    if (currentTab) {
      const { offsetLeft, offsetWidth } = currentTab;
      setSliderStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab, data]);

  // Simplified dynamic tabs (removed the conditional "Accepted" tab)
  const dynamicTabs = [
    { key: "description", label: "Description" },
    { key: "solution", label: "Solution" },
    { key: "submission", label: "Submissions" },
  ];

  if (loading) return <div className="bg-black text-white h-screen w-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="flex w-full overflow-hidden bg-black text-white h-full max-h-full">
      
      {/* BOX 1: CODING STATEMENT (Left) */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-white/10 h-full overflow-hidden">
        
        <div className="shrink-0 bg-[#0f0f0f] px-6 py-4 border-b border-white/5">
          <div className="relative flex space-x-6">
            <motion.div
              className="absolute bottom-0 h-1 bg-blue-500 rounded-full"
              animate={sliderStyle}
            />
            {dynamicTabs.map(({ key, label }) => (
              <button
                key={key}
                ref={tabRefs[key]}
                onClick={() => setActiveTab(key)}
                className={`relative z-10 pb-1 text-sm font-medium transition-colors ${
                  activeTab === key ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0e0e0e] px-6 py-6 pb-20">
          {activeTab === "description" && <Description data={data} />}
          {activeTab === "solution" && <Solution data={data} />}
          {activeTab === "submission" && <Submission problemId={id} />}
        </div>
      </div>

      {/* BOX 2: CODE CONTAINER (Right) */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0d0d0d] overflow-hidden h-full">
        <CodeContainer
          code={data}
          onSubmit={(status) => {
            // Simply trigger a data refresh to update difficulty badges or "Solved" checkmarks
            setToggles(p => !p); 
          }}
        />
      </div>

      <style>{`
        html, body, #root {
          margin: 0 !important;
          padding: 0 !important;
          height: 100vh !important;
          width: 100vw !important;
          overflow: hidden !important;
          background-color: #000000 !important;
        }
        footer { display: none !important; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0a0a0a; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
      `}</style>
    </div>
  );
}