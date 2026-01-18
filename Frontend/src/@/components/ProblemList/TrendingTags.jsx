import React from 'react';

const tags = [
  { name: "Array", count: 1200 },
  { name: "HashMap", count: 980 },
  { name: "Binary Tree", count: 870 },
  { name: "Graph", count: 750 },
  { name: "Backtracking", count: 660 },
  { name: "Greedy", count: 590 },
  { name: "Recursion", count: 530 },
  { name: "Dynamic Programming", count: 490 },
  { name: "Heap", count: 410 },
  { name: "Sliding Window", count: 390 },
  { name: "Queue", count: 320 },
  { name: "Stack", count: 300 },
  { name: "Two Pointers", count: 260 },
  { name: "Union Find", count: 180 },
  { name: "Trie", count: 160 },
  { name: "Matrix", count: 140 },
  { name: "Bit Manipulation", count: 120 },
  { name: "DFS", count: 110 },
  { name: "BFS", count: 100 },
  { name: "Linked List", count: 90 }
];

export default function TrendingTags() {
  return (
    <div className="fixed top-20 right-4 w-60 text-white border border-gray-800 p-4 rounded-lg shadow-md h-[40vh] flex flex-col bg-[#1a1a1a] z-50">
      <h2 className="text-xl font-semibold mb-4">Trending Tags</h2>

      <div className="flex-1 overflow-y-auto pr-1">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag.name}
              className="flex items-center justify-between bg-amber-100/20 text-sm px-3 py-1 rounded-full hover:bg-gray-100 hover:text-black transition"
            >
              <span className="mr-2">{tag.name}</span>
              <span className="bg-gray-400 text-white text-xs px-2 py-0.5 rounded-full">
                {tag.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
