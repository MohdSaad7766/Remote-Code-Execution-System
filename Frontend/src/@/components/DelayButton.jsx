import { useState } from "react";
import LoginPopup from "./Auth/LoginPopup";

export default function DelayButton({
  bgColor = "",
  onDelayedClick = () => {},
  delay = 5000,
  label = "",
  loadingText = "Running...",
  disabled = false,
  loading = false,
  setLoading = () => {},
  className = "",
}) {
  const [detect, setDetect] = useState(false);

  const handleClick = () => {
    if (disabled) {
      setDetect(true);
    } else {
      setLoading(true);
      setTimeout(() => {
        onDelayedClick?.();
      }, delay);
    }
  };

  const handleClosePopup = () => setDetect(false);

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        className={`
          ${bgColor}
          ${loading ? "cursor-not-allowed opacity-70" : ""}
          border border-gray-800 text-white px-4 py-2 rounded flex items-center gap-2
          ${className}
        `}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            {loadingText}
          </>
        ) : (
          label
        )}
      </button>

      <LoginPopup show={detect} onClose={handleClosePopup} />
    </>
  );
}
