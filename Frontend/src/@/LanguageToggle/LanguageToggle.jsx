import React, { useState,useEffect } from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';
export default function LanguageToggle({ selectedLanguage, setSelectedLanguage, codeSnippets }) {
  const languages = ["Java", "JavaScript", "Python", "C++"];
  const [showOutput, setOutput] = useState(false);
  if(codeSnippets.output === undefined)
  {
    console.log("hello")
  }
  const showCodeOutput = () => {
    setOutput(!showOutput)
  }
  useEffect(() => {
    setOutput(false)
  }, [selectedLanguage])

  return (
    <>
      <div className="flex justify-left lg:no-wrap flex-wrap mt-4">
        {languages.map((language) => (
          <button
            key={language}
            className={`px-4 py-2 m-1 mx-2 rounded ${selectedLanguage === language ? 'bg-white text-black' : 'bg-gray-900 text-gray-100'}`}
            onClick={() => setSelectedLanguage(language)}
          >
            {language}
          </button>
        ))}
      </div>

      <h3 className="font-semibold mt-6">{selectedLanguage}</h3>
      {/* <button onClick={showCodeOutput} className='text-white' >run</button> */}
      <pre className="relative bg-black border border-gray-700 text-white p-6 rounded-lg mb-8 mt-4 overflow-x-auto text-sm shadow-lg">
  
  {codeSnippets.output !== undefined && (
  <button 
    onClick={showCodeOutput}  
    className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition-all"
  >
    <PlayIcon className="w-5 h-5 text-white" />
  </button>
  )}
  
  <code className="whitespace-pre-wrap">
    {codeSnippets[selectedLanguage]}
  </code>

  {showOutput && codeSnippets.output !== undefined && (
    <div className="mt-4 p-3 bg-gray-800 rounded-md flex md:flex-wrap flex-wrap lg:flex-col">
      <p className="text-green-400 text-xs">Console Output:</p>
      <p className="text-white">{codeSnippets['output']}</p>
    </div>
  )}
</pre>
    </>
  );
}
