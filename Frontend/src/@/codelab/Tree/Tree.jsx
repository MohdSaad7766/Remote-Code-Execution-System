import { useState } from 'react';
import React  from 'react';
import TreeTerminologies from './Tree_terminology';
import LanguageToggle from '../../LanguageToggle/LanguageToggle';
import TreeDeclareCode from '../../LanguageToggle/LanguageCode/TreeDeclare';
import TreeCode from '../../LanguageToggle/LanguageCode/TreeCode'; // Import the code snippets
import DSAImg from '../../components/DsaImg/DSAImg';
export default function Tree() {
  
  const terms = [
    { title: "Parent Node", description: "The node which is an immediate predecessor of a node is called the parent node of that node. {B} is the parent node of {D, E}." },
    { title: "Child Node", description: "The node which is the immediate successor of a node is called the child node of that node. Examples: {D, E} are the child nodes of {B}." },
    { title: "Root Node", description: "The topmost node of a tree or the node which does not have any parent node is called the root node. {A} is the root node of the tree." },
    { title: "Leaf Node or External Node", description: "The nodes which do not have any child nodes are called leaf nodes. {I, J, K, F, G, H} are the leaf nodes of the tree." },
    { title: "Ancestor of a Node", description: "Any predecessor nodes on the path of the root to that node are called Ancestors of that node. {A,B} are the ancestor nodes of the node {E}." },
    { title: "Descendant", description: "A node x is a descendant of another node y if and only if y is an ancestor of x." },
    { title: "Sibling", description: "Children of the same parent node are called siblings. {D,E} are called siblings." },
    { title: "Level of a node", description: "The count of edges on the path from the root node to that node. The root node has level 0." },
    { title: "Internal node", description: "A node with at least one child is called Internal Node." },
    { title: "Neighbour of a Node", description: "Parent or child nodes of that node are called neighbors of that node." },
    { title: "Subtree", description: "Any node of the tree along with its descendant." }
  ];
  const [selectedLanguage, setSelectedLanguage] = useState("Java");
  const [selectedLanguages, setSelectedLanguages] = useState("Java");
  return (
    <div className="h-auto p-8 leading-relaxed">
      <header>
        <h1 className="text-4xl font-bold">Binary Tree</h1>
        
      </header>

      <section className="mt-4 h-auto">
        <p>
          Binary Search Tree is a data structure used in computer science for organizing and storing data in a
          sorted manner. It follows all properties of a binary tree where for every node, its left subtree contains values
          less than the node and the right subtree contains values greater than the node.
        </p>
        <DSAImg src="../img/Tree/tree.png" alt="Tree" />
        <h4 className="mt-4 font-semibold text-2xl mb-3">Properties of Binary Search Tree:</h4>
        <ul className="list-disc ml-6">
          <li>The left subtree of a node contains only nodes with keys less than the node’s key.</li>
          <li>The right subtree of a node contains only nodes with keys greater than the node’s key.</li>
          <li>The left and right subtrees must also be binary search trees.</li>
          <li>No duplicate nodes (BST may handle duplicates differently).</li>
        </ul>
        <div className="p-2">
          <h2 className="text-2xl font-semibold mt-6 mb-3.5 ">
            Types of Trees
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Binary Tree:</strong> A tree data structure where each node has at most two children (left and right).</li>
            <li><strong>Binary Search Tree (BST):</strong> A binary tree where each node follows the left  value  right property.</li>
            <li><strong>Balanced Binary Tree:</strong> A binary tree where the height difference of left and right subtree is at most 1.</li>
            <li><strong>Complete Binary Tree:</strong> All levels are fully filled except possibly the last, and all nodes are as far left as possible.</li>
            <li><strong>Full Binary Tree:</strong> Every node has 0 or 2 children.</li>
            <li><strong>Perfect Binary Tree:</strong> A binary tree in which all internal nodes have two children and all leaf nodes are at the same level.</li>
            <li><strong>AVL Tree:</strong> A self-balancing binary search tree where the difference of heights of left and right subtrees is at most one for all nodes.</li>
            <li><strong>Binary Heap:</strong> A complete binary tree used mainly for priority queues. It can be a Min Heap or Max Heap.</li>
          </ul>
        </div>
       
        
        <div className="p-2">
      <h2 className="text-2xl font-bold mt-6 text-gray-800">
        Representation of a Node in Tree Data Structure
      </h2>
      <LanguageToggle selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} codeSnippets={TreeDeclareCode} />

     
       {/* Code Display */}
       
       
     </div> 

<TreeTerminologies />
<LanguageToggle selectedLanguage={selectedLanguages} setSelectedLanguage={setSelectedLanguages} codeSnippets={TreeCode} />

        
       
        
      </section>

    </div>
  );
}