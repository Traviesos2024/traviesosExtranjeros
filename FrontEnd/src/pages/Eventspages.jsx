import { useEffect, useState } from "react";
import "./EventsPages.css";
import { Event } from "../components";
import { getAll } from "../services/events.service";
import { useErrorEvent } from "../hooks/useErrorEvent";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD

=======
>>>>>>> 500f13336af25badde9937483f2eb68e066d6f46

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
<<<<<<< HEAD
    navigate('/EventsForm');
=======
>>>>>>> 500f13336af25badde9937483f2eb68e066d6f46
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
