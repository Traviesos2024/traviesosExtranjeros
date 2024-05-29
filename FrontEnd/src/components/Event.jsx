import "./Event.css";
import { Comments } from "./index";
import { useState } from "react";
import { toggleFollowEvent, toggleLikeEvent } from "../services/events.service";
import { useAuth } from "../context/authContext";
import { Link, NavLink } from "react-router-dom";
import { followUserToggle } from "../services/user.service";

export const Event = ({
  name,
  src,
  category,
  cities,
  setUserById,
  date,
  description,
  eventId,
  comments,
  setEvents,
  item,
  initialLikes,
  initialFollowers,
  eventOwner,
  userById,
  handleDelete,
  handleUpdate,
}) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [likes, setLikes] = useState(initialLikes);
  const [followed, setFollowed] = useState(initialFollowers);

  const onToggleLike = async () => {
    try {
      const res = await toggleLikeEvent(eventId);
      res.status === 200 && setEvents(res.data.allEvent);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const onToggleFollow = async () => {
    try {
      const res = await toggleFollowEvent(eventId);
      res.status === 200 && setEvents(res.data.allEvent);
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  const onToggleFollowUser = async (idUserSeQuiereSeguir) => {
    try {
      const res = await followUserToggle(idUserSeQuiereSeguir);
      res.status === 200 && setUserById(res.data.authUser);
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  const onToggleComments = () => {
    setOpen(!open);
  };

  return (
    <figure key={eventId} className="card">
      <img src={src} alt={name} width={350} height={200} />
      <div className="card-padding">
        <p>{likes}</p>
        <div className="card-icons-wrapper">
          <div onClick={onToggleLike} id="favorite-icon">
            <span
              className={
                item.likeEvent.includes(user._id)
                  ? "material-symbols-outlined favorite"
                  : "material-symbols-outlined"
              }
            >
              favorite
            </span>
            <span>{item.likeEvent.length}</span>
          </div>
          <p>{followed}</p>
          <div onClick={onToggleFollow} className="Check">
            <span
              className={
                item.eventFollowers.includes(user._id)
                  ? "material-symbols-outlined Check_box"
                  : "material-symbols-outlined"
              }
            >
              Check_box
            </span>
            <span>{item.eventFollowers.length}</span>
          </div>
          <div className="comment-icon-padding">
            <span
              className="material-symbols-outlined"
              onClick={onToggleComments}
            >
              mode_comment
            </span>
          </div>
          <div>
            <button>
              <Link to="/experiences">Ver experiencias</Link>
            </button>
          </div>
          {handleDelete && (
            <button onClick={() => handleDelete(eventId)}>
              <span class="material-symbols-outlined">delete</span>
            </button>
          )}
          {handleUpdate && ( 
          <NavLink to="/events/updateEvent">
             <span class="material-symbols-outlined">update</span>
          </NavLink>
          )}

        </div>
        <p>Evento: {name}</p>
        <p>Categoría: {category}</p>
        <p>Fecha: {new Date(date).toLocaleString()}</p>
        <p>Descripción: {description}</p>
        <p>Ciudad: {cities?.name}</p>
        <div>
          <p>
            Organizador:{" "}
            <span
              className={
                userById?.followed?.includes(user._id)
                  ? "material-symbols-outlined person_add"
                  : "material-symbols-outlined"
              }
            >
              {eventOwner}
            </span>
          </p>
          <span
            className={
              userById?.followed?.includes(user._id)
                ? "material-symbols-outlined person_add"
                : "material-symbols-outlined"
            }
            onClick={() => onToggleFollowUser(item.eventOwner._id)}
          >
            person_add
          </span>
        </div>
        <div className="card-comments-wrapper">
          {open ? (
            <>
              <Comments selectedRecipient={eventId} commentsProps={comments} />
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
      </div>
    </figure>
  );
};
