import React from "react";

export default function Accepted({ activeStatus }) {
  const runtime = activeStatus?.title === "Accepted";

  return (
    <div className="p-2">
      <caption className="text-white pb-5">Submission</caption>
      <div className="flex justify-baseline align-middle place-items-center">
        <span className={`ml-1.5 text-xl ${runtime ? "text-green-700" : "text-red-700"}`}>
          {runtime ? "Accepted" : "Wrong Answer"}
        </span>
        <span className="text-white pl-4 font-extralight text-sm">5/5 Testcase passed</span>
      </div>

      {runtime ? (
        <div>
          <span className="text-white p-1.5 font-extralight text-sm">
            Submitted at 1 Jun 2025
          </span>
        </div>
      ) : (
        <div>
          <div>
            <p className="text-sm text-white p-1.5">Input</p>
            <div className="text-white bg-amber-100/10 m-1 px-3.5 py-2">
              <p>n =</p>
              <p>1 2</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-white p-1.5">Output</p>
            <div className="text-white bg-amber-100/10 m-1 px-3.5 py-2">
              <p>4</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-white p-1.5">Expected</p>
            <div className="text-white bg-amber-100/10 m-1 px-3.5 py-2">
              <p>3</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
