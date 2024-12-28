import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function WinnerPopup({ winners, onClose, onAddWinner }) {
  const [newWinner, setNewWinner] = useState('');
  const {currentUser} = useAuth();

  const handleAddWinner = () => {
    if (newWinner.trim()) {
      onAddWinner(newWinner); // Call parent function to add winner
      setNewWinner(''); // Clear input field after adding
    } else {
      alert('Please enter a winner description');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 sm:p-6">
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">🏆 Winners List</h2>
        
        {/* Winners List */}
        <ul className="list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          {winners.length > 0 ? (
            winners.map((winner, index) => (
              <li key={index}>{winner}</li>
            ))
          ) : (
            <li>No winners available!</li>
          )}
        </ul>

        {/* Add Winner Input */}
        {currentUser && <div className="flex flex-col gap-4 mb-4">
          <textarea
            value={newWinner}
            onChange={(e) => setNewWinner(e.target.value)}
            placeholder="Enter winner's details"
            rows="4"
            className="w-full px-3 py-2 border rounded-md text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400"
          />
          <button
            onClick={handleAddWinner}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
          >
            Add Winner
          </button>
        </div>}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default WinnerPopup;


