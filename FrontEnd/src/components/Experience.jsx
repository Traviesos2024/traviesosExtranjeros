import "./Experience.css";
import { Comments } from "./index";
import { useAuth } from "../context/authContext";
import { useState, useRef } from "react";
import { toggleLikeExperience } from "../services/experiences.service";
import { useNavigate } from "react-router-dom";

export const Experience = ({
  renderData,
  setExperiences,
  profile,
  handleDeleteExperience,
  handleUpdateExperience,
  userAuth,
}) => {
  const { _id, image, name, likes, events, description } = renderData;
  console.log("render data", renderData);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const spanFollowRef = useRef(null);
  const { user } = useAuth();

  const onToggle = (event) => {
    event.preventDefault();
    setOpen(!open);
  };

  return (
    <figure key={_id} className="card">
      <img src={image} alt={name} width={350} height={200} />

      {handleDeleteExperience && (
        <button onClick={() => handleDeleteExperience(_id)}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      )}
      {handleUpdateExperience && (
        <button onClick={() => navigate(`/experiences/update/${_id}`)}>
          <span className="material-symbols-outlined">update</span>
        </button>
      )}
      <h3>{name}</h3>
      <p>Descripción: {description}</p>

      <div>
        <h4 onClick={onToggle}>Comments</h4>
        {open ? (
          <Comments
            selectedRecipient={_id}
            commentsProps={renderData.comments}
          />
        ) : (
          ""
        )}
      </div>
    </figure>
  );
};
