import React, { useState } from "react";
import LanguageToggle from "../../../LanguageToggle/LanguageToggle";
import LinearSearchCode from "../../../LanguageToggle/LanguageCode/Searching/LinearSearchCode";
import Animation from "../../Animation";
const LinearSearch = () => {
  const [selectLinear, setSelectLinear] = useState("Java");
  return (
    <div className="p-8 mx-auto">
      <header className='pb-3.5 flex justify-between align-middle'>
        <h1 className="text-3xl font-bold">Linear Search</h1>

        <Animation file="linear.html" title="Linear Search" />

      </header>
      <p className="mb-4">
        Linear Search is a simple search algorithm that checks every element in a list or array sequentially until the desired element is found or the list ends. It is also known as sequential search.
      </p>

      <h2 className="text-2xl font-semibold mb-2">How it Works</h2>
      <ol className="list-decimal list-inside mb-4">
        <li>Start from the first element of the array.</li>
        <li>Compare the current element with the target.</li>
        <li>If they match, return the current index.</li>
        <li>If not, move to the next element.</li>
        <li>Repeat until the end of the array.</li>
        <li>If the element is not found, return -1.</li>
      </ol>

      <h2 className="text-2xl font-semibold mb-2">Algorithm</h2>
      <pre className="border border-gray-800 p-4 rounded mb-4">
        <code>
          1. Start from the first element of the array.<br />
          2. Traverse the array from index 0 to n-1 (where n is the size of the array).<br />
          3.   For each element, check if it is equal to the target.<br />
          4.   If it is equal, return the index.<br />
          5. If the entire array is traversed and the target is not found, return -1.<br />
        </code>
      </pre>



      <h2 className="text-2xl font-semibold mb-2">Applications</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Searching in small or unsorted datasets.</li>
        <li>Useful when dealing with user input where the dataset isn't preprocessed.</li>
        <li>Finding the first occurrence of an element in an array.</li>
        <li>Detecting duplicates in a list.</li>
        <li>Validating input against a list of allowed values.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Example</h2>
      <ol className="list-decimal list-inside mb-4">
        <li>Assume you have a list of student roll numbers: [101, 102, 103, 104, 105]</li>
        <li>You want to check if roll number 104 exists.</li>
        <li>Start from index 0 and compare each element with 104.</li>
        <li>At index 3, element 104 is found.</li>
        <li>Return index 3 as the result.</li>
      </ol>

      <h2 className="text-2xl font-semibold mb-2">Advantages</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Simple to implement and understand.</li>
        <li>No need for the list to be sorted.</li>
        <li>Works well for small datasets.</li>
        <li>No additional space is required (in-place).</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Disadvantages</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Inefficient for large datasets.</li>
        <li>Time complexity is O(n), making it slower than binary search for large, sorted arrays.</li>
        <li>Poor scalability with input size.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Time Complexity</h2>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Best Case:</strong> O(1) → When the element is found at the first index.</li>
        <li><strong>Average Case:</strong> O(n) → When the element is somewhere in the middle.</li>
        <li><strong>Worst Case:</strong> O(n) → When the element is at the end or not present.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Space Complexity</h2>
      <p className="mb-4">O(1) → Constant space, as no extra space is used apart from a few variables.</p>
      <LanguageToggle selectedLanguage={selectLinear} setSelectedLanguage={setSelectLinear} codeSnippets={LinearSearchCode} />
    </div>
  );
};

export default LinearSearch;
