import React from 'react'
import { useState } from 'react'
import DSAImg from '../../components/DsaImg/DSAImg'
import LanguageToggle from '../../LanguageToggle/LanguageToggle'
import GraphCode from '../../LanguageToggle/LanguageCode/GraphCode'
export default function Graph(){
    const [selectGraph,setSelectGraph] = useState("Java");
    return(
        <div className="leading-relaxed mx-auto p-8">
  <h2 className="text-4xl  font-bold mb-4">Introduction to Graphs</h2>
  <p className="mb-4">
    <strong>Graph Data Structure</strong> is a non-linear data structure consisting of vertices and edges. It is useful in fields such as social network analysis, recommendation systems, and computer networks. In the field of sports data science, graph data structure can be used to analyze and understand the dynamics of team performance and player interactions on the field.
  </p>
  <h3 className="text-2xl font-semibold mb-4">What is Graph Data Structure?</h3>
  <p className="mb-4">
    Graph is a non-linear data structure consisting of vertices and edges. The vertices are sometimes also referred to as nodes and the edges are lines or arcs that connect any two nodes in the graph. More formally a Graph is composed of a set of vertices (V) and a set of edges (E). The graph is denoted by G(V, E).
  </p>
  <p className="mb-4">
    Imagine a game of football as a web of connections, where players are the nodes and their interactions on the field are the edges. This web of connections is exactly what a graph data structure represents, and it’s the key to unlocking insights into team performance and player dynamics in sports.
  </p>
<DSAImg src="../img/Graph/graph.jpeg" alt="Graph Data Structure" />
  <h3 className="text-2xl font-semibold mb-3">Components of Graph Data Structure</h3>
  <ul className="list-disc pl-6 space-y-1 mb-4">
    <li><strong>Vertices:</strong> The fundamental units of the graph, also known as nodes.</li>
    <li><strong>Edges:</strong> Connect two nodes in the graph, can be directed or undirected, and may carry weights.</li>
  </ul>

  <h3 className="text-2xl font-semibold mb-3">Types of Graphs</h3>
  <ul className="list-disc pl-6  space-y-1 mb-4">
    <li><strong>Null Graph:</strong> No edges are present.</li>
    <li><strong>Trivial Graph:</strong> Contains only one vertex.</li>
    <li><strong>Undirected Graph:</strong> Edges have no direction.</li>
    <li><strong>Directed Graph:</strong> Edges have a specified direction.</li>
    <li><strong>Connected Graph:</strong> Every vertex is reachable from any other vertex.</li>
    <li><strong>Disconnected Graph:</strong> At least one vertex is not reachable from another.</li>
    <li><strong>Regular Graph:</strong> All vertices have the same degree.</li>
    <li><strong>Complete Graph:</strong> Each vertex has an edge to every other vertex.</li>
    <li><strong>Cycle Graph:</strong> Vertices form a single cycle, minimum degree of each vertex is 2.</li>
    <li><strong>Cyclic Graph:</strong> Contains at least one cycle.</li>
    <li><strong>Directed Acyclic Graph (DAG):</strong> A directed graph with no cycles.</li>
    <li><strong>Bipartite Graph:</strong> Vertices can be divided into two sets with no edges within the same set.</li>
    <li><strong>Weighted Graph:</strong> Edges carry weights. Can be directed or undirected.</li>
  </ul>
  <h2 className='text-2xl font-semibold mb-3' >Representation of Graph</h2>
 <LanguageToggle selectedLanguage={selectGraph} setSelectedLanguage={setSelectGraph} codeSnippets={GraphCode} />
  <h3 className="text-2xl font-semibold mb-3">Representation of Graphs</h3>
  <ul className="list-disc pl-6 space-y-1 mb-4">
    <li><strong>Adjacency Matrix:</strong> A 2D matrix representing edge weights between vertices. Space complexity is O(V^2).</li>
    <li><strong>Adjacency List:</strong> A list where each vertex has a list of connected vertices. Space efficient for sparse graphs.</li>
  </ul>

  <h3 className="text-2xl font-semibold mb-3">Applications of Graphs</h3>
  <ul className="list-disc pl-6 space-y-1">
    <li><strong>Social Networks:</strong> Model users as nodes and relationships (follows, friendships) as edges.</li>
    <li><strong>Navigation Systems:</strong> Represent roads as edges and intersections as vertices to find optimal paths.</li>
    <li><strong>Recommendation Engines:</strong> Graphs are used in collaborative filtering to find similarities.</li>
    <li><strong>Web Crawlers:</strong> Websites are nodes and hyperlinks are edges.</li>
    <li><strong>Network Routing:</strong> Analyze data transfer across a computer network.</li>
    <li><strong>Dependency Resolution:</strong> Used in package managers and compilers.</li>
    <li><strong>Scheduling Problems:</strong> Tasks as vertices and dependencies as edges, often using DAGs.</li>
    <li><strong>Games and AI:</strong> For decision trees and navigation maps.</li>
  </ul>
</div>
    )
}