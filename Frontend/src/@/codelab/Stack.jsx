import React, { useState } from "react";
import { Link } from "react-router-dom";
import DSAImg from "../components/DsaImg/DSAImg.jsx";
import LanguageToggle from "../LanguageToggle/LanguageToggle.jsx";
import StackCode from "../LanguageToggle/LanguageCode/StackCode.js";
import Animation from "./Animation.jsx";
const Stack = () => {
  

  const [selectStack,setSelectStack] = useState("Java");

  const maximizeImage = () => {
    const fullscreenDiv = document.createElement("div");
    fullscreenDiv.style.position = "relative";
    fullscreenDiv.style.top = "0";
    fullscreenDiv.style.left = "0";
    fullscreenDiv.style.width = "100vw";
    fullscreenDiv.style.height = "100vh";
    fullscreenDiv.style.background = "black";
    fullscreenDiv.style.zIndex = "1000";

    const iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.src = "/bubblesort";

    const closeButton = document.createElement("button");
    closeButton.innerText = "X";
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "10px";
    closeButton.style.padding = "10px";
    closeButton.style.background = "red";
    closeButton.style.color = "white";
    closeButton.style.border = "none";
    closeButton.style.cursor = "pointer";
    closeButton.onclick = () => document.body.removeChild(fullscreenDiv);

    fullscreenDiv.appendChild(closeButton);
    fullscreenDiv.appendChild(iframe);
    document.body.appendChild(fullscreenDiv);
  };

  return (
    <div className="p-8 leading-relaxed">
      <header className='pb-3.5 flex justify-between align-middle'>
        <h1 className="text-4xl font-bold">Stack Data Structure</h1>
     <Animation file="stack.html" title="Stack "/>
      </header>

      <section className="mt-4">
        <p>A Stack is a linear data structure that follows <b>LIFO (Last In First Out)</b> or <b>FILO (First In Last Out)</b>.</p>
        <p>It behaves like a stack of plates, where the last plate added is the first one to be removed.</p>
        <ul className="list-disc ml-6">
          <li>Pushing an element onto the stack is like adding a new plate on top.</li>
          <li>Popping an element removes the top plate from the stack.</li>
        </ul>
        <DSAImg src="../img/Stack/stack.jpeg" alt="Stack Data Structure" />
        <div className="mt-4">
          <img src="/images/s.png" alt="Stack Illustration" className="cursor-pointer" onClick={maximizeImage} />
        </div>
      </section>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Basic Operations</h2>
        <ul className="list-disc ml-6">
          <li><strong>push():</strong> Insert an element into the stack.</li>
          <li><strong>pop():</strong> Remove an element from the stack.</li>
          <li><strong>top():</strong> Returns the top element of the stack.</li>
          <li><strong>isEmpty():</strong> Returns true if stack is empty.</li>
          <li><strong>isFull():</strong> Returns true if stack is full.</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Push Operation</h2>
        <p>Adds an item to the stack. If full, an overflow condition occurs.</p>
        <pre className=" text-white border border-gray-800 p-4 rounded mt-2">
          If (top == capacity-1) <br />
          &nbsp;&nbsp;&nbsp;&nbsp; return "Stack Overflow" <br />
          Else <br />
          &nbsp;&nbsp;&nbsp;&nbsp; top = top + 1 <br />
          &nbsp;&nbsp;&nbsp;&nbsp; stack[top] = new_element
        </pre>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Pop Operation</h2>
        <p>Removes the top item from the stack. If empty, an underflow condition occurs.</p>
        <pre className="text-white border border-gray-800 p-4 rounded mt-2">
          If (top == -1) <br />
          &nbsp;&nbsp;&nbsp;&nbsp; return "Stack Underflow" <br />
          Else <br />
          &nbsp;&nbsp;&nbsp;&nbsp; element = stack[top] <br />
          &nbsp;&nbsp;&nbsp;&nbsp; top = top - 1 <br />
          &nbsp;&nbsp;&nbsp;&nbsp; return element
        </pre>
      </div> 

      

      <h2 className="text-black font-semibold text-2xl mt-8 ">Respentation of Stack</h2> 
      <LanguageToggle selectedLanguage={selectStack} setSelectedLanguage={setSelectStack}  codeSnippets={StackCode} />
  
      <div className="max-w-4xl mx-auto">
  <h2 className="text-2xl font-semibold mt-8 mb-4">Applications of Stack</h2>
  <ul className="list-disc pl-6 space-y-1">
    <li><strong>Function calls:</strong> Tracking return addresses of functions.</li>
    <li><strong>Recursion:</strong> Managing local variables and return points.</li>
    <li><strong>Expression evaluation:</strong> Handling postfix (RPN) expressions.</li>
    <li><strong>Syntax parsing:</strong> Validating language syntax rules.</li>
    <li><strong>Memory management:</strong> Supporting stack-based memory allocation.</li>
    <li>
      <strong>Solving DSA problems:</strong> Next Greater, Previous Greater, Next/Previous Smaller,
      Largest Area in Histogram, and Stock Span Problems.
    </li>
  </ul>
</div>


    </div>
  );
};

export default Stack;
