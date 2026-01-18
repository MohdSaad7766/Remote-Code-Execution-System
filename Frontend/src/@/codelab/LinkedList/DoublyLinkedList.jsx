import React, { useState } from "react";
import LanguageToggle from "../../LanguageToggle/LanguageToggle";
import DoublyImpliment from "../../LanguageToggle/LanguageCode/LinkedList/DoublyImpliment";
import DoublyLinkedListCode from "../../LanguageToggle/LanguageCode/LinkedList/DoublyLinkedListCode";
import DSAImg from "../../components/DsaImg/DSAImg";

const DoublyLinkedList = () => {
     const [selectedLanguage, setSelectedLanguage] = useState("Java");
    const [selectedImplement,setSelectedImplement] = useState('Java')
  return (
    <div className="w-full mx-auto p-8 leading-relaxed">
      <h1 className="text-4xl font-bold  mb-6">Doubly Linked List Operations</h1>

      {/* Introduction */}
      <section className="mb-8">
        <p className=" leading-7 mb-4">
          A doubly linked list is a type of linked list where each node contains a reference to both the next and the previous node. This allows traversal in both directions.
        </p>
        
      </section>
      <DSAImg scr="../img/LinkedList/doubly.png" alt="Doubly LinkedList" />
      {/* Node Structure */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold  mb-4">Understanding Node Structure</h2>
        <p className=" leading-7 mb-4">
          Each node in a doubly linked list has three parts: a data value, a pointer to the next node, and a pointer to the previous node.
        </p>
        <LanguageToggle selectedLanguage={selectedImplement} setSelectedLanguage={setSelectedImplement} codeSnippets={DoublyImpliment} />
      </section>

      {/* Operations */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Operations</h2>

        {/* Traversal */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">1. Forward Traversal</h3>
          <ul className="list-decimal ml-10">
            <li>Start from the head node.</li>
            <li>Follow the next pointers to visit each node.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">2. Backward Traversal</h3>
          <ul className="list-decimal ml-10">
            <li>Go to the last node (tail).</li>
            <li>Follow the previous pointers to visit nodes in reverse order.</li>
          </ul>
        </div>

        {/* Insertion */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">3. Insertion</h3>
          <div className="ml-4">
          <p className=" font-medium">a. At the Beginning:</p>
          <ul className="list-decimal ml-10 mb-2">
            <li>Create a new node.</li>
            <li>Set new node's next to current head.</li>
            <li>Set head's previous to new node.</li>
            <li>Update head to the new node.</li>
          </ul>

          <p className=" font-medium">b. At the End:</p>
          <ul className="list-decimal ml-10 mb-2">
            <li>Create a new node.</li>
            <li>Set tail's next to new node and new node's previous to tail.</li>
            <li>Update tail to the new node.</li>
          </ul>

          <p className=" font-medium">c. At a Specific Position:</p>
          <ul className="list-decimal ml-10">
            <li>Traverse to the desired position.</li>
            <li>Adjust the next and previous pointers of neighboring nodes and the new node accordingly.</li>
          </ul>
        </div>
        </div>

        {/* Deletion */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">4. Deletion</h3>
          <div className="ml-4">
          <p className=" font-medium">a. At the Beginning:</p>
          <ul className="list-decimal ml-10  mb-2">
            <li>Update head to head.next.</li>
            <li>Set new head’s previous to null.</li>
          </ul>

          <p className=" font-medium">b. At the End:</p>
          <ul className="list-decimal ml-10 mb-2">
            <li>Update tail to tail.previous.</li>
            <li>Set new tail’s next to null.</li>
          </ul>

          <p className="font-medium">c. At a Specific Position:</p>
          <ul className="list-decimal ml-10">
            <li>Traverse to the node to be deleted.</li>
            <li>Update previous node’s next to current.next.</li>
            <li>Update next node’s previous to current.previous.</li>
          </ul>
        </div>
        </div>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Representation of doubly Linked-List</h2>
        <LanguageToggle selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} codeSnippets={DoublyLinkedListCode} />
      </section>
    </div>
  );
};

export default DoublyLinkedList;
