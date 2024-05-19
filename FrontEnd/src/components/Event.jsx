import "./Event.css";
import { Comments } from "./index";
import { useState } from "react";

export const Event = ({
  name,
  src,
  category,
  cities,
  date,
  description,
  eventId,
}) => {
  const [open, setOpen] = useState(false);

  const onToggle = (event) => {
    event.preventDefault();
    setOpen(!open);
  };

  return (
    <figure>
      <img src={src} alt={name} width={350} height={200} />
      <p>Evento: {name}</p>
      <p>Categoria: {category}</p>
      <p>Fecha: {date}</p>
      <p>Descripccion: {description}</p>
      <p>Ciudad: {cities}</p>

      {/* <div>
        <h4 onClick={onToggle}>Comments</h4>
        {open ? <Comments selectedRecipient={eventId} /> : ""}
      </div> */}
    </figure>
  );
};
