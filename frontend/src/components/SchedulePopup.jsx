import React from 'react';

function SchedulePopup({ schedule, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 sm:p-6">
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">📅 Game Schedule</h2>
        
        {/* Schedule List */}
        <ul className="space-y-3 mb-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          {schedule && schedule.length > 0 ? (
            schedule.map((event, index) => (
              <li 
                key={index} 
                className="p-2 border-b border-gray-200 dark:border-gray-700 last:border-none"
              >
                <span className="block font-semibold">{event.date}</span>
                <span className="block">{event.time}</span>
                <span className="block text-gray-600 dark:text-gray-400">{event.description}</span>
              </li>
            ))
          ) : (
            <li className="text-center">No schedule available</li>
          )}
        </ul>

        {/* Close Button */}
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

export default SchedulePopup;
