import React, { useState } from 'react';
import WinnerPopup from './WinnerPopup';
import SchedulePopup from './SchedulePopup';
import { CiCalendar } from "react-icons/ci";
import { useAuth } from '../contexts/AuthContext';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import {toast} from 'react-hot-toast';
function EventsCard({ item }) {
  // State for Popups
  const [showWinnerPopup, setShowWinnerPopup] = useState(false);
  const [showSchedulePopup, setShowSchedulePopup] = useState(false);
  const {currentUser} = useAuth();

  const handleDelete = async (id) => {
    try{
      await deleteDoc(doc(db, 'games', id));
      toast.success("Event Deleted Successfully");
    }catch(err){
      toast.error(err);
    }
  }

  // Winner Handlers
  const handleWinnerClick = () => setShowWinnerPopup(true);
  const handleCloseWinnerPopup = () => setShowWinnerPopup(false);

  // Schedule Handlers
  const handleScheduleClick = () => setShowSchedulePopup(true);
  const handleCloseSchedulePopup = () => setShowSchedulePopup(false);

  return (
    <div className="mt-6 mx-auto max-w-xs rounded-lg overflow-hidden shadow-xl dark:bg-gray-800 dark:text-white bg-white transition-all ease-in-out duration-300">
      {/* Card Image */}
      <img
        className="w-full h-48 object-cover hover:scale-110 duration-300"
        src={item.image}
        alt={item.name || 'Card Image'}
      />

      <div className="p-6">
        {/* Title */}
        <h3 className="font-semibold text-xl mb-2">{item.name}</h3>

        {/* Description */}
        <p className="text-base text-gray-700 dark:text-gray-300 mb-4 flex items-center">
        <CiCalendar size={20}/>
        {item.schedule ? 
        (new Date(item.schedule).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }))
          : "Not schedule yet"}
        </p>

        {/* Buttons for Winner and Schedule */}
        <div className="flex justify-between gap-4">
          {/* Winner Button */}
          <button
            onClick={handleWinnerClick}
            className="px-4 py-2 text-sm bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-all duration-300 dark:bg-violet-400 dark:text-black dark:hover:bg-violet-500"
          >
            Winner
          </button>

          {/* Schedule Button */}
          <button
            onClick={handleScheduleClick}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 dark:bg-blue-400 dark:text-black dark:hover:bg-blue-500"
          >
            Schedule
          </button>
          {currentUser && <button
            onClick={() => handleDelete(item.id)}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-300 dark:bg-blue-400 dark:text-black dark:hover:bg-blue-500"
          >
            Delete
          </button>}
        </div>
      </div>

      {/* Winner Popup */}
      {showWinnerPopup && (
        <WinnerPopup item={item} onClose={handleCloseWinnerPopup} />
      )}

      {/* Schedule Popup */}
      {showSchedulePopup && (
        <SchedulePopup item={item} onClose={handleCloseSchedulePopup} />
      )}
    </div>
  );
}

export default EventsCard;