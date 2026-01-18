import React, { useState } from "react";
import LanguageToggle from "../../LanguageToggle/LanguageToggle";
import SinglyLinkedListCode from "../../LanguageToggle/LanguageCode/LinkedList/SinglyLinkedListCode"
import SinglyImpliment from "../../LanguageToggle/LanguageCode/LinkedList/SinglyImpliment";
import DSAImg from "../../components/DsaImg/DSAImg";
import Animation from "../Animation";

const SinglyLinkedList = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("Java");
    const [selectedImplement, setSelectedImplement] = useState("Java");
  return (
    <div className="w-full mx-auto p-8 leading-relaxed">
    <header className='pb-3.5 flex justify-between align-middle'>
        <h1 className="text-3xl font-bold">Singly Linked List </h1>
         
          <Animation file="linked_list.html" title="Linked List"/>
      
      </header>

    {/* Introduction */}
    <section className="mb-8">
      <p className="leading-7 mb-4">
        A singly linked list is a fundamental data structure. Each node contains a data field and a reference to the next node in the list. The last node points to <span className="italic">null</span>.
      </p>
    </section>
    

    {/* Node Structure */}
    <section className="mb-10">
      <h2 className="text-2xl font-semibold  mb-4">Understanding Node Structure</h2>
      <p className="leading-7 mb-4">
        Each node in a singly linked list contains two parts: data and a pointer to the next node. This structure allows dynamic linking of nodes.
      </p>
      <LanguageToggle selectedLanguage={selectedImplement}  setSelectedLanguage={setSelectedImplement} codeSnippets={SinglyImpliment} />
    </section>
    
    {/* Operations */}
    <section className="mb-10">
      <h2 className="text-2xl font-semibold  mb-4">Operations</h2>

      {/* Traversal */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold  mb-2">1. Traversal</h3>
        <p className=" leading-7 mb-2">
          Traversal means visiting each node to perform operations such as printing or processing.
        </p>
        <ul className="list-decimal ml-10">
          <li>Initialize a pointer (current) to the head of the list.</li>
          <li>Loop through the list until current becomes NULL.</li>
          <li>Process each node (e.g., print its data).</li>
          <li>Move to the next node by updating current = current-&gt;next.</li>
        </ul>
      </div>

      {/* Searching */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">2. Searching</h3>
        <p className=" leading-7 mb-2">
          Searching refers to looking for a specific value within the nodes of the list.
        </p>
        <ul className="list-decimal ml-10">
          <li>Start from the head of the list.</li>
          <li>Compare each node’s data with the target value.</li>
          <li>If match found, return true; else move to the next node.</li>
          <li>If end is reached, return false.</li>
        </ul>
      </div>

      {/* Length */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">3. Length</h3>
        <p className=" leading-7 mb-2">
          To find the length, count the total number of nodes in the list.
        </p>
        <ul className="list-decimal ml-10">
          <li>Initialize a counter to 0.</li>
          <li>Start from the head and traverse the list.</li>
          <li>Increment the counter for each node visited.</li>
          <li>Return the counter value when traversal ends.</li>
        </ul>
      </div>

      {/* Insertion */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold  mb-2">4. Insertion</h3>
        <div className="ml-4">
        <p className=" font-medium">a. At the Beginning:</p>
        <ul className="list-decimal ml-10  mb-2">
          <li>Create a new node with given value.</li>
          <li>Point the new node’s next to current head.</li>
          <li>Update the head to the new node.</li>
        </ul>

        <p className=" font-medium">b. At the End:</p>
        <ul className="list-decimal ml-10  mb-2">
          <li>Create a new node.</li>
          <li>If list is empty, set new node as head.</li>
          <li>Else, traverse to the last node.</li>
          <li>Set last node’s next to new node.</li>
        </ul>

        <p className="font-medium">c. At a Specific Position:</p>
        <ul className="list-decimal ml-10">
          <li>Create a new node with value.</li>
          <li>Traverse to (position - 1)th node.</li>
          <li>Set new node’s next to current’s next.</li>
          <li>Update current’s next to the new node.</li>
        </ul>
      </div>
</div>
      {/* Deletion */}
      <div>
        <h3 className="text-xl font-semibold  mb-2">5. Deletion</h3>
         <div className="ml-4">
        <p className=" font-medium">a. At the Beginning:</p>
        <ul className="list-decimal ml-10  mb-2">
          <li>Check if head is NULL. If yes, return NULL.</li>
          <li>Update head to head-&gt;next.</li>
          <li>Delete old head node.</li>
        </ul>

        <p className=" font-medium">b. At the End:</p>
        <ul className="list-decimal ml-10  mb-2">
          <li>If list is empty or only one node, delete and return NULL.</li>
          <li>Traverse to second-last node.</li>
          <li>Delete last node and set second-last node’s next to NULL.</li>
        </ul>

        <p className="font-medium">c. At a Specific Position:</p>
        <ul className="list-decimal ml-10 ">
          <li>Traverse to (position - 1)th node.</li>
          <li>Update its next pointer to skip over the target node.</li>
          <li>Delete the target node.</li>
        </ul>
      </div>
      </div>
    
        <h2 className="text-2xl font-semibold mt-4 mb-4">Code of Singly Linked-List</h2>
        <LanguageToggle selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} codeSnippets={SinglyLinkedListCode} />
      </section>
    </div>
  );
};

export default SinglyLinkedList;
