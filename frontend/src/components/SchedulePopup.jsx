import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function SchedulePopup({ item, onClose }) {
  const { currentUser } = useAuth();
  const [scheduleData, setScheduleData] = useState({
    date: '',
    time: '',
    description: '',
    participants: '',
    opponent: ''
  });
  const [scheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const docRef = doc(db, 'games', item.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setScheduleList(docSnap.data().schedule || []);
      }
    };
    fetchSchedule();
  }, [item.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScheduleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const docRef = doc(db, 'games', item.id);
      const updatedSchedule = [...scheduleList, scheduleData];
      await updateDoc(docRef, { schedule: updatedSchedule });
      setScheduleList(updatedSchedule);
      toast.success('Schedule added successfully!');
      setScheduleData({ date: '', time: '', description: '', participants: '', opponent: '' });
    } catch (err) {
      toast.error('Error adding schedule: ' + err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 sm:p-6">
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">📅 Game Schedule</h2>
        <ul className="space-y-3 mb-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          {scheduleList.length > 0 ? (
            scheduleList.map((entry, index) => (
              <li key={index} className="p-2 border-b border-gray-200 dark:border-gray-700 last:border-none bg-slate-100 rounded-lg">
                <span className="block font-semibold">{entry.date} - {entry.time}</span>
                <div className="flex  justify-around">
                <span className="block">{entry.participants}</span>
                <span className="font-semibold">vs</span>
                <span className="block">{entry.opponent}</span>
                </div>
                <span className="block text-gray-600 dark:text-gray-400">{entry.description}</span>
              </li>
            ))
          ) : (
            <li className="text-center">Not scheduled yet!</li>
          )}
        </ul>
        {currentUser && (
          <>
            <input
              type="date"
              name="date"
              value={scheduleData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md mb-2"
            />
            <input
              type="time"
              name="time"
              value={scheduleData.time}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md mb-2"
            />
            <input
              type="text"
              name="participants"
              value={scheduleData.participants}
              onChange={handleChange}
              placeholder="Participants"
              className="w-full px-3 py-2 border rounded-md mb-2"
            />
            <input
              type="text"
              name="opponent"
              value={scheduleData.opponent}
              onChange={handleChange}
              placeholder="Opponent"
              className="w-full px-3 py-2 border rounded-md mb-2"
            />
            <textarea
              name="description"
              value={scheduleData.description}
              onChange={handleChange}
              placeholder="Description"
              rows="4"
              className="w-full px-3 py-2 border rounded-md mb-2 resize-none"
            />
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all mb-2"
            >
              Add Schedule
            </button>
          </>
        )}
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
