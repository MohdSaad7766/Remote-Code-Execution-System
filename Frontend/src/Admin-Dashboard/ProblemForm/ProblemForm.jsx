// Same import section
import React, { useState } from "react";
import Editor from "@monaco-editor/react";

// Constants
const difficultyOptions = ["EASY", "MEDIUM", "HARD"];
const approachTypes = ["BRUTE_FORCE", "BETTER", "OPTIMAL"];
const languages = ["JAVA", "CPP", "JAVA_SCRIPT", "C", "PYTHON"];
const topicOptions = [
  "Array",
  "String",
  "Hash Table",
  "Dynamic Programming",
  "Math",
  "Sorting",
  "Greedy",
  "Database",
  "Binary Search",
  "Tree",
  "Breadth-First Search",
  "Depth-First Search",
  "Binary Tree",
  "Two Pointers",
  "Bit Manipulation",
  "Stack",
  "Design",
  "Heap (Priority Queue)",
  "Graph",
  "Simulation",
  "Counting",
  "Sliding Window",
  "Union Find",
  "Linked List",
  "Ordered Set",
  "Monotonic Stack",
  "Trie",
  "Segment Tree",
  "Binary Indexed Tree",
  "Divide and Conquer",
  "Bitmask",
  "Queue",
  "Recursion",
  "Iterator",
  "Concurrency",
  "Doubly-Linked List",
  "Geometry",
];

const companyOptions = [
  "Google",
  "Amazon",
  "Meta",
  "Apple",
  "Microsoft",
  "Netflix",
  "Uber",
  "LinkedIn",
  "Twitter",
  "Spotify",
  "Airbnb",
  "Dropbox",
  "Salesforce",
  "Adobe",
  "Oracle",
  "IBM",
  "Tesla",
  "PayPal",
  "Square",
  "Stripe",
  "Atlassian",
  "Shopify",
  "ByteDance",
  "TikTok",
  "Snap",
  "Pinterest",
  "Reddit",
  "Zoom",
  "Slack",
  "GitHub",
  "GitLab",
  "Coinbase",
  "Robinhood",
  "DoorDash",
  "Instacart",
  "Lyft",
  "Twilio",
  "Palantir",
  "Databricks",
  "Snowflake",
  "MongoDB",
  "Elastic",
  "VMware",
  "ServiceNow",
  "Workday",
];

export default function ProblemForm({ problem = {}, onClose, onSaved }) {
  const [form, setForm] = useState({
    problemTitle: "",
    problemDifficulty: "EASY",
    problemDescription: "",
    note: "",
    topicList: [],
    companyList: [],
    problemConstraintsList: [""],
    exampleRequestDTOList: [
      { exampleInput: "", exampleOutput: "", exampleExplanation: "" },
    ],
    testCaseRequestDTOList: [
      { testCaseInput: "", testCaseOutput: "", visible: true },
    ],
    solutionRequestDTO: {
      approachRequestDTOList: [
        { approachType: "BRUTE_FORCE", approachDescription: "" },
      ],
    },
    codeTemplateRequestDTOList: [
      {
        language: "JAVA",
        invisibleTemplateCode: "",
        visibleTemplateCode: "",
      },
    ],
  });

  const updateField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("adminToken"); // Fetch token from localStorage

      if (!token) {
        console.error("Admin token not found in localStorage");
        return;
      }
      console.log(form);

      const res = await fetch("http://localhost:8080/central/problem/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Set Bearer token
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Problem Added Successfully");

        onSaved();
        onClose();
      } else {
        const errorText = await res.text();
        console.error("Failed to submit problem:", errorText);
      }
    } catch (err) {
      console.error("Error submitting problem:", err);
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="bg-black p-2 rounded border border-gray-700"
          placeholder="Problem Title"
          value={form.problemTitle}
          onChange={(e) => updateField("problemTitle", e.target.value)}
        />
        <select
          className="bg-black p-2 rounded border border-gray-700"
          value={form.problemDifficulty}
          onChange={(e) => updateField("problemDifficulty", e.target.value)}
        >
          {difficultyOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <textarea
        rows="4"
        className="w-full bg-black p-2 rounded border border-gray-700"
        placeholder="Problem Description"
        value={form.problemDescription}
        onChange={(e) => updateField("problemDescription", e.target.value)}
      />

      <DropdownList
        label="Topics"
        options={topicOptions}
        selected={form.topicList}
        onChange={(vals) => updateField("topicList", vals)}
      />
      <DropdownList
        label="Companies"
        options={companyOptions}
        selected={form.companyList}
        onChange={(vals) => updateField("companyList", vals)}
      />

      <DynamicList
        label="Constraints"
        items={form.problemConstraintsList}
        onChange={(list) => updateField("problemConstraintsList", list)}
      />
      <DynamicExampleList
        label="Examples"
        items={form.exampleRequestDTOList}
        onChange={(list) => updateField("exampleRequestDTOList", list)}
      />
      <DynamicTestCaseList
        label="Test Cases"
        items={form.testCaseRequestDTOList}
        onChange={(list) => updateField("testCaseRequestDTOList", list)}
      />

      <h2 className="text-lg font-semibold">Approaches</h2>
      {form.solutionRequestDTO.approachRequestDTOList.map((approach, idx) => (
        <div key={idx} className="space-y-2 border border-gray-700 p-2 rounded">
          <select
            value={approach.approachType}
            onChange={(e) => {
              const updated = [
                ...form.solutionRequestDTO.approachRequestDTOList,
              ];
              updated[idx].approachType = e.target.value;
              updateField("solutionRequestDTO", {
                approachRequestDTOList: updated,
              });
            }}
            className="bg-black p-2 rounded border border-gray-700"
          >
            {approachTypes.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
          <textarea
            className="w-full bg-black p-2 rounded border border-gray-700"
            placeholder="Description"
            value={approach.approachDescription}
            onChange={(e) => {
              const updated = [
                ...form.solutionRequestDTO.approachRequestDTOList,
              ];
              updated[idx].approachDescription = e.target.value;
              updateField("solutionRequestDTO", {
                approachRequestDTOList: updated,
              });
            }}
          />
          <button
            onClick={() => {
              const updated =
                form.solutionRequestDTO.approachRequestDTOList.filter(
                  (_, i) => i !== idx
                );
              updateField("solutionRequestDTO", {
                approachRequestDTOList: updated,
              });
            }}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() => {
          updateField("solutionRequestDTO", {
            approachRequestDTOList: [
              ...form.solutionRequestDTO.approachRequestDTOList,
              { approachType: "BRUTE_FORCE", approachDescription: "" },
            ],
          });
        }}
        className="bg-blue-700 px-3 py-1 text-white rounded"
      >
        + Add Approach
      </button>

      <h2 className="text-lg font-semibold">Code Templates</h2>
      {form.codeTemplateRequestDTOList.map((template, idx) => (
        <div key={idx} className="space-y-2 border border-gray-700 p-2 rounded">
          <select
            value={template.language}
            onChange={(e) => {
              const updated = [...form.codeTemplateRequestDTOList];
              updated[idx].language = e.target.value;
              updateField("codeTemplateRequestDTOList", updated);
            }}
            className="bg-black p-2 rounded border border-gray-700"
          >
            {languages.map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>

          <div>
            <p className="text-sm text-gray-300">Invisible Template Code</p>
            <Editor
              height="150px"
              language="javascript"
              value={template.invisibleTemplateCode}
              onChange={(val) => {
                const updated = [...form.codeTemplateRequestDTOList];
                updated[idx].invisibleTemplateCode = val;
                updateField("codeTemplateRequestDTOList", updated);
              }}
              theme="vs-dark"
              options={{
                fontSize: 18,
                minimap: { enabled: false },
                wordWrap: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                formatOnType: true,
                renderIndentGuides: true,
                guides: { indentation: true },
                bracketPairColorization: { enabled: true },
                suggestOnTriggerCharacters: true,
                quickSuggestions: {
                  other: true,
                  comments: true,
                  strings: true,
                },
                acceptSuggestionOnEnter: "on",
                lineNumbers: "on",
              }}
            />
          </div>

          <div>
            <p className="text-sm text-gray-300">Visible Template Code</p>
            <Editor
              height="150px"
              language="javascript"
              value={template.visibleTemplateCode}
              onChange={(val) => {
                const updated = [...form.codeTemplateRequestDTOList];
                updated[idx].visibleTemplateCode = val;
                updateField("codeTemplateRequestDTOList", updated);
              }}
              options={{ theme: "vs-dark" }}
            />
          </div>

          <button
            onClick={() => {
              const updated = form.codeTemplateRequestDTOList.filter(
                (_, i) => i !== idx
              );
              updateField("codeTemplateRequestDTOList", updated);
            }}
            className="text-red-500"
          >
            Remove Template
          </button>
        </div>
      ))}

      <button
        onClick={() => {
          updateField("codeTemplateRequestDTOList", [
            ...form.codeTemplateRequestDTOList,
            {
              language: "JAVA",
              invisibleTemplateCode: "",
              visibleTemplateCode: "",
            },
          ]);
        }}
        className="bg-blue-700 px-3 py-1 text-white rounded"
      >
        + Add Template
      </button>

      <textarea
        rows="2"
        className="w-full bg-black p-2 rounded border border-gray-700"
        placeholder="Note"
        value={form.note}
        onChange={(e) => updateField("note", e.target.value)}
      />

      <div className="flex justify-end space-x-3">
        <button onClick={onClose} className="bg-gray-700 px-4 py-2 rounded">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-600 px-4 py-2 rounded text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

// Reusable components
function DropdownList({ label, options, selected, onChange }) {
  const toggleSelect = (opt) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((x) => x !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };
  return (
    <div>
      <h3 className="font-semibold text-sm mb-1">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => toggleSelect(opt)}
            className={`px-2 py-1 rounded text-sm border ${
              selected.includes(opt)
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function DynamicList({ label, items, onChange }) {
  return (
    <div>
      <h3 className="font-semibold text-sm mb-1">{label}</h3>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2 mb-1">
          <input
            className="bg-black p-2 rounded border border-gray-700 w-full"
            value={item}
            onChange={(e) => {
              const updated = [...items];
              updated[idx] = e.target.value;
              onChange(updated);
            }}
          />
          <button
            onClick={() => onChange(items.filter((_, i) => i !== idx))}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...items, ""])}
        className="text-blue-500"
      >
        + Add {label}
      </button>
    </div>
  );
}

function DynamicExampleList({ label, items, onChange }) {
  return (
    <div>
      <h3 className="font-semibold text-sm mb-1">{label}</h3>
      {items.map((ex, idx) => (
        <div
          key={idx}
          className="space-y-1 border border-gray-700 p-2 rounded mb-2"
        >
          <input
            className="bg-black p-2 rounded border border-gray-700 w-full"
            placeholder="Input"
            value={ex.exampleInput}
            onChange={(e) => {
              const updated = [...items];
              updated[idx].exampleInput = e.target.value;
              onChange(updated);
            }}
          />
          <input
            className="bg-black p-2 rounded border border-gray-700 w-full"
            placeholder="Output"
            value={ex.exampleOutput}
            onChange={(e) => {
              const updated = [...items];
              updated[idx].exampleOutput = e.target.value;
              onChange(updated);
            }}
          />
          <textarea
            className="bg-black p-2 rounded border border-gray-700 w-full"
            placeholder="Explanation"
            value={ex.exampleExplanation}
            onChange={(e) => {
              const updated = [...items];
              updated[idx].exampleExplanation = e.target.value;
              onChange(updated);
            }}
          />
          <button
            onClick={() => onChange(items.filter((_, i) => i !== idx))}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() =>
          onChange([
            ...items,
            { exampleInput: "", exampleOutput: "", exampleExplanation: "" },
          ])
        }
        className="text-blue-500"
      >
        + Add {label}
      </button>
    </div>
  );
}

function DynamicTestCaseList({ label, items, onChange }) {
  return (
    <div>
      <h3 className="font-semibold text-sm mb-1">{label}</h3>
      {items.map((tc, idx) => (
        <div
          key={idx}
          className="space-y-1 border border-gray-700 p-2 rounded mb-2"
        >
          <input
            className="bg-black p-2 rounded border border-gray-700 w-full"
            placeholder="Input"
            value={tc.testCaseInput}
            onChange={(e) => {
              const updated = [...items];
              updated[idx].testCaseInput = e.target.value;
              onChange(updated);
            }}
          />
          <input
            className="bg-black p-2 rounded border border-gray-700 w-full"
            placeholder="Output"
            value={tc.testCaseOutput}
            onChange={(e) => {
              const updated = [...items];
              updated[idx].testCaseOutput = e.target.value;
              onChange(updated);
            }}
          />
          <label className="text-sm text-gray-400">Visible</label>
          <select
            className="bg-black p-2 rounded border border-gray-700 w-full"
            value={tc.visible}
            onChange={(e) => {
              const updated = [...items];
              updated[idx].visible = e.target.value === "true";
              onChange(updated);
            }}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <button
            onClick={() => onChange(items.filter((_, i) => i !== idx))}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() =>
          onChange([
            ...items,
            { testCaseInput: "", testCaseOutput: "", visible: true },
          ])
        }
        className="text-blue-500"
      >
        + Add {label}
      </button>
    </div>
  );
}
