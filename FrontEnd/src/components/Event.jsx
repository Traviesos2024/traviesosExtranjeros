import "./Event.css";

export const Event = ({ name, src, category, cities, date, description }) => {

  

  return (
    <figure>
      <img src={src} alt={name} width={350} height={200} />
      <p>Evento: {name}</p>
      <p>Categoria: {category}</p>
      <p>Fecha: {date}</p>
      <p>Descripccion: {description}</p>
      <p>Ciudad: {cities}</p>
    </figure>
  );
};
