import React from 'react';
import EventsCard from './EventsCard';

function CardList({ items }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {items.map((item, index) => (
        <EventsCard key={item.id || index} item={item} />
      ))}
    </div>
    
  );
}

export default CardList;
