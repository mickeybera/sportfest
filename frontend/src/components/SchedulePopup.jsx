import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function SchedulePopup({ item, onClose }) {
  const { currentUser } = useAuth();
  // const [newEvent, setNewEvent] = useState({
  //   date: '',
  //   time: '',
  //   description: '',
  // });
  const [scheduleImg, setScheduleImg] = useState('');

  // const handleAddSchedule = () => {
  //   const { date, time, description } = newEvent;
  //   if (date.trim() && time.trim() && description.trim()) {
  //     onAddSchedule(newEvent); // Call parent function to add schedule
  //     setNewEvent({ date: '', time: '', description: '' }); // Clear inputs
  //     toast.success('Schedule added!');
  //   } else {
  //     toast.error('Please fill in all fields! ⚠️');
  //   }
  // };

  const handleSubmit = async () => {
    try {
      const docRef = doc(db, 'games', item.id);
      await updateDoc(docRef, { scheduleImg: scheduleImg });
      alert("Schedule added!");
    } catch (err) {
      alert(err);
    }
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 sm:p-6">
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">📅 Game Schedule</h2>

        {/* Schedule List */}
        <ul className="space-y-3 mb-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          {/* {schedule && schedule.length > 0 ? (
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
            )} */}
          {item.scheduleImg ?<div className="mt-6 mx-auto max-w-xs rounded-lg overflow-hidden shadow-xl dark:bg-gray-800 dark:text-white bg-white transition-all ease-in-out duration-300">
            {/* Card Image */}
             <img
              className="w-full h-48 object-cover"
              src={item.scheduleImg}
              alt={item.scheduleImg || 'Card Image'}
              /> 
          </div>:
              <li className="text-center">Not scheduled yet!</li>}
        </ul>

        {/* Add Schedule Form */}
        {/* {currentUser && <div className="space-y-2 mb-4">
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
          <textarea
            name="description"
            value={newEvent.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            className="w-full px-3 py-2 border rounded-md text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400 resize-none"
          />
          <button
            onClick={handleAddSchedule}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
          >
            Add Schedule
          </button>
          </div>} */}
        {currentUser &&
        <>
            <input
              type="text"
              placeholder="Image URL"
              value={scheduleImg}
              onChange={(e) => setScheduleImg(e.target.value)}
              className="p-2 border rounded w-full"
            />
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all my-2"
            >
              Add Schedule
            </button>
            </>}
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
