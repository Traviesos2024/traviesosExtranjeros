import { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useErrorCity } from "../hooks";
import { Loader } from "./Loader";
import { eventById } from "../services/events.service";

export const EventDetalle = () => {
  const [event, setEvent] = useState(null);
  const [res, setRes] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setRes(await eventById(id));
    })();
  }, []);

  useEffect(() => {
    useErrorCity(res, setRes, setEvent);
    console.log(res);
  }, [res]);

  return (
    <div>
      {event != null ? (
        <figure id="eventId">
          <img src={event.image} />
          <h2>{event.name}</h2>
          <p>{event.description}</p>
          <p>{new Date(event.date).toLocaleString()}</p>
          <button
            onClick={() =>
              navigate(`/${event.cities[0].name}/${event.cities[0]._id}`)
            }
          >
            Atrás
          </button>
        </figure>
      ) : (
        <Loader />
      )}
    </div>
  );
};
