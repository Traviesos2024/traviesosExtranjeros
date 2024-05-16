import "./Event.css";

export const Event = ({ name, src, category, cities, date, description }) => {

  

  return (
    <figure>
      <img src={src} alt={name} width={350} height={200} />
      <p>{name}</p>
      <p>{category}</p>
      <p>{date}</p>
      <p>{description}</p>
      <p>{cities}</p>
    </figure>
  );
};
