import React from 'react';
import Button from '../Button/Button';

export default function ContestOverlay({ countdown, handleCancel, handleStart }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 shadow-md flex items-center justify-center z-50">
      {countdown !== null ? (
        <div className="text-white text-6xl font-bold animate-pulse">
          {countdown === 0 ? "Start!" : countdown}
        </div>
      ) : (
        <div className="border border-gray-800 rounded-lg p-6 w-80 text-center shadow-lg">
          <h2 className="text-2xl text-white font-semibold mb-4">Are you sure?</h2>
          <p className="text-white mb-6">Do you want to start the contest?</p>
          <div className="flex justify-evenly">
            <Button onClick={handleCancel} label="Cancel" bgColor="bg-red-500" textColor="text-white" hoverColor="hover:bg-red-600" />
            <Button onClick={handleStart} label="Start" bgColor="bg-green-500" textColor="text-white" hoverColor="hover:bg-green-600" />
          </div>
        </div>
      )}
    </div>
  );
}
