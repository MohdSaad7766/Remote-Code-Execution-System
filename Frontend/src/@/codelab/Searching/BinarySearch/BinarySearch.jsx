import React from 'react';
import { useState } from 'react';
import LanguageToggle from '../../../LanguageToggle/LanguageToggle';
import Animation from '../../Animation';
import BinarySearchCode from '../../../LanguageToggle/LanguageCode/Searching/BinarySearchCode'
const BinarySearchPage = () => {
     const [selectBinary,setSelectBinary] = useState("Java");
  return (
    <div className="mx-auto p-8 leading-relaxed">
      <header className='pb-3.5 flex justify-between align-middle'>
        <h1 className="text-3xl font-bold">Binary Search Algorithm</h1>
         
           <Animation file="binary.html" title="Binary Search"/>
      
      </header>
      
      <p className="mb-4">
        Binary Search is a highly efficient searching algorithm used for finding an element from a sorted array or list. It works by repeatedly dividing the search space in half until the element is found or the search space is exhausted.
      </p>

      <h2 className="text-2xl font-semibold mb-2">How it Works</h2>
      <ol className="list-decimal list-inside mb-4">
        <li>Start with two pointers: <strong>low</strong> at the start of the array and <strong>high</strong> at the end.</li>
        <li>Calculate the middle index: <strong>mid = low + (high - low) / 2</strong>.</li>
        <li>Compare the element at <strong>mid</strong> with the target element.</li>
        <li>If the target is found at <strong>mid</strong>, return the index.</li>
        <li>If the target is smaller than the element at <strong>mid</strong>, narrow the search to the left half by setting <strong>high = mid - 1</strong>.</li>
        <li>If the target is larger than the element at <strong>mid</strong>, narrow the search to the right half by setting <strong>low = mid + 1</strong>.</li>
        <li>Repeat until <strong>low &lt;= high</strong>.</li>
        <li>If the target element is not found, return -1.</li>
      </ol>

      <h2 className="text-2xl font-semibold mb-2">Algorithm</h2>
      <pre className="border border-gray-800 p-4 rounded mb-4">
        <code>
          1. Initialize low = 0 and high = n-1 (where n is the size of the array).
          <br />
          2. While low &lt;= high:
          <br />
          3.   mid = low + (high - low) / 2
          <br />
          4.   If arr[mid] == target, return mid.
          <br />
          5.   If arr[mid] &gt; target, set high = mid - 1.
          <br />
          6.   If arr[mid] &lt; target, set low = mid + 1.
          <br />
          7. If the element is not found, return -1.
        </code>
      </pre>

      
      <h2 className="text-2xl font-semibold mb-2">Time Complexity</h2>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Best Case:</strong> O(1) → When the target is found at the middle in the first comparison.</li>
        <li><strong>Average Case:</strong> O(log n) → The search space halves after each comparison.</li>
        <li><strong>Worst Case:</strong> O(log n) → When the target element is not found after several halving steps.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Space Complexity</h2>
      <p className="mb-4">O(1) → Binary Search operates in constant space as it only requires a few pointers.</p>
      <h3 className="text-2xl font-semibold mb-2"> Applications</h3>
      <ul className="list-disc pl-5 mb-4 space-y-1">
        <li>Searching in a sorted array efficiently (O(log n)).</li>
        <li>Used in database indexing with B-trees and B+ trees.</li>
        <li>Helpful in debugging (e.g., finding first failing test case).</li>
        <li>Finding lower/upper bounds or the first/last occurrence of an element.</li>
        <li>Solving optimization problems using search space techniques.</li>
        <li>Quick spatial queries in game development.</li>
        <li>Built into standard libraries (e.g., Python's <code>bisect</code>, Java's <code>binarySearch()</code>).</li>
      </ul>

      {/* Disadvantages */}
      <h3 className="text-2xl font-semibold mb-2">Disadvantages</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Requires the array to be sorted.</li>
        <li>Less efficient for small or unsorted datasets.</li>
        <li>Not suitable for data structures like linked lists.</li>
        <li>Implementation can be tricky for edge cases (e.g., lower/upper bounds).</li>
        <li>Risk of integer overflow in some languages when calculating mid index.</li>
      </ul>
    
      <LanguageToggle selectedLanguage={selectBinary} setSelectedLanguage={setSelectBinary} codeSnippets={BinarySearchCode} />
    </div>
  );
};

export default BinarySearchPage;
