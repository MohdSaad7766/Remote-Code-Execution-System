import React from "react";
import { Link } from "react-router-dom";
import DSAImg from "../../components/DsaImg/DSAImg";
import Animation from "../Animation";
const LinkedListBasics = () => {
  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Linked List Basics</h1>

      {/* Introduction */}
      <section className="mb-8">
        <p className=" leading-7 mb-4">
          A <span className="font-semibold ">linked list</span> is a fundamental data structure in computer science. It is essentially a chain of nodes, where each node contains information such as data and a pointer to the next node in the chain.
        </p>
        <p className=" leading-7 mb-4">
          Unlike arrays, linked list elements are <span className="font-semibold">not stored at contiguous memory locations</span>. The list is maintained using a <span className="font-semibold ">head pointer</span>, which points to the first element. If the list is empty, this head pointer points to <span className="italic">null</span>.
        </p>
      </section>

      {/* Comparison */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-8">Linked List vs Array</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-lg border border-gray-800 ">
            <h3 className="text-xl font-semibold mb-2 ">Linked List</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Non-contiguous data structure</li>
              <li>Memory is allocated one node at a time</li>
              <li>Efficient insertion and deletion</li>
              <li>Sequential access only</li>
            </ul>
          </div>
          <div className="p-4  rounded-lg border border-gray-800">
            <h3 className="text-xl font-semibold mb-2 ">Array</h3>
            <ul className="list-disc list-inside  space-y-1">
              <li>Contiguous data structure</li>
              <li>Memory allocated for the entire array at once</li>
              <li>Inefficient insertion and deletion</li>
              <li>Allows random access</li>
            </ul>
          </div>
        </div>
      </section>
       
      <DSAImg src="../img/LinkedList/linkedlist.png" alt="LinkedList" />
      {/* Terminologies */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold  mb-4">Basic Terminologies</h2>
        <ul className="list-disc list-inside  space-y-2">
          <li>
            <span className="font-bold ">Head:</span> A pointer or reference to the first node of the linked list. It marks the beginning of the list.
          </li>
          <li>
            <span className="font-bold ">Node:</span> Each node contains two parts: data and the next pointer.
          </li>
          <li>
            <span className="font-bold">Data:</span> Stores the information held by the node.
          </li>
          <li>
            <span className="font-bold">Next pointer:</span> A reference that points to the next node in the list.
          </li>
        </ul>
      </section>

      {/* Importance */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold  mb-4">Importance of Linked List</h2>
        <ul className="list-disc list-inside  space-y-2">
          <li>
            <span className="font-bold">Dynamic Data Structure:</span> Memory can be allocated or de-allocated at runtime based on insertion or deletion.
          </li>
          <li>
            <span className="font-bold">Ease of Insertion/Deletion:</span> Elements don't need to be shifted; just pointers need to be updated.
          </li>
          <li>
            <span className="font-bold">Efficient Memory Utilization:</span> Size dynamically adjusts as per requirements, minimizing memory waste.
          </li>
          <li>
            <span className="font-bold">Implementation:</span> Advanced data structures like stacks, queues, graphs, and hash maps can be implemented using linked lists.
          </li>
        </ul>
      </section>

      {/* Types of Linked List */}
      <section>
        <h2 className="text-2xl font-semibold  mb-4">Types of Linked List</h2>
        <ul className="list-disc list-inside  space-y-2">
  <li>
    <Link to="/dsa/linked-lists/singly-linked-list" className="hover:underline">
      Singly Linked List
    </Link>
  </li>
  <li>
    <Link to="/dsa/linked-lists/doubly-linked-list" className="hover:underline">
      Doubly Linked List
    </Link>
  </li>
  
</ul>
      </section>
    </div>
  );
};

export default LinkedListBasics;
