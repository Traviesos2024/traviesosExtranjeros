import React from 'react';
import { Link } from 'react-router-dom';
import { eventsData } from '../data/eventsData';

export const Event = () => {

  
  return (
    <div>
      <h1>Eventos</h1>
      <ul>
        {eventsData.map((event, index) => (
          <li key={index}>
            <Link to={event.path}>
              <img src={`/images/${event.image}`} alt={event.name} width="200" />
              <h2>{event.name}</h2>
              <p>{event.city}</p>
              <p>{event.category}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Event;