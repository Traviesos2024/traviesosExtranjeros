import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useErrorCity } from "../hooks";
import { Loader } from "./Loader";
import { eventById } from "../services/events.service";
import { Comments } from "./index";
import "./EventDetalle.css";

export const EventDetalle = () => {
  const [event, setEvent] = useState(null);
  const [res, setRes] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setRes(await eventById(id));
      console.log(event);
    })();
  }, []);

  useEffect(() => {
    useErrorCity(res, setRes, setEvent);
    console.log(res);
  }, [res]);

  const onToggleComments = () => {
    setOpen(!open);
  };

  return (
    <div>
      {event != null ? (
        <figure id="eventId">
          <img src={event.image} />
          <div className="title-and-icons-wrapper">
            <h2>{event.name}</h2>
            <div className="comment-icon-padding">
              <span
                className="material-symbols-outlined"
                onClick={onToggleComments}
              >
                mode_comment
              </span>
            </div>
          </div>
          <p>{event.description}</p>
          <p>{new Date(event.date).toLocaleString()}</p>
          <div className="card-comments-wrapper">
            {open ? (
              <>
                <Comments
                  selectedRecipient={event._id}
                  commentsProps={event?.comments}
                />
                <div className="close-chat-wrapper">
                  <span
                    onClick={onToggleComments}
                    className="material-symbols-outlined"
                  >
                    close
                  </span>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <button
            onClick={() =>
              navigate(`/${event.cities[0].name}/${event.cities[0]._id}`)
            }
          >
            Ciudad del evento
          </button>
          <button onClick={() => navigate("/profile")}>Mi perfil</button>
        </figure>
      ) : (
        <Loader />
      )}
    </div>
  );
};
