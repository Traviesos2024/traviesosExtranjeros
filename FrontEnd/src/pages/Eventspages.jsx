import { useEffect, useState } from "react";
import "./EventsPages.css";
import { Event } from "../components";
import { getAll } from "../services/events.service";
import { useErrorEvent } from "../hooks/useErrorEvent";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
=======

>>>>>>> f4bc4c3ec1ef52631bf54056e27762c13a8357f9

export const Eventspages = () => {
  const [events, setEvents] = useState([]);
  const [res, setRes] = useState({});

  useEffect(() => {
    (async () => {
      setRes(await getAll());
    })();
  }, []);

  useEffect(() => {
    useErrorEvent(res, setRes, setEvents);
  }, [res]);

  useEffect(() => {
    console.log(events);
  }, [events]);

  const navigate = useNavigate();

  const handleClick = () => {
<<<<<<< HEAD
    navigate("/EventsForm");
=======
    navigate('/EventsForm');
>>>>>>> f4bc4c3ec1ef52631bf54056e27762c13a8357f9
  };

  return (
    <div id="containerEvent">
      <button onClick={handleClick}> ✒️ CREAR EVENTO </button>
      <hr />
      <br></br>
      {events.length > 0 &&
        events
          .slice(0, 1000)
          .map((item) => (
            <Event
              src={item?.image}
              name={item?.name}
              key={item.name}
              category={item?.category}
              date={item?.date}
              description={item?.description}
              cities={item?.cities}
            />
          ))}
    </div>
  );
};
