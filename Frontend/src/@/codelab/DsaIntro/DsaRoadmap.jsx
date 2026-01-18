import React, { useState } from "react";

const topics = [
  {
    title: "Logic Building",
    description:
      "Once you have learned basics of a programming language, it is recommended that you learn basic logic building."
  },
  {
    title: "Learn about Complexities",
    description:
      "To analyze algorithms, we mainly measure order of growth of time or space taken in terms of input size. We do this in the worst case scenario in most of the cases."
  },
  {
    title: "Array",
    description:
      "Array is a linear data structure where elements are allocated contiguous memory, allowing for constant-time access."
  },
  {
    title: "Searching Algorithms",
    description:
      "Used to locate specific data within a large set. Helps find a target value efficiently."
  },
  {
    title: "Sorting Algorithm",
    description:
      "Used to arrange elements in order, making it easier to search and access specific elements."
  },
  {
    title: "Hashing",
    description:
      "Generates fixed-size output (hash) from variable-sized input for efficient searching and insertion."
  },
  {
    title: "Two Pointer Technique",
    description:
      "Uses two indices to find a required point or value efficiently in an array."
  },
  {
    title: "Window Sliding Technique",
    description:
      "Uses result of previous subarray to compute current result efficiently."
  },
  {
    title: "Prefix Sum Technique",
    description:
      "Precomputes prefix sums to quickly find subarray results."
  },
  {
    title: "String",
    description:
      "A sequence of characters, typically immutable, and limited to specific elements."
  },
  {
    title: "Recursion",
    description:
      "A function calls itself to solve smaller instances of a problem."
  },
  {
    title: "Matrix/Grid",
    description:
      "A two-dimensional array represented in rows and columns."
  },
  {
    title: "Stack",
    description:
      "Linear structure following LIFO. Useful for managing memory and certain algorithms."
  },
  {
    title: "Queue",
    description:
      "Linear structure following FIFO. Used in scheduling and message handling."
  },
  {
    title: "Deque",
    description:
      "Double-ended queue allowing insertion and deletion from both ends."
  },
  {
    title: "Linked List",
    description:
      "Linear structure with nodes linked using pointers. Supports dynamic memory allocation."
  },
  {
    title: "Tree",
    description:
      "Hierarchical data structure with parent-child relationships. Useful in file systems, databases."
  },
  {
    title: "Heap",
    description:
      "A complete binary tree used for implementing priority queues."
  },
  {
    title: "Graph",
    description:
      "Non-linear structure of vertices and edges representing relationships."
  },
  {
    title: "Greedy Algorithm",
    description:
      "Builds solution step-by-step by choosing the most optimal local choice."
  },
  {
    title: "Dynamic Programming",
    description:
      "Breaks problems into overlapping subproblems and stores results to avoid recomputation."
  }
];

const DSARoadmap = () => {
  return (
    <section className="max-w-5xl mx-auto p-3 md:p-5">
      <h2 className="text-3xl font-bold mb-8">DSA Roadmap</h2>
      <ol className="list-decimal list-inside space-y-4">
        
        {topics.map((topic, index) => (
          <li key={index} className="p-3 font-bold ">
           { topic.title }
            <p className="text-gray-200 mt-2 font-normal">{topic.description}</p>
            
          </li>
        ))}
      </ol>
    </section>
  );
};

export default DSARoadmap;
