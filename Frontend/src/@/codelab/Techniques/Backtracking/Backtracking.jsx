import React, { useState } from 'react';
import LanguageToggle from '../../../LanguageToggle/LanguageToggle';
// import { NQueenCode } from '../../../LanguageToggle/LanguageCode/Techniques/NQueenCode';

const Backtracking= () => {
  const [selectedNQueen,setSelectedNQueen] = useState("Java");
  return (
    <div className="p-8 leading-relaxed">
      <h2 className="text-3xl font-bold mb-6">Backtracking</h2>

      <p className="mb-6 leading-relaxed">
        Backtracking is an algorithmic technique used to solve problems incrementally by trying possible solutions and backing up when an invalid solution is reached. It's often used in constraint satisfaction problems.
      </p>

      <h3 className="text-2xl font-semibold  mb-3">Basic Terminologies</h3>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Candidate:</strong> A potential choice or element that can be added to the current solution.</li>
        <li><strong>Solution:</strong> A valid and complete configuration that satisfies all problem constraints.</li>
        <li><strong>Partial Solution:</strong> An intermediate or incomplete configuration being constructed during the backtracking process.</li>
        <li><strong>Decision Space:</strong> The set of all possible candidates or choices at each decision point.</li>
        <li><strong>Decision Point:</strong> A specific step in the algorithm where a candidate is chosen and added to the partial solution.</li>
        <li><strong>Feasible Solution:</strong> A partial or complete solution that adheres to all constraints.</li>
        <li><strong>Dead End:</strong> A dead end occurs when a partial solution cannot be extended without violating constraints.</li>
        <li><strong>Backtrack:</strong> The process of undoing previous decisions and returning to a prior decision point.</li>
        <li><strong>Search Space:</strong> Includes all possible combinations of candidates and choices.</li>
        <li><strong>Optimal Solution:</strong> The best possible solution in optimization problems.</li>
      </ul>

      <h3 className="text-2xl font-semibold  mb-3">Types of Backtracking Problems</h3>
      <p className="mb-6 leading-relaxed">
        Problems associated with backtracking can be categorized into three types:
      </p>
      <ul className="list-disc pl-6 mb-6  space-y-2">
        <li><strong>Decision Problems:</strong> Search for a feasible solution.</li>
        <li><strong>Optimization Problems:</strong> Search for the best solution.</li>
        <li><strong>Enumeration Problems:</strong> Find a set of all possible feasible solutions.</li>
      </ul>

      <h3 className="text-2xl font-semibold mb-3">How to Use Backtracking</h3>
      <p className="mb-6 leading-relaxed">
        Backtracking is applied when you need to find all or some of the solutions to a problem incrementally, trying out different options and backtracking when you reach an invalid solution.
        <br />
        The typical backtracking process involves:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Start with an empty solution and build it incrementally.</li>
        <li>At each step, choose a candidate (an option that might lead to a solution).</li>
        <li>If the candidate is valid, move forward to the next step.</li>
        <li>If you reach a dead end, backtrack by undoing the last choice and try another candidate.</li>
        <li>Repeat until a valid solution is found or all options are exhausted.</li>
      </ul>


      <h3 className="text-2xl font-semibold mb-3">Example 4: N-Queens Problem</h3>

<div className="mb-6">
  <p className="mb-2 font-medium">Approach – Conceptual:</p>
  <pre className="border border-gray-800 text-sm p-4 rounded-md overflow-x-auto">
    <code>{`1. Place one queen in each row, starting from row 0.
2. For each row, try placing a queen in each column.
3. Before placing a queen, check if the position is safe:
   - No other queen in the same column.
   - No other queen on the same diagonals.
4. If a position is safe, place the queen and move to the next row.
5. If placing the queen leads to no solution, backtrack.
6. Continue until all N queens are placed.`}</code>
  </pre>
</div>

<div className="mb-10">
  <p className="mb-2 font-medium">Approach – Recursive Backtracking:</p>
  <pre className="border border-gray-800 text-sm p-4 rounded-md overflow-x-auto">
    <code>{`solveNQueens(board, row):
  if row == N:
    print solution
    return

  for col in 0 to N - 1:
    if placing queen at (row, col) is safe:
      place queen
      solveNQueens(board, row + 1)
      remove queen (backtrack)`}</code>
  </pre>
</div>

<div>
  <h2 className="mt-4 mb-4 text-2xl font-semibold">Implimentation of N-Queens using Backtracking</h2>
  {/* <LanguageToggle
    selectedLanguage={selectedNQueen}
    setSelectedLanguage={setSelectedNQueen}
    codeSnippets={NQueenCode}
  /> */}
</div>


      <h3 className="text-2xl font-semibold mb-3">Applications of Backtracking</h3>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Creating smart bots to play Board Games such as Chess.</li>
        <li>Solving mazes and puzzles such as N-Queen problem.</li>
        <li>Network Routing and Congestion Control.</li>
        <li>Decryption.</li>
        <li>Text Justification.</li>
      </ul>

      <h3 className="text-2xl font-semibold mb-3">Time and Space Complexity</h3>
      <p className="mb-6 leading-relaxed">
        The time and space complexity of backtracking solutions depends on the specific problem. For example, in the N-Queens problem, the time complexity is approximately O(N!), as there can be N! possible ways to place the queens. The space complexity is O(N^2) due to the board representation.
      </p>

      <h3 className="text-2xl font-semibold mb-3">How Backtracking is Different from Recursion?</h3>
      <table className="w-full mb-6 text-left border border-gray-800">
        <thead>
          <tr >
            <th className="border px-4 py-2">Recursion</th>
            <th className="border px-4 py-2">Backtracking</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Does not always involve backtracking.</td>
            <td className="border px-4 py-2">Always involves recursion to explore possibilities.</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Solves sub-problems independently.</td>
            <td className="border px-4 py-2">Explores all potential solutions and backtracks on failure.</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Used in divide and conquer algorithms.</td>
            <td className="border px-4 py-2">Used in constraint satisfaction and puzzle-solving.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Backtracking;
