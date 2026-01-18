import React from "react";
export default function MainContainer({ children }) {
    {/* Main Content */}
    return (
      <div className="flex-1 p-6 ml-0 md:ml-[280px] mt-16">
        {children}
      </div>
    );
    
}