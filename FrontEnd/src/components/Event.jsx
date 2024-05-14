import { useState } from "react";
import "./Event.css";
import { Link } from "react-router-dom";

const Event = ({ event }) => {
  const [expanded, setExpanded] = useState(false); // Estado para ampliar la tarjeta de país

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div
      className={`event ${expanded ? "expanded" : ""}`}
      onClick={handleExpandClick}
    >
      <h2>{event.name}</h2>
      <img src={event.image} />
      {expanded && (
        <div className="event-list">
          <h3> Eventos </h3>
          <ul>
            {event.cities.map((city, index) => (
              <ul key={index}>
                <Link to={city.path}>{city.name}</Link>
              </ul>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Event;
