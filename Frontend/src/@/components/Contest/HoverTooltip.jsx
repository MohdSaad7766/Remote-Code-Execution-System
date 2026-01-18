// HoverTooltip.jsx
import React from "react";

const HoverTooltip = ({ label, shortcuts = [] }) => {
  return (
    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 z-50">
      <div className="relative bg-zinc-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg">
        <div className="text-center font-medium mb-1">{label}</div>
        {shortcuts.length > 0 && (
          <div className="flex justify-center gap-1">
            {shortcuts.map((key, i) => (
              <kbd
                key={i}
                className="px-2 py-0.5 border border-white/40 rounded text-xs"
              >
                {key}
              </kbd>
            ))}
          </div>
        )}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-3 h-3 bg-zinc-900 rotate-45"></div>
      </div>
    </div>
  );
};

export default HoverTooltip;
