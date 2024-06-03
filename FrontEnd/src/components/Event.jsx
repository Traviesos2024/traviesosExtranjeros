import "./Event.css";
import { Comments } from "./index";
import { useRef, useState } from "react";
import { toggleFollowEvent, toggleLikeEvent } from "../services/events.service";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { followUserToggle } from "../services/user.service";

export const Event = ({
  renderData,
  setEvents,
  profile,
  home,
  handleDelete,
  handleUpdate,
  userAuth,
}) => {
  const {
    _id,
    image,
    name,
    likeEvent,
    eventFollowers,
    category,
    date,
    cities,
    eventOwner,
  } = renderData;

  console.log("render data", renderData);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const spanFollowRef = useRef(null);
  const { user } = useAuth();

  const onToggleLike = async () => {
    try {
      const res = await toggleLikeEvent(_id);
      if (res.status === 200) {
        console.log(res.data);
        //! siguiente linea no SE TOCA!!!
        if (profile) {
          setEvents(res.data.user);
        } else if (home) {
          const filteredEvents = res.data.allEvent.filter((event) =>
            event.cities.some((city) => city.name === userAuth.city.name)
          );
          console.log(filteredEvents);
          setEvents(filteredEvents);
        } else {
          console.log("Estoy pasando por aqui 🎃", res.data.user);
          setEvents(res.data);
        }
        console.log("Toggle Like Response:", res.data);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const onToggleFollow = async () => {
    try {
      const res = await toggleFollowEvent(_id);
      console.log("res", res);

      if (profile) {
        setEvents(res.data.user);
      } else if (home) {
        const filteredEvents = res.data.allEvent.filter((event) =>
          event.cities.some((city) => city.name === userAuth.city.name)
        );
        console.log(filteredEvents);
        setEvents(filteredEvents);
      } else {
        console.log("Estoy pasando por aqui 🎃", res.data.user);
        setEvents(res.data);
      }
      console.log("Toggle Follow Response:", res.data);
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  const onToggleFollowUser = async (idUserSeQuiereSeguir) => {
    const classCustomOptimistic =
      spanFollowRef.current.className == "material-symbols-outlined person_add"
        ? "material-symbols-outlined"
        : "material-symbols-outlined person_add";
    spanFollowRef.current.className = classCustomOptimistic;
    console.log(eventOwner._id);
    try {
      const res = await followUserToggle(idUserSeQuiereSeguir);

      if (profile) {
        res.status === 200 && setEvents(res.data.authUser);
      } else if (home) {
        const filteredEvents = res.data.allEvent.filter((event) =>
          event.cities.some((city) => city.name === userAuth.city.name)
        );
        console.log(filteredEvents);
        setEvents(filteredEvents);
      } else {
        console.log("Estoy pasando por aqui 🎃", res.data.user);
        setEvents(res.data);
      }
    } catch (error) {
      console.error("Error toggling follow:", error);

      let classCustomOptimistic =
        spanFollowRef.current.className ==
        "material-symbols-outlined person_add"
          ? "material-symbols-outlined"
          : "material-symbols-outlined person_add";
      spanFollowRef.current.className = classCustomOptimistic;
    }
  };

  const onToggleComments = () => {
    setOpen(!open);
  };

  return (
    <figure key={_id} className="card">
      <Link to={`/events/${_id}`}>
        <img src={image} alt={name} width={350} height={200} />
      </Link>
      <div className="card-padding">
        <div className="card-icons-wrapper">
          <div onClick={onToggleLike} id="favorite-icon">
            <span
              className={
                likeEvent.includes(user._id)
                  ? "material-symbols-outlined favorite"
                  : "material-symbols-outlined"
              }
            >
              favorite
            </span>
            <span>{likeEvent.length}</span>
          </div>

          <div onClick={onToggleFollow} className="Check">
            <span
              className={
                eventFollowers.includes(user._id)
                  ? "material-symbols-outlined Check_box"
                  : "material-symbols-outlined"
              }
            >
              Check_box
            </span>
            <span>{eventFollowers.length}</span>
          </div>

          {handleDelete && (
            <button onClick={() => handleDelete(_id)}>
              <span className="material-symbols-outlined">delete</span>
            </button>
          )}
          {handleUpdate && (
            <button onClick={() => navigate(`/events/${_id}/updateEvent`)}>
              <span className="material-symbols-outlined">update</span>
            </button>
          )}
        </div>
        <p>Evento: {name}</p>
        <p>Categoría: {category}</p>
        <p>Fecha: {new Date(date).toLocaleString()}</p>
        <p>Ciudad: {cities[0]?.name}</p>
        <p>
          Organizador: {console.log("😋", eventOwner._id)}
          <span ref={spanFollowRef}>{eventOwner?.name}</span>
        </p>

        <span
          ref={spanFollowRef}
          className={
            userAuth?.followed?.includes(eventOwner._id)
              ? "material-symbols-outlined person_add"
              : "material-symbols-outlined"
          }
          onClick={() => onToggleFollowUser(eventOwner._id)}
        >
          person_add
        </span>
      </div>
    </figure>
  );
};
