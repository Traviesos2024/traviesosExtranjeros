import { useEffect, useState } from "react";
import "./EventsPages.css";
import { Event } from "../components";
import { getAll } from "../services/events.service";
import { useErrorEvent } from "../hooks/useErrorEvent";
import { useNavigate } from "react-router-dom";


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
    navigate("/EventsForm");
    navigate('/EventsForm');
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
