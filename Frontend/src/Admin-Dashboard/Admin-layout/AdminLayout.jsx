import { Outlet } from "react-router-dom";
import {useState} from "react";
import { Menu, X } from 'lucide-react';
import AdminSidebar from "../AdminSidebar";


export default function AdminLayout() {
   const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
   
  return (
<div className="flex-col min-h-screen bg-black dark:bg-gray-900">
  <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
  <div className="flex justify-between items-center mt-8 md:ml-70 mb-6">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
            >
              <Menu />
            </button>
            
          </div>
          <div>
            <Outlet />
          </div>
          

</div>
   
  );
}