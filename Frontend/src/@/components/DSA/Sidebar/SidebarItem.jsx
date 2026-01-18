import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ text, path }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `block p-2.5 rounded-lg text-sm transition-all duration-200 ${
          isActive
            ? "bg-blue-600/10 text-blue-400 font-bold border-r-2 border-blue-500 shadow-[inset_0_0_20px_rgba(59,130,246,0.05)]"
            : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
        }`
      }
    >
      {text}
    </NavLink>
  );
};

export default SidebarItem;