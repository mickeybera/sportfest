import React from 'react';

function WinnerPopup({ winners, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">🏆 Winners List</h2>
        <ul className="list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300">
          {winners.map((winner, index) => (
            <li key={index}>{winner}</li>
          ))}
        </ul>
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
