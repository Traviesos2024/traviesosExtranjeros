import React from 'react';
import { useParams } from 'react-router-dom';
import { eventsData } from '../data/eventsData';



const EventsPages = () => {
  const { city } = useParams();
  console.log(useParams());

  // Verifica si city está definido
  if (!city) {
    return <h2>Ciudad no definida</h2>;
  }

  // Encuentra el evento correspondiente
  const event = eventsData.find(event => event.city.toLowerCase() === city.toLowerCase());

  if (!event) {
    return <h2>Evento no encontrado</h2>;
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <img src={`/images/${event.image}`} alt={event.name} width="400" />
      <p>Ciudad: {event.city}</p>
      <p>Categoría: {event.category}</p>
      <a href="/">Volver a la lista de eventos</a>
    </div>
  );
};

export default EventsPages;
