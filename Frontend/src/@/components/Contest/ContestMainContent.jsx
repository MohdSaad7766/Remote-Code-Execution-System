import React, { useState } from 'react';
// import ContestNavbar from './ContestNavbar';
// import ProblemStatement from './ProblemStatement';
// import ContestCodeSection from './ContestCodeSection';
// import Submission from '../ProblemStatement/submission';
import { Link, Links } from 'react-router-dom';

export default function ContestMainContent({ handleTimeEnd }) {
  // const [activeTab, setActiveTab] = useState("description");
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  // const handleTabClick = (tab) => {
  //   setActiveTab(tab);
  // };

  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };

  // return (
  //   <div className="relative h-screen bg-black flex">

  //     {/* Toggle Button (top-left corner) */}
  //     <button
  //       onClick={toggleSidebar}
  //       className="absolute top-4 left-1 float-end z-50 text-white font-semibold px-3 py-1 rounded"
  //     >
  //       {sidebarOpen ? 'X' : '☰'}
  //     </button>

  //     {/* Sidebar */}
  //     <div
  //       className={`fixed top-0 left-0 h-full w-64 bg-black z-40 shadow-lg transform transition-transform duration-300 ${
  //         sidebarOpen ? 'translate-x-0' : '-translate-x-full'
  //       }`}
  //     >
  //       <div className="p-6 text-white">
  //         <h2 className="text-xl font-bold"> Problem Title</h2>
  //         <div className='text-lg mt-8 mb-4'>
  //         <Link> 1. Two sum</Link>
  //         </div>
  //         <div>
  //           <Link> 3. duplicated number</Link>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Main Content */}
  //     <div className="flex flex-col flex-1 w-full overflow-auto">
  //       <ContestNavbar
  //         handleTimeEnd={handleTimeEnd}
  //         activeTab={activeTab}
  //         handleTabClick={handleTabClick}
  //       />

  //       {activeTab === "description" && <ProblemStatement />}
  //       {activeTab === "submission" && <Submission />}
  //     </div>

  //     {/* Code Editor Panel */}
  //     <ContestCodeSection />
  //   </div>
  // );
}
