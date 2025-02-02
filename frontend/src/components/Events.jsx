import React, { useState, useEffect } from 'react';
import list from '../../public/list.json';
import EventsCard from './EventsCard';

function Events() {
  const [events, setEvents] = useState(list);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulating user authentication (Check localStorage)
  useEffect(() => {
    const user = localStorage.getItem('user'); // Example check
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  // Delete event handler
  const handleDelete = (id) => {
    if (isLoggedIn) {
      const updatedEvents = events.filter((event) => event.id !== id);
      setEvents(updatedEvents);
    } else {
      alert('You must be logged in to delete an event!');
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white p-6 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8 mt-20">
            Our Events
          </h1>

          {/* Events Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shadow-md">
            {events.map((item) => (
              <EventsCard key={item.id} item={item} onDelete={handleDelete} isLoggedIn={isLoggedIn} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;
