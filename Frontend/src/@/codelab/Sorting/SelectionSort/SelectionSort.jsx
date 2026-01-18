// SelectionSort.jsx
import React, { useState } from "react";
import HowSelectionSortWorks from "./HowSelectionSortWorks";
import SelectionSortWalkthrough from "./SelectionSortWalkthrough";
import SelectionSortComplexity from "./SelectionSortComplexity";
import SelectionSortApplications from "./SelectionSortApplications";
import SelectionSortProsCons from "./SelectionSortProsCons";
import LanguageToggle from "../../../LanguageToggle/LanguageToggle";
import SelectionSortCode from "../../../LanguageToggle/LanguageCode/Sorting/SelectionSortCode";
import Animation from "../../Animation";
const SelectionSort = () => {
  const [selectLanguage, setSelectLanguage] = useState("Java");
  return (
    <div className="w-full mx-auto p-8 leading-relaxed">
      <header className='pb-3.5 flex justify-between align-middle'>
        <h2 className="text-4xl mb-6 font-bold ">Selection Sort</h2>
        <Animation file="selectionSort.html" title="Selection Sort"/>    
      </header>
      <p className=" leading-7">
        Selection sort is a simple comparison-based sorting algorithm. It works
        by repeatedly selecting the minimum element from the unsorted portion of
        the array and swapping it with the first unsorted element.
      </p>
      <p className="leading-7">
        The process continues until the entire array is sorted. It is known for
        its simplicity but not for its efficiency on large datasets.
      </p>
      <HowSelectionSortWorks />
      <SelectionSortWalkthrough />
      <SelectionSortComplexity />
      <SelectionSortApplications />
      <SelectionSortProsCons />
      <h2 className="text-2xl font-semibold mt-4">Implimentation of Selection Sort</h2>
      <LanguageToggle
        selectedLanguage={selectLanguage}
        setSelectedLanguage={setSelectLanguage}
        codeSnippets={SelectionSortCode}
      />
    </div>
  );
};

export default SelectionSort;