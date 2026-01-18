import { useState } from 'react';
import React from 'react';
import Sidebar from '../../@/components/DSA/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Footer from "../../@/components/Footer/Footer";

export default function LayoutDsa() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex z-10 bg-gray-900 text-white ">
          <Sidebar isOpen={isSidebarOpen} />
        </div>
        <div className="flex-1 bg-black text-white pl-10">
          <div className='h-full lg:ml-80 lg:h-auto lg:mr-15'>
          <Outlet />
          </div>
          
        </div>

       </div>
    </>
  );
}
