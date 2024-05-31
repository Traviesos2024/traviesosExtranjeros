
import "./Experience.css";
import { Comments } from "./index";
import { useAuth } from "../context/authContext";
import { useState, useRef } from "react";
import { toggleLikeExperience } from "../services/experiences.service";

export const Experience = ({
  setExperiences,
  profile,
  handleDeleteExperience,
  renderData,
  userAuth,
}) => {
  const { _id, image, name, likes, events, description } = renderData;
  console.log("render data", renderData);

  const [open, setOpen] = useState(false);
  const spanFollowRef = useRef(null);
  const { user } = useAuth();

  // const onToggleLike = async () => {
  //   try {
  //     const res = await toggleLikeExperience(_id);
  //     if (res.status === 200) {
  //       console.log("respuesta data", res.data);
  //       //! siguiente linea no SE TOCA!!!
  //       if (profile) {
  //         setExperiences(res.data.user);
  //       } else {
  //         const filteredExperiences = res.data.allExperience.filter((experience) => {
  //           // Verificar que events es un array antes de usar some
  //           return Array.isArray(experience.events) &&
  //             experience.events.some((event) => event.name === userAuth.experience.name);
  //         });
  //         console.log("los eventos que trae", events);

  //         console.log("experiencias filtradas", filteredExperiences);
  //         setExperiences(filteredExperiences);
  //       }
  //       console.log("Toggle Like Response:", res.data);
  //     }
  //   } catch (error) {
  //     console.error("Error toggling like:", error);
  //   }
  // };

  const onToggle = (event) => {
    event.preventDefault();
    setOpen(!open);
  };

  return (
    <figure key={_id}>
      <img src={image} alt={name} width={350} height={200} />
      {/* <p>{name}</p>
      <p>{description}</p>
      <p>{likes}</p> */}
      {/* <div onClick={onToggleLike} className="favorite-icon">
        <span className={likes.includes(user._id) ? 'material-symbols-outlined favorite' : 'material-symbols-outlined'}>
          favorite
        </span>
        <span>{likes.length}</span>
      </div> */}
      {handleDeleteExperience && (
        <button onClick={() => handleDeleteExperience(_id)}>
          <span className="material-symbols-outlined">
            delete
          </span>
        </button>
      )}
      <h3>{name}</h3>
      <p>Descripción: {description}</p>
      {/* <p>Evento: {events.name}</p> */}

      <div>
        <h4 onClick={onToggle}>Comments</h4>
        {open ? (
          <Comments selectedRecipient={_id} commentsProps={renderData.comments} />
        ) : (
          ""
        )}
      </div>
    </figure>
  );
};
