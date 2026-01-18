import React, { useState } from "react";
import HowBubbleSortWorks from "./HowBubbleSortWorks";
import BubbleSortWalkthrough from "./BubbleSortWalkthrough";
import BubbleSortComplexity from "./BubbleSortComplexity";
import BubbleSortProsCons from "./BubbleSortProsCons";
import BubbleSortApplications from "./BubbleSortApplications";
import LanguageToggle from "../../../LanguageToggle/LanguageToggle";
import BubbleSortCode from "../../../LanguageToggle/LanguageCode/Sorting/BubbleSortCode";
import Animation from "../../Animation";
const BubbleSort = () => {
  const [selectLanguage, setSelectLanguage] = useState("Java");

  return (
    <div className="w-full mx-auto p-8 leading-relaxed">
      <header className='pb-3.5 flex justify-between align-middle'>
        <h2 className="text-4xl mb-6 font-bold">Bubble Sort</h2>
         <Animation file="bubblesort.html" title="Bubble Sort"/>
          
      
      </header>
      <p className="leading-7">
        Bubble sort is a simple comparison-based sorting algorithm. It works by
        repeatedly swapping the adjacent elements if they are in the wrong order.
        The process is repeated until the array is sorted.
      </p>
      <p className="leading-7">
        Although not efficient for large datasets, Bubble Sort is a great way to
        understand basic sorting mechanics and is often used for educational purposes.
      </p>
      <HowBubbleSortWorks />
      <BubbleSortWalkthrough />
      <BubbleSortComplexity />
      
      <BubbleSortApplications />
      <BubbleSortProsCons />
      
      <h2 className="text-2xl font-semifold mt-3.5">Representation of Bubble Sort</h2>
      <LanguageToggle
        selectedLanguage={selectLanguage}
        setSelectedLanguage={setSelectLanguage}
        codeSnippets={BubbleSortCode}
      />
    </div>
  );
};

export default BubbleSort;
