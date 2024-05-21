import "./Experience.css";
import { Comments } from "./index";
import { useState } from "react";

export const Experience = ({
  name,
  src,
  description,
  likes,
  comments,
  events,
  experienceId,
}) => {
  const [open, setOpen] = useState(false);

  const onToggle = (event) => {
    event.preventDefault();
    setOpen(!open);
  };
  return (
    <figure>
      <img src={src} alt={name} width={350} height={200} />
      <p>{name}</p>
      <p>{description}</p>
      <p>{likes}</p>

      <p>{events}</p>
      <div>
        <h4 onClick={onToggle}>Comments</h4>
        {open ? (
          <Comments selectedRecipient={experienceId} commentsProps={comments} />
        ) : (
          ""
        )}
      </div>
    </figure>
  );
};
