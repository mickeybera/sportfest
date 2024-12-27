import React from 'react';
import list from '../../public/list.json';
import EventCard from './EventsCard'; // Ensure this is the correct path

function Events() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Heading Section */}
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8 mt-20">
            Our Events
          </h1>
          
          {/* Events Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 shadow-md">
            {list.map((item) => (
              <EventCard item={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;
