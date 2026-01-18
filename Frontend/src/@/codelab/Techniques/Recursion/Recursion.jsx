import React from 'react';
import { useState } from 'react';
import LanguageToggle from '../../../LanguageToggle/LanguageToggle';
import SumOfNaturalNumbersCode from '../../../LanguageToggle/LanguageCode/Techniques/SumOfNaturalNumbersCode';
import FactorialCode from '../../../LanguageToggle/LanguageCode/Techniques/FactorialCode';

const Recursion = () => {
    const [selectSum,setSelectSum] = useState("Java");
    const [selectFactorial,setSelectFactorial] = useState("Java");
  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold mb-6">Recursion</h2>

      <p className="mb-6 leading-relaxed">
        The process in which a function calls itself directly or indirectly is called <strong>recursion</strong>, and the corresponding function is known as a <strong>recursive function</strong>.
        A recursive algorithm incrementally approaches the solution by repeatedly calling itself. Every recursive process must include a <strong>base case</strong> to terminate the execution and avoid infinite recursion.
      </p>

      <h3 className="text-2xl font-semibold mb-3">Why Use Recursion?</h3>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Facilitates logical problem-solving through structured thinking.</li>
        <li>Underpins key paradigms such as Dynamic Programming and Divide & Conquer.</li>
        <li>Ideal for problems like Tower of Hanoi, tree traversals, and depth-first search in graphs.</li>
      </ul>

      <h3 className="text-2xl font-semibold mb-3">Steps to Solve a Problem Using Recursion</h3>
      <ol className="list-decimal pl-6 mb-6 space-y-2">
        <li><strong>Define a base case:</strong> Identify a minimal scenario to terminate recursion.</li>
        <li><strong>Define a recursive case:</strong> Break the problem into smaller instances of itself.</li>
        <li><strong>Ensure termination:</strong> The recursion must approach the base case eventually.</li>
        <li><strong>Combine results:</strong> Merge subproblem solutions to solve the original problem.</li>
      </ol>

      <h3 className="text-2xl font-semibold mb-3">Example 1: Sum of Natural Numbers</h3>
      <div className="mb-6">
        <p className="mb-2 font-medium">Approach 1 – Iterative:</p>
        <pre className=" border-l-2 text-sm p-4 rounded-md overflow-x-auto">
          <code>f(n) = 0 + 1 + 2 + 3 + … + n</code>
        </pre>
      </div>

      <div className="mb-10">
        <p className="mb-2 font-medium">Approach 2 – Recursive:</p>
        <pre className=" border-l-2  text-sm p-4 rounded-md overflow-x-auto">
          <code>{`f(n) = 0               if n == 0
f(n) = n + f(n - 1)     if n >= 1`}</code>
        </pre>
      </div>
      <div>
        <h2 className="mt-4 mb-4 text-2xl font-semibold">Represetation of Sum of Natural Number with Recursion</h2>
        <LanguageToggle selectedLanguage={selectSum} setSelectedLanguage={setSelectSum} codeSnippets={SumOfNaturalNumbersCode} />
      </div>
        {/* example 2 */}
        <h3 className="text-2xl font-semibold mb-3">Example 2: Factorial of a Number</h3>
<div className="mb-6">
  <p className="mb-2 font-medium">Approach 1 – Iterative (Conceptual):</p>
  <pre className=" border-l-2  text-sm p-4 rounded-md overflow-x-auto">
    <code>f(n) = 1 × 2 × 3 × … × n</code>
  </pre>
</div>

<div className="mb-10">
  <p className="mb-2 font-medium">Approach 2 – Recursive:</p>
  <pre className=" text-sm p-4 border-l-2 rounded-md overflow-x-auto">
    <code>{`f(n) = 1               if n == 0
f(n) = n * f(n - 1)     if n >= 1`}</code>
  </pre>
</div>

<div>
  <h2 className="mt-4 mb-4 text-2xl font-semibold">Implimentation of Factorial using Recursion</h2>
  <LanguageToggle
    selectedLanguage={selectFactorial}
    setSelectedLanguage={setSelectFactorial}
    codeSnippets={FactorialCode}
  />
</div>





      <h3 className="text-2xl font-semibold  mb-3">Difference Between Iteration and Recursion</h3>
      <table className="table-auto w-full border border-gray-300 mb-8 text-sm">
        <thead >
          <tr>
            <th className="border px-4 py-2 font-medium">Aspect</th>
            <th className="border px-4 py-2 font-medium">Iteration</th>
            <th className="border px-4 py-2 font-medium">Recursion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Definition</td>
            <td className="border px-4 py-2">Repeats a block of code using loops</td>
            <td className="border px-4 py-2">Function calls itself to solve subproblems</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Termination</td>
            <td className="border px-4 py-2">Loop condition fails</td>
            <td className="border px-4 py-2">Base case is met</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Memory Usage</td>
            <td className="border px-4 py-2">Constant memory</td>
            <td className="border px-4 py-2">Stack memory for each call</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Performance</td>
            <td className="border px-4 py-2">Usually faster</td>
            <td className="border px-4 py-2">Can be slower due to overhead</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Ease of Use</td>
            <td className="border px-4 py-2">Simple for repetitive tasks</td>
            <td className="border px-4 py-2">Suitable for complex structures</td>
          </tr>
        </tbody>
      </table>

      <h3 className="text-2xl font-semibold  mb-3">Advantages of Recursion</h3>
      <ul className="list-disc pl-6 mb-6  space-y-2">
        <li>Produces cleaner and more concise code.</li>
        <li>Best suited for inherently recursive problems.</li>
        <li>Enhances logical and structured problem-solving skills.</li>
        <li>Reduces code complexity in some scenarios.</li>
      </ul>

      <h3 className="text-2xl font-semibold mb-3">Disadvantages of Recursion</h3>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Consumes more memory due to call stack maintenance.</li>
        <li>May cause stack overflow in deep recursions.</li>
        <li>Slower execution due to recursive call overhead.</li>
        <li>Harder to trace and debug for beginners.</li>
      </ul>

      <h3 className="text-2xl font-semibold mb-3">Real Applications of Recursion</h3>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Tree and Graph Traversal:</strong> Ideal for traversing hierarchical data (e.g., binary trees, DFS).</li>
        <li><strong>Sorting Algorithms:</strong> Recursion powers efficient sorts like Merge Sort and Quick Sort.</li>
        <li><strong>Divide-and-Conquer:</strong> Recursion helps break down large problems into manageable parts.</li>
        <li><strong>Fractal Generation:</strong> Recursive logic generates self-similar structures like the Mandelbrot set.</li>
        <li><strong>Backtracking:</strong> Used in solving constraint satisfaction problems like Sudoku or N-Queens.</li>
        <li><strong>Memoization:</strong> Caches intermediate recursive results in dynamic programming.</li>
      </ul>

      <h3 className="text-2xl font-semibold mb-3">Problems with Recursion</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Stack Overflow:</strong> Deep recursion may exceed the stack limit.</li>
        <li><strong>Performance Overhead:</strong> Repeated function calls can slow down execution.</li>
        <li><strong>Debugging Complexity:</strong> Tracing recursive calls can be challenging.</li>
        <li><strong>Increased Memory Usage:</strong> Each recursive call consumes stack memory.</li>
        <li><strong>Base Case Dependency:</strong> Improper base conditions can lead to infinite recursion.</li>
      </ul>
    </div>
  );
};

export default Recursion;
