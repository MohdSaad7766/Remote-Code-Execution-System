import { NavLink, useNavigate } from "react-router-dom";
import {
  FileText,
  Users,
  BarChart,
  BookText,
  TimerReset,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => setIsMobile(window.innerWidth < 768);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md transition font-medium ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-white hover:text-blue-400 hover:bg-blue-800/30"
    }`;

  return (
    <div className="dark:bg-black text-white flex md:flex-row">
      {/* Sidebar */}
      <aside
        className={`bg-[#111] shadow-lg p-5 w-64 fixed md:top-0 md:left-0 h-screen z-30 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Header with toggle */}
        <div className="flex justify-between items-center">
          
            <h2 className="text-xl font-bold text-blue-400">DSA CodeLab</h2>
          
          <button
            onClick={isMobile ? toggleSidebar : toggleCollapse}
            className="text-white p-1 rounded hover:bg-gray-700 transition"
          >
            {isMobile ? <X /> : ''}
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-3 mt-10 text-sm">
          <NavLink to="/admin/dashboard" className={linkClasses}>
            <FileText className="w-5 h-5" />
            {"Dashboard"}
          </NavLink>

          <NavLink to="/admin/problems" className={linkClasses}>
            <BookText className="w-5 h-5" />
            {"Problems"}
          </NavLink>

          <NavLink to="/admin/contests" className={linkClasses}>
            <TimerReset className="w-5 h-5" />
            {"Contests"}
          </NavLink>

          <NavLink to="/admin/users" className={linkClasses}>
            <Users className="w-5 h-5" />
            {"Users"}
          </NavLink>

          <NavLink to="/submissions" className={linkClasses}>
            <BarChart className="w-5 h-5" />
            {"Submissions"}
          </NavLink>

          <button
            onClick={logout}
            className="flex items-center gap-3 text-red-400 hover:text-red-600 mt-2 w-full px-3 py-2 transition"
          >
            <LogOut className="w-5 h-5" />
            {"Logout"}
          </button>
        </nav>
      </aside>
    </div>
  );
}
