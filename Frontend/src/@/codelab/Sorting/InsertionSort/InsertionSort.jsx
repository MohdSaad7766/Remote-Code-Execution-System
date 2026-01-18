import React, { useState } from "react";
import HowInsertionSortWorks from "./HowInsertionSortWorks";
import InsertionSortWalkthrough from "./InsertionSortWalkthrough";
import InsertionSortComplexity from "./InsertionSortComplexity";
import InsertionSortProsCons from "./InsertionSortProsCons";
import InsertionSortApplications from "./InsertionSortApplications";
import LanguageToggle from "../../../LanguageToggle/LanguageToggle";
import InsertionSortCode from "../../../LanguageToggle/LanguageCode/Sorting/InsertionSortCode";
import Animation from "../../Animation";

const InsertionSort = () => {
  const [selectLanguage, setSelectLanguage] = useState("Java");

  return (
    <div className="w-full mx-auto p-8 leading-relaxed">
      <header className='pb-3.5 flex justify-between align-middle'>
        <h2 className="text-4xl mb-6 font-bold ">Insertion Sort</h2>
        <Animation file="Insertion.html" title="Insertion Sort"/>
      </header>
      <p className="leading-7">
        Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. 
        It is much less efficient on large lists than more advanced algorithms such as quicksort or merge sort.
      </p>
      <p className="leading-7">
        It works well for small datasets and is easy to implement. It’s also adaptive, which means it performs better if the array is already partially sorted.
      </p>
      <HowInsertionSortWorks />
      <InsertionSortWalkthrough />
      <InsertionSortComplexity />

      

      <InsertionSortApplications />
      <InsertionSortProsCons />
      <h2 className="text-2xl font-semibold mt-4">Implimentation of Insertion Sort</h2>
      <LanguageToggle
        selectedLanguage={selectLanguage}
        setSelectedLanguage={setSelectLanguage}
        codeSnippets={InsertionSortCode}
      />
    </div>
  );
};

export default InsertionSort;
