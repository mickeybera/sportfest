import React from 'react';
import { Link } from 'react-router-dom';
function EventsCard({ item }) {

  return (
    <div className="mt-6 mx-auto max-w-xs rounded-lg overflow-hidden shadow-xl dark:bg-gray-800 dark:text-white bg-white transition-all ease-in-out duration-300">
      {/* Card Image */}
      <img
        className="w-full h-48 object-cover"
        src={item.image}
        alt={item.name || "Card Image"}
      />

      <div className="p-6">
        {/* Title */}
        <h3 className="font-semibold text-xl mb-2">{item.name}</h3>
        
        {/* Description */}
        <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
          {item.description}
        </p>

        {/* Buttons for Winner and Details */}
        <div className="flex justify-between gap-4">
          {/* Winner Button */}
          <a
            href={item.winnerLink || '#'}
            className="px-4 py-2 text-sm bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-all duration-300 dark:bg-violet-400 dark:text-black dark:hover:bg-violet-500"
          >
           <button>Winner</button> 
          </a>
          
          {/* Details Button */}
          <a
            href={item.detailsLink || '#'}
            className="px-4 py-2 text-sm bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-all duration-300 dark:bg-violet-400 dark:text-black dark:hover:bg-violet-500"
          >
            Schedule
          </a>
        </div>
      </div>
    </div>
  );
}

export default EventsCard;
