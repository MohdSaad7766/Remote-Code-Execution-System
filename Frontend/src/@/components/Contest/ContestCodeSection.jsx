import { useState } from "react";
import React from "react";
import Button from "../Button/Button";
import DelayButton from "../DelayButton";
import SelectBoxItem from "../SelectBox/SelectBoxItem";
const languages = [
  { id: 1, name: 'Java' },
  { id: 2, name: 'Python' },
  { id: 3, name: 'JavaScript' },
  { id: 4, name: 'C++' },
  { id: 5, name: 'Go' },
]

export default function ContestCodeSection() {
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [toggle, setToggle] = useState(true);
   const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const toggletestCase = () => {
    setToggle(!toggle);
  };
  const handleClick = () => {
    setLoading(true); 
    setTimeout(() => {
      toggletestCase(); 
      setLoading(false); 
    }, 5000);
  };
  return (
    <div className="flex flex-wrap w-full bg-black md:w-1/2">

      <div className="flex flex-wrap items-center z-10 ml-2 justify-baseline align-baseline">
     
      <SelectBoxItem selected={selectedLanguage} setSelected={setSelectedLanguage} category={languages} defaultName="Languages"/>
<nav className="flex m-1.5 gap-2">
    
    <DelayButton onDelayedClick={handleClick}
               delay={5000}
               label="Compile & Run"
               loadingText="compiling..."
               loading={loading}
               setLoading={setLoading}
               />
              
              <DelayButton 
               delay={5000}
               label="Submit"
               loadingText="Submitting..."
               loading ={loadingSubmit}
               setLoading={setLoadingSubmit}
               />  
   


  </nav>
  </div>
      {/* Editable code area */}
      <div className="relative  ml-2 h-185 w-full rounded mr-2 border-1 border-amber-200/20 text-amber-50 overflow-x-auto">
  
  

  {/* Editable code area */}
  <pre
  contentEditable={true}
  suppressContentEditableWarning={true}
  onPaste={(e) => 
    {e.preventDefault()
      alert("Pasting is disabled");
    } }
  onCopy ={(e) => { 
    e.preventDefault();
    alert("Copying is disabled");
  }}
  className="outline-none select-none pl-2.5 codeBar whitespace-pre h-90 overflow-y-scroll hide-scrollbar"
>
{`class Solution {
    public static void main(String[] args) {
      // Your code here
    }
}`}
</pre>

  {/* Show Testcase Area when toggle = true */}
  {toggle && (
  <div className="p-4 border bottom-0 border-amber-100/2 py-5 gap-3.5 transform-3d transition-all transition-discrete rounded shadow resize-y overflow-auto min-h-[100px]">
    <h3 className="text-lg font-bold mb-2">Test Cases</h3>
    <input type="text"
      className="w-full h-13 p-2 my-3.5 border border-gray-900 rounded resize-none placeholder-white"
      placeholder="[1,2,3]"
    />
    <input type="text"
      className="w-full h-13 p-2 border my-3.5 border-gray-900 rounded resize-none placeholder-white"
      placeholder="6"
    />
  </div>
)}

</div>


      {/* Fixed Buttons */}

    </div>
  )
}