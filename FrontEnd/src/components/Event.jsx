import "./Event.css";
import { Comments } from "./index";
import { useState, useEffect } from "react";

export const Event = ({
  name,
  src,
  category,
  cities,
  date,
  description,
  eventId,
  comments,
}) => {
  const [open, setOpen] = useState(false);
  const [favorite, setFavorite] = useState(false); // like y dislike
  const [followed, setFollowed] = useState(false); // follow y unfollow

  // Recuperar el estado del local storage cuando el componente se monte
  useEffect(() => {
    const savedFavorite = localStorage.getItem(`favorite-${eventId}`);
    if (savedFavorite) {
      setFavorite(JSON.parse(savedFavorite));
    }

    const savedFollowed = localStorage.getItem(`followed-${eventId}`);
    if (savedFollowed) {
      setFollowed(JSON.parse(savedFollowed));
    }
  }, [eventId]);

  const onToggleComments = (event) => {
    event.preventDefault();
    setOpen(!open);
  };

  const onToggleFavorite = () => {
    const newFavoriteState = !favorite;
    setFavorite(newFavoriteState);
    localStorage.setItem(
      `favorite-${eventId}`,
      JSON.stringify(newFavoriteState)
    );
  };

  const onToggleFollow = () => {
    const newFollowedState = !followed;
    setFollowed(newFollowedState);
    localStorage.setItem(
      `followed-${eventId}`,
      JSON.stringify(newFollowedState)
    );
  };

  return (
    <figure>
      <img src={src} alt={name} width={350} height={200} />

      <div onClick={onToggleFavorite} className="favorite-icon">
        <span
          className={`material-symbols-outlined ${
            favorite ? "favorite" : "not-favorite"
          }`}
        >
          favorite
        </span>

        <button onClick={onToggleFollow} className="follow-button">
          {followed ? "Unfollow" : "Follow"}
        </button>
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
