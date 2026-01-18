import React from "react";
import MergeSortWalkthrough from "./MergeSortWalkthrough";
import MergeSortComplexity from "./MergeSortComplexity";
import MergeSortProsCons from "./MergeSortProsCons";
import MergeSortApplications from "./MergeApplication";
import HowMergeSortWorks from "./MergeSortWork";
import LanguageToggle from "../../../LanguageToggle/LanguageToggle";
import MergeSortCode from "../../../LanguageToggle/LanguageCode/Sorting/MergeSortCode"
import { useState } from "react";

const MergeSort = () => {
    const [selectLanguage,setSelectLanguage] = useState("Java");
  return (
    <div className="w-full mx-auto p-8 leading-relaxed">
    <h2 className="text-4xl mb-6 font-bold">Merge Sort</h2>
    <p className=" leading-7">
      Merge sort is a sorting algorithm that follows the{" "}
      <span className=" font-bold">divide-and-conquer</span> approach. 
      It works by recursively dividing the input array into smaller subarrays and sorting those subarrays, 
      then merging them back together to obtain the sorted array.
    </p>
    <p className=" leading-7">
      In simple terms, we can say that the process of merge sort is to
      divide the array into two halves,
      sort each half, and then
      merge the sorted halves back together.
      This process is repeated until the entire array is sorted.
    </p>
    <HowMergeSortWorks />
    <MergeSortWalkthrough />
    <MergeSortComplexity />
    <MergeSortApplications />
    <MergeSortProsCons />
    <h2 className="text-2xl font-semibold mt-4">Implimentation of Merge Sort</h2>
    <LanguageToggle selectedLanguage={selectLanguage} setSelectedLanguage={setSelectLanguage} codeSnippets={MergeSortCode} />
   
  </div>
  
  );
};

export default MergeSort;
