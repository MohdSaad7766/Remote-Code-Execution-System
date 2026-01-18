// ArrayApplications.js
import React from 'react';

function ArrayApplications() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mt-10 mb-4">Applications of Array Data Structure</h2>
      <p className="mb-2">Arrays mainly have advantages like random access and cache friendliness over other data structures that make them useful.</p>
      <p className="mb-4">Below are some applications of arrays:</p>
      <ul className="list-disc ml-6 space-y-2">
        <li><strong>Storing and accessing data:</strong> Arrays store elements in a specific order and allow constant-time O(1) access to any element.</li>
        <li><strong>Searching:</strong> If data in array is sorted, we can search an item in O(log n) time. We can also find floor(), ceiling(), kth smallest, kth largest, etc efficiently.</li>
        <li><strong>Matrices:</strong> Two-dimensional arrays are used for matrices in computations like graph algorithms and image processing.</li>
        <li><strong>Implementing other data structures:</strong> Arrays are used as the underlying data structure for implementing stacks and queues.</li>
        <li><strong>Dynamic programming:</strong> Dynamic programming algorithms often use arrays to store intermediate results of subproblems in order to solve a larger problem.</li>
        <li><strong>Data Buffers:</strong> Arrays serve as data buffers and queues, temporarily storing incoming data like network packets, file streams, and database results before processing.</li>
      </ul>
    </div>
  );
}

export default ArrayApplications;
