import React, { useState } from 'react';

function SchedulePopup({ schedule, onClose, onAddSchedule }) {
  const [newEvent, setNewEvent] = useState({
    date: '',
    time: '',
    description: '',
  });

  const handleAddSchedule = () => {
    const { date, time, description } = newEvent;
    if (date.trim() && time.trim() && description.trim()) {
      onAddSchedule(newEvent); // Call parent function to add schedule
      setNewEvent({ date: '', time: '', description: '' }); // Clear inputs
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

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

        {/* Add Schedule Form */}
        <div className="space-y-2 mb-4">
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleChange}
            placeholder="Date"
            className="w-full px-3 py-2 border rounded-md text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400"
          />
          <input
            type="time"
            name="time"
            value={newEvent.time}
            onChange={handleChange}
            placeholder="Time"
            className="w-full px-3 py-2 border rounded-md text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400"
          />
          <input
            type="text"
            name="description"
            value={newEvent.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-3 py-2 border rounded-md text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400"
          />
          <button
            onClick={handleAddSchedule}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
          >
            Add Schedule
          </button>
        </div>

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

export default SchedulePopup;
