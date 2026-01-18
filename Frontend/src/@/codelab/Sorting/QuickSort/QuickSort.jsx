import React, { useState } from "react";
import HowQuickSortWorks from "./HowQuickSortWorks";
import QuickSortWalkthrough from "./QuickSortWalkthrough";
import QuickSortComplexity from "./QuickSortComplexity";
import QuickSortApplications from "./QuickSortApplications";
import QuickSortProsCons from "./QuickSortProsCons";
import LanguageToggle from "../../../LanguageToggle/LanguageToggle";
import QuickSortCode from "../../../LanguageToggle/LanguageCode/Sorting/QuickSortCode";

const QuickSort = () => {
  const [selectLanguage, setSelectLanguage] = useState("Java");

  return (
    <div className="w-full mx-auto p-8 leading-relaxed">
      <h2 className="text-4xl mb-6 font-bold">Quick Sort</h2>
      <p className="leading-7">
        Quick Sort is a fast and efficient divide-and-conquer sorting algorithm. It works by selecting a pivot element, 
        partitioning the array, and then recursively sorting the subarrays.
      </p>

      <HowQuickSortWorks />
      <QuickSortWalkthrough />
      <QuickSortComplexity />
      <QuickSortApplications />
      <QuickSortProsCons />
      <h2 className="text-2xl font-semibold mt-4">Implimentation of Quick Sort</h2>
      <LanguageToggle 
        selectedLanguage={selectLanguage} 
        setSelectedLanguage={setSelectLanguage} 
        codeSnippets={QuickSortCode} 
      />
    </div>
  );
};

export default QuickSort;
