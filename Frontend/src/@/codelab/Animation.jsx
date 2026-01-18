import React from "react";
export default function Animation({file,title}) {
    
      const handleClick = () => {
    window.open(`/${file}`, "_blank"); // open in new tab
  };

  return (
    <div>
      <button onClick={handleClick} className="border-2 border-blue-500 text-blue-500 px-6 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300">Animation</button>
    </div>
  );
   
}