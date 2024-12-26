import React from 'react';

function WinnerPopup({ winners, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 sm:p-6">
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">🏆 Winners List</h2>
        {/* winner adding */}
        <ul className="list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          {winners.length > 0 ? (
            winners.map((winner, index) => (
              <li key={index}>{winner}</li>
            ))
          ) : (
            <li>No winners available!</li>
          )}
        </ul>

        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm sm:text-base"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default WinnerPopup;
