import React from 'react';
import Animation from '../../Animation';
import LanguageToggle from '../../../LanguageToggle/LanguageToggle';
import PrimsCode from '../../../LanguageToggle/LanguageCode/prims';

const PrimsAlgorithmExplanation = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState("Java");
  return (
    <div className="relative h-auto p-8">
      <header className='pb-3.5 flex justify-between align-middle'>
              <h1 className="text-3xl font-bold">Prim's Algorithm</h1>
               
                <Animation file="primsCode.html" title="Prim's Algorithm"/>
            
            </header>

      <p className="mb-6 leading-relaxed">
        Prim’s algorithm is a Greedy algorithm like Kruskal’s algorithm. This algorithm always starts with a single node and moves through several adjacent nodes, in order to explore all of the connected edges along the way.
      </p>

      <h3 className="text-2xl font-semibold mb-3">Working of Prim’s Algorithm</h3>
      <p className="mb-6 leading-relaxed">
        <strong>Step 1:</strong> Determine an arbitrary vertex as the starting vertex of the MST.<br />
        <strong>Step 2:</strong> Follow steps 3 to 5 till there are vertices that are not included in the MST (known as fringe vertex).<br />
        <strong>Step 3:</strong> Find edges connecting any tree vertex with the fringe vertices.<br />
        <strong>Step 4:</strong> Find the minimum among these edges.<br />
        <strong>Step 5:</strong> Add the chosen edge to the MST. Since we consider only the edges that connect fringe vertices with the rest, we never get a cycle.<br />
        <strong>Step 6:</strong> Return the MST and exit.
      </p>

      <h3 className="text-2xl font-semibold mb-3">How to Implement Prim’s Algorithm</h3>
      <p className="mb-6 leading-relaxed">
        Follow the given steps to utilize the Prim’s Algorithm for finding MST of a graph:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Create a set <strong>mstSet</strong> that keeps track of vertices already included in MST.</li>
        <li>Assign a key value to all vertices in the input graph. Initialize all key values as INFINITE. Assign the key value as 0 for the first vertex so that it is picked first.</li>
        <li>While mstSet doesn’t include all vertices:</li>
        <ul className="list-disc pl-6 space-y-2">
          <li>Pick a vertex u that is not there in mstSet and has a minimum key value.</li>
          <li>Include u in the mstSet.</li>
          <li>Update the key value of all adjacent vertices of u. For every adjacent vertex v, if the weight of edge u-v is less than the previous key value of v, update the key value as the weight of u-v.</li>
        </ul>
      </ul>

      <p className="mb-6 leading-relaxed">
        The idea of using key values is to pick the minimum weight edge from the cut. The key values are used only for vertices that are not yet included in MST, and indicate the minimum weight edges connecting them to the set of vertices included in MST.
      </p>
      
      <h2 className="font-semibold text-white text-2xl mt-8">Implementation of Prim's Algorithm</h2>
      <LanguageToggle selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} codeSnippets={PrimsCode} />
      


      <h3 className="text-2xl font-semibold mb-3">Advantages and Disadvantages of Prim’s Algorithm</h3>
      <h4 className="text-xl font-semibold mb-2">Advantages:</h4>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Prim’s algorithm is guaranteed to find the MST in a connected, weighted graph.</li>
        <li>It has a time complexity of O((E+V) * log(V)) using a binary heap or Fibonacci heap, where E is the number of edges and V is the number of vertices.</li>
        <li>It is a relatively simple algorithm to understand and implement compared to some other MST algorithms.</li>
      </ul>

      <h4 className="text-xl font-semibold mb-2">Disadvantages:</h4>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Prim’s algorithm can be slow on dense graphs with many edges, as it requires iterating over all edges at least once.</li>
        <li>It relies on a priority queue, which can take up extra memory and slow down the algorithm on very large graphs.</li>
        <li>The choice of starting node can affect the MST output, which may not be desirable in some applications.</li>
      </ul>
    </div>
  );
};

export default PrimsAlgorithmExplanation;
