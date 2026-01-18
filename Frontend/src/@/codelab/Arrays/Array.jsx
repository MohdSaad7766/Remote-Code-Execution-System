import React, { useState } from 'react';
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ArrayCode from '../../LanguageToggle/LanguageCode/ArrayCode';
import LanguageToggle from '../../LanguageToggle/LanguageToggle';
import ArrayApplications from './ArrayApplication';
import ArraySyntax from './ArraySyntax';
import arrayDeclarations from './ArrayDeclare';
import arrayInitializations from './ArrayInitilize';
import DSAImg from '../../components/DsaImg/DSAImg';
import Animation from '../Animation';

export default function Array() {
  const faqs = [
    {
      question: "What is your refund policy?",
      answer: "If you're unhappy with your purchase, we'll refund you in full.",
    },
    {
      question: "Do you offer technical support?",
      answer: "Yes! Our support team is available 24/7 to assist you.",
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping typically takes 5-7 business days.",
    },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState("Java")
  const [selectedDeclare, setSelectedDeclare] = useState("Java")
  const [selectedInitilize, setSelectedInitilize] = useState("Java")
  return (
    <div className=" relative h-auto p-8">
      <header className='pb-3.5 flex justify-between align-middle'>
        <h1 className="text-3xl font-bold">Array Data Structure</h1>
         
          <Animation file="array.html" title="Array"/>
      
      </header>
      <div className="relative">
        <p>Array is a linear data structure where all elements are arranged sequentially. It is a collection of elements of same data type stored at contiguous memory locations.

          Getting-Started-with-Array-Data-Structure.</p>

        <p>For simplicity, we can think of an array as a flight of stairs where on each step is placed a value (let’s say one of your friends). Here, you can identify the location of any of your friends by simply knowing the count of the step they are on. </p>

        <p>This makes it easier to calculate the position of each element by simply adding an offset to a base value, i.e., the memory location of the first element of the array (generally denoted by the name of the array). The base value is index 0 and the difference between the two indexes is the offset.</p>

        <p>Remember: “Location of next index depends on the data type we use”. </p>
      <DSAImg src="../img/Array/arrays.png" alt="Array" />

        <h1 className='pb-2.5 mt-2.5 text-xl font-bold'>Is the array always of a fixed size?</h1>
        <p>Arrays at core are of fixed size only, but most of the languages provide dynamic sized arrays using the underlying fixed sized arrays. For example, vector in C++, ArrayList in Java and list in Python. In C language, the array has a fixed size meaning once the size is given to it, it cannot be changed i.e. you can’t shrink it nor can you expand it.

        </p>
        

        <h2 className='text-xl font-bold mt-3.5 mb-2.5'>Basic terminologies of Array</h2>
        <ul className="list-disc relative ml-3.5">
          <li><strong>Array Index:</strong>In an array, elements are identified by their indexes. Array index starts from 0.</li>
          <li><strong>Array element</strong>Elements are items stored in an array and can be accessed by their index.</li>
          <li><strong>Array Length</strong>The length of an array is determined by the number of elements it can contain. </li>
        </ul>
        {/* <LanguageToggle selectedLanguage={selectedDeclare} setSelectedLanguage={setSelectedDeclare} codeSnippets={arrayDeclarations} /> */}
        {/* <LanguageToggle selectedLanguage={selectedInitilize} setSelectedLanguage={setSelectedInitilize} codeSnippets={arrayInitializations} /> */}
        <h2 className='text-xl font-bold mt-3.5 mb-2.5'>Memory representation of Array</h2>
        <p>In an array, all the elements are stored in contiguous memory locations. So, if we initialize an array, the elements will be allocated sequentially in memory. This allows for efficient access and manipulation of elements.</p>
        <DSAImg src="../img/Array/array-rep.png" alt="Memory representation of Array" />
      </div>

      

      <LanguageToggle selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} codeSnippets={ArrayCode} />
      <ArrayApplications />
    </div>

  );
}