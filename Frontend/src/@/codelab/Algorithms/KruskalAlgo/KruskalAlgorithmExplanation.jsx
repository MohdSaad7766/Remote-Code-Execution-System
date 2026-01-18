import React,{useState} from 'react';
import KruskalCode from '../../../LanguageToggle/LanguageCode/kruskal';
import LanguageToggle from '../../../LanguageToggle/LanguageToggle';
import Animation from '../../Animation';

const KruskalAlgorithmExplanation = () => {
   const [selectKruskal,setSelectkruskal] = useState("Java");
  return (
    <div className="relative h-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Kruskal's Algorithm</h2>

      <p className="mb-6 leading-relaxed">
        Kruskal’s Algorithm is a Greedy algorithm used to find the Minimum Spanning Tree (MST) of a connected, weighted, undirected graph. Unlike Prim’s algorithm, which builds the MST by adding vertices, Kruskal’s algorithm builds the MST by adding edges in increasing order of their weight.
      </p>

      <h3 className="text-2xl font-semibold mb-3">Working of Kruskal’s Algorithm</h3>
      <p className="mb-6 leading-relaxed">
        <strong>Step 1:</strong> Sort all the edges of the graph in non-decreasing order of their weight.<br />
        <strong>Step 2:</strong> Pick the smallest edge. Check if it forms a cycle with the MST formed so far.<br />
        <strong>Step 3:</strong> If it doesn’t form a cycle, include it in the MST.<br />
        <strong>Step 4:</strong> Otherwise, discard it.<br />
        <strong>Step 5:</strong> Repeat steps 2–4 until there are (V-1) edges in the MST.
      </p>

      <h3 className="text-2xl font-semibold mb-3">How to Implement Kruskal’s Algorithm</h3>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Sort all the edges in ascending order based on their weight.</li>
        <li>Use a Disjoint Set Union (DSU) or Union-Find structure to detect cycles efficiently.</li>
        <li>For each edge, check whether the current edge creates a cycle using DSU.</li>
        <li>If it doesn’t form a cycle, add that edge to the MST.</li>
        <li>Continue this process until MST has (V-1) edges.</li>
      </ul>

      <h2 className="font-semibold text-white text-2xl mt-8 ">Implemetation of Kruskal Algorithm</h2> 
      <LanguageToggle selectedLanguage={selectKruskal} setSelectedLanguage={setSelectkruskal}  codeSnippets={KruskalCode} />

      <h3 className="text-2xl font-semibold mb-3">Advantages and Disadvantages of Kruskal’s Algorithm</h3>

      <h4 className="text-xl font-semibold mb-2">Advantages:</h4>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>It is easier to implement, especially when the graph is sparse.</li>
        <li>Works well with edge list representations of graphs.</li>
        <li>Efficient with Disjoint Set Union (DSU) data structure (time complexity of O(E log E)).</li>
      </ul>

      <h4 className="text-xl font-semibold mb-2">Disadvantages:</h4>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Sorting all edges upfront can be costly in terms of time for very large graphs.</li>
        <li>It does not work directly on disconnected graphs unless modified to find a Minimum Spanning Forest.</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-12 mb-6">Properties of Minimum Spanning Tree (MST)</h3>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Uniqueness:</strong> The MST is unique if all edge weights are distinct. If edge weights are the same, there may be multiple MSTs.</li>
        <li><strong>Connectivity:</strong> The MST connects all the vertices in the graph, ensuring there is no isolated vertex.</li>
        <li><strong>Weight:</strong> The sum of the weights of the edges in the MST is the minimum possible sum compared to any other spanning tree.</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-12 mb-6">Cycle Detection in Kruskal’s Algorithm</h3>
      <p className="mb-6 leading-relaxed">
        Kruskal’s algorithm avoids forming cycles in the MST by using the <strong>Disjoint Set Union (DSU)</strong> data structure. The DSU helps efficiently determine whether two vertices are already connected in the current MST. If they are, adding an edge would create a cycle.
      </p>

      <h3 className="text-2xl font-semibold mt-12 mb-6">Kruskal's vs Prim's Algorithm</h3>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Prim's:</strong> Best suited for dense graphs where there are a large number of edges.</li>
        <li><strong>Kruskal's:</strong> More efficient for sparse graphs, where there are fewer edges compared to the number of vertices.</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-12 mb-6">Practical Use Cases for Kruskal’s Algorithm</h3>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Network Design:</strong> Kruskal’s algorithm can be used to design a minimal cost network by determining the least expensive way to connect all the nodes (routers, servers, etc.) in a network.</li>
        <li><strong>Cluster Analysis:</strong> In machine learning, Kruskal’s algorithm can help cluster data points in a way that minimizes the distance between clusters.</li>
        <li><strong>Electrical Circuit Design:</strong> It helps in creating circuits where the total cost of wiring between points (nodes) is minimized.</li>
      </ul>
    </div>
  );
};

export default KruskalAlgorithmExplanation;
