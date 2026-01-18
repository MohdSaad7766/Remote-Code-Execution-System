import React, { useEffect, useState } from "react";
import ContestOverlay from "./ContestOverlay";
import ContestMainContent from "./ContestMainContent";
import Sidebar from "../DSA/Sidebar/Sidebar"

export default function ContestStat() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const [countdown, setCountdown] = useState(null);
  const [forceFullscreen, setForceFullscreen] = useState(true);

  const enterFullScreen = () => { 
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };
  const exitFullScreen = () => { if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.webkitExitFullscreen();
  } };

  const handleTimeEnd = () => {
    setForceFullscreen(false);
    exitFullScreen();
    alert("Time's up! Contest ended.");
    setShowModal(false);
  };

  const handleSubmitContest = () => {
    setForceFullscreen(false);
    exitFullScreen();
    alert("Contest submitted!");
    setShowModal(false);
  };

  const handleStart = () => {
    setCountdown(3);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  useEffect(() => { if (countdown === null) return;

    if (countdown === 0) {
      enterFullScreen();
      setShowOverlay(false);
      setCountdown(null);
    } else {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }}, [countdown]);
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && forceFullscreen) {
        // If exited fullscreen unexpectedly, re-enter
        enterFullScreen();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [forceFullscreen]);

  if (!showModal) return null;

  return (
    <div className="flex flex-wrap w-full">
      
      {showOverlay ? (
        <ContestOverlay countdown={countdown} handleCancel={handleCancel} handleStart={handleStart} />
      ) : (
        <ContestMainContent handleTimeEnd={handleTimeEnd} />
      )}
    </div>
  );
}
