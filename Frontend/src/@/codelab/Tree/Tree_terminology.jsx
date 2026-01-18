import React from "react";


const TreeTerminologies = () => {
  

  return (
    <div className="p-6">
      

      <h2 className="text-2xl font-bold  mb-4">Tree Traversal Techniques</h2>
      <p>Tree traversal refers to the process of visiting each node of the tree exactly once in a specific order.</p>
      <p>There are multiple tree traversal techniques that decide the order in which the nodes of the tree are to be visited. These are defined below:</p>
<ul className="list-disc pl-6">
  <li>Depth First Search or DFS
    <ul className="list-disc pl-6 mt-3.5 mb-3.5">
      <li>Inorder Traversal</li>
      <li>Preorder Traversal</li>
      <li>Postorder Traversal</li>
    </ul>
  </li>
  <li>Level Order Traversal or Breadth First Search or BFS</li>
</ul>

<div className="traversal-section mt-5">
            <h2 className="font-bold mt-2 text-xl">Inorder Traversal</h2>
            <p>Inorder traversal visits the node in the order: Left -&gt Root -&gt Right</p>
            <div className="p-3">
                <h3 className="text-x font-bold mt-1.5 mb-1.5">Algorithm for Inorder Traversal</h3>
                <ul className="list-disc pl-6">
                    <li>Traverse the left subtree, i.e., call Inorder(left-&gt subtree).</li>
                    <li>Visit the root.</li>
                    <li>Traverse the right subtree, i.e., call Inorder(right-&gt subtree).</li>
                </ul>
            
                <h3 className="font-bold mt-1 mb-1">Uses of Inorder Traversal</h3>
                <ul className="list-disc pl-6">
                    <li>In the case of binary search trees (BST), Inorder traversal gives nodes in non-decreasing order.</li>
                    <li>To get nodes of BST in non-increasing order, a variation of Inorder traversal where Inorder traversal is reversed can be used.</li>
                    <li>Inorder traversal can be used to evaluate arithmetic expressions stored in expression trees.</li>
                </ul>
            </div>
        </div>

        <div className="traversal-section mt-3">
            <h2 className="font-bold text-xl">Preorder Traversal</h2>
            <p>Preorder traversal visits the node in the order: Root -&gt Left -&gt Right</p>
            <div className="p-3">
            <h3 className="font-bold">Algorithm for Preorder Traversal</h3>
            <ul className="list-disc pl-6">
                <li>Visit the root.</li>
                <li>Traverse the left subtree, i.e., call Preorder(left-&gt subtree).</li>
                <li>Traverse the right subtree, i.e., call Preorder(right-&gt subtree).</li>
            </ul>
            <h3 className="font-bold mt-1 mb-1">Uses of Preorder Traversal</h3>
            <ul className="list-disc pl-6">
                <li>Preorder traversal is used to create a copy of the tree.</li>
                <li>Preorder traversal is also used to get prefix expressions on an expression tree.</li>
            </ul>
            </div>
        </div>
        
        <div className="traversal-section mt-3">
            <h2 className="font-bold text-xl">Postorder Traversal</h2>
            <p>Postorder traversal visits the node in the order: Left -&gt Right -&gt Root</p>
            <div className="p-3">
            <h3 className="font-bold">Algorithm for Postorder Traversal</h3>
            <ul className="list-disc pl-6">
                <li>Traverse the left subtree, i.e., call Postorder(left-&gt subtree).</li>
                <li>Traverse the right subtree, i.e., call Postorder(right-&gt subtree).</li>
                <li>Visit the root.</li>
            </ul>
            <h3 className="font-bold mt-1 mb-1">Uses of Postorder Traversal</h3>
            <ul className="list-disc pl-6">
                <li>Postorder traversal is used to delete the tree.</li>
                <li>Postorder traversal is also useful to get the postfix expression of an expression tree.</li>
                <li>Postorder traversal can help in garbage collection algorithms, particularly in systems where manual memory management is used.</li>
            </ul>
        </div>
        </div>
        
        <div className="traversal-section mt-3">
            <h2 className="font-bold text-xl">Level Order Traversal (BFS)</h2>
            <p>Level Order Traversal visits all nodes present in the same level completely before visiting the next level.</p>
            <div className="p-3">
            <h3 className="font-bold">Algorithm for Level Order Traversal</h3>
            <ul className="list-disc pl-6">
                <li>Create an empty queue Q.</li>
                <li>Enqueue the root node of the tree to Q.</li>
                <li>Loop while Q is not empty:</li>
                <ul className="list-disc pl-6">
                    <li>Dequeue a node from Q and visit it.</li>
                    <li>Enqueue the left child of the dequeued node if it exists.</li>
                    <li>Enqueue the right child of the dequeued node if it exists.</li>
                </ul>
            </ul>
            <h3 className="font-bold">Uses of Level Order Traversal</h3>
            <ul className="list-disc pl-6">
                <li>Level-wise node processing, like finding maximum/minimum at each level.</li>
                <li>Tree serialization/deserialization for efficient storage and reconstruction.</li>
                <li>Solving problems like calculating the “maximum width of a tree” by processing nodes level by level.</li>
            </ul>
        </div>
</div>
    
    </div>
  );
};

export default TreeTerminologies;
