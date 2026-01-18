import React  from "react";
import { useState } from "react";
import DSAImg from "../../components/DsaImg/DSAImg";
import LanguageToggle from "../../LanguageToggle/LanguageToggle";
import QueueCode from "../../LanguageToggle/LanguageCode/Queue/QueueCode";
import Animation from "../Animation";

const QueueDataStructure = () => {
  const [selectQueue,setSelectQueue] = useState("Java");
  return (
    <div className="w-full mx-auto p-8 leading-relaxed">
    <header className='pb-3.5 flex justify-between align-middle'>
        <h1 className="text-3xl font-bold">Queue Data Structure</h1>
         
          <Animation file="queue.html" title="Queue"/>
      
      </header>

    {/* Introduction */}
    <section className="mb-8">
      <p className=" leading-7 mb-4">
        Queue is a linear data structure that follows <strong>FIFO (First In First Out)</strong> Principle, so the first element inserted is the first to be popped out.
      </p>
      <p className=" leading-7 mb-4">
        <strong>FIFO Principle in Queue:</strong> FIFO Principle states that the first element added to the Queue will be the first one to be removed or processed. So, Queue is like a line of people waiting to purchase tickets, where the first person in line is the first person served. (i.e. First Come First Serve).
      </p>
    </section>
    <DSAImg src="../img/queue/queue.png" alt="Queue" />

    {/* Types of Queue */}
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Types of Queues</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Simple Queue:</strong> Follows FIFO structure. Insertion occurs at the back and deletion from the front. Efficiently implemented using a linked list or circular array.
        </li>
        <li>
          <strong>Double-Ended Queue (Deque):</strong> Insertion and deletion can be done from both ends. Types include:
          <ul className="list-disc list-inside ml-6">
            <li>
              <strong>Input Restricted Queue:</strong> Input allowed only at one end, deletion from both.
            </li>
            <li>
              <strong>Output Restricted Queue:</strong> Input from both ends, deletion from only one end.
            </li>
          </ul>
        </li>
        <li>
          <strong>Priority Queue:</strong> Elements are accessed based on assigned priority. Types include:
          <ul className="list-disc list-inside ml-6">
            <li>
              <strong>Ascending Priority Queue:</strong> Elements arranged in increasing order of priority. Smallest priority element is popped first.
            </li>
            <li>
              <strong>Descending Priority Queue:</strong> Elements arranged in decreasing order of priority. Largest priority element is popped first.
            </li>
          </ul>
        </li>
      </ul>
    </section>

    {/* Operations */}
    <div>
      <h2 className="text-2xl font-semibold">Representation of Queue</h2>
      <DSAImg src="../img/queue/queueResp.png" alt="Representation of Queue" />
    </div>
    <section className="mb-8">
      <h2 className="text-2xl font-semibold  mb-4">Queue Operations</h2>
      <ul className="list-disc list-inside  space-y-2">
        <li><strong>Enqueue:</strong> Adds an element to the end (rear) of the queue. If the queue is full, an overflow error occurs.</li>
        <li><strong>Dequeue:</strong> Removes the element from the front of the queue. If the queue is empty, an underflow error occurs.</li>
        <li><strong>Peek/Front:</strong> Returns the element at the front without removing it.</li>
        <li><strong>Size:</strong> Returns the number of elements in the queue.</li>
        <li><strong>isEmpty:</strong> Returns true if the queue is empty, otherwise false.</li>
        <li><strong>isFull:</strong> Returns true if the queue is full, otherwise false.</li>
      </ul>
    </section>

   

    {/* Applications */}
    <section>
      <h2 className="text-2xl font-semibold  mb-4">Applications of Queue Data Structure</h2>
      <p className="leading-7 mb-4">
        Application of queue is common. In a computer system, there may be queues of tasks waiting for the printer, for access to disk storage, or even in a time-sharing system, for use of the CPU. Within a single program, there may be multiple requests to be kept in a queue, or one task may create other tasks, which must be done in turn by keeping them in a queue.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>A Queue is always used as a buffer when we have a speed mismatch between a producer and consumer. For example keyboard and CPU.</li>
        <li>Queue can be used where we have a single resource and multiple consumers like a single CPU and multiple processes.</li>
        <li>In a network, a queue is used in devices such as a router/switch and mail queue.</li>
        <li>Queue can be used in various algorithm techniques like Breadth First Search, Topological Sort, etc.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-4 text-black">Queue Code</h2>
      <LanguageToggle selectedLanguage={selectQueue} setSelectedLanguage={setSelectQueue} codeSnippets={QueueCode} />
    </section>
  </div>
  );
};

export default QueueDataStructure;
