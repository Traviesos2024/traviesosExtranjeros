import "./Event.css";
import { Comments } from "./index";
import { useState, useEffect } from "react";
import axios from "axios";
import { toggleFollowEvent, toggleLikeEvent } from "../services/events.service"; // Importar la función de servicio
import { useErrorLikeEvent, useErrorFollowEvent } from "../hooks"; // Importa un hook personalizado para manejar errores
import { useAuth } from "../context/authContext"; // Importa el contexto de autenticación

export const Event = ({
  name,
  src,
  category,
  cities,
  date,
  description,
  eventId,
  comments,
  setEvents,
  item,
  initialLikes,
  initialFollowers,
}) => {
  const [open, setOpen] = useState(false);
  const { allUser, setAllUser, bridgeData, user } = useAuth();
  const [likes, setLikes] = useState(initialLikes); // Estado de likes
  const [followed, setFollowed] = useState(initialFollowers); // follow y unfollow

  // Recuperar el estado del local storage cuando el componente se monte

  const onToggleLike = async (events) => {
    try {
      const res = await toggleLikeEvent(eventId);
      console.log("res", res);
      res.status == 200 && setEvents(res.data.allEvent);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const onToggleFollow = async (events) => {
    try {
      const res = await toggleFollowEvent(eventId);
      console.log("res", res);
      res.status == 200 && setEvents(res.data.allEvent);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const onToggleComments = (event) => {
    event.preventDefault();
    setOpen(!open);
  };

  return (
    <figure>
      <img src={src} alt={name} width={350} height={200} />
      <p>{likes}</p>
      <div onClick={onToggleLike} className="favorite-icon">
        <span
          className={
            item.likeEvent.includes(user._id)
              ? "material-symbols-outlined favorite"
              : "material-symbols-outlined"
          }
        >
          favorite
        </span>
      </div>
      <p>{followed}</p>
      <div onClick={onToggleFollow} className="Check-Box">
        <span
          className={
            item.eventFollowers.includes(user._id)
              ? "material-symbols-outlined Check Box"
              : "material-symbols-outlined"
          }
        >
          favorite
        </span>
      </div>
      <p>Evento: {name}</p>
      <p>Categoría: {category}</p>
      <p>Fecha: {new Date(date).toLocaleString()}</p>
      <p>Descripción: {description}</p>
      <p>Ciudad: {cities}</p>

      <div>
        <h4 onClick={onToggleComments}>Comments</h4>
        {open ? (
          <Comments selectedRecipient={eventId} commentsProps={comments} />
        ) : (
          ""
        )}
      </div>
    </figure>
  );
};
