import React, { createContext, useContext, useEffect, useState } from "react";

const ContestContext = createContext();

export const useContest = () => useContext(ContestContext);

export const ContestProvider = ({ children }) => {
  const [contestData, setContestData] = useState(null);
  const [problemList, setProblemList] = useState([]);
  const [remainingTime, setRemainingTime] = useState(0);

  // Load contest data and time once
  useEffect(() => {
    const storedData = localStorage.getItem("contestData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setContestData(parsed.contest);
      const problems = parsed.problemList.map((entry) => entry.problem);
      setProblemList(problems);

      const startTime = parsed.startTime || Date.now();
      const duration = parsed.duration || parsed.remainingTimeInSeconds;
      const endTime = startTime + duration * 1000;

      // Save back startTime so it's consistent across reloads
      localStorage.setItem(
        "contestData",
        JSON.stringify({ ...parsed, startTime, duration })
      );

      const updateRemaining = () => {
        const now = Date.now();
        const diff = Math.max(Math.floor((endTime - now) / 1000), 0);
        setRemainingTime(diff);
      };

      updateRemaining();
      const interval = setInterval(updateRemaining, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <ContestContext.Provider
      value={{ contestData, problemList, remainingTime }}
    >
      {children}
    </ContestContext.Provider>
  );
};
