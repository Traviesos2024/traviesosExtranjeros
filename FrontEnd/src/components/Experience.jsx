import "./Experience.css";

export const Experience = ({
  name,
  src,
  description,
  likes,
  comments,
  events,
}) => {
  return (
    <figure>
      <img src={src} alt={name} width={350} height={200} />
      <p>{name}</p>
      <p>{description}</p>
      <p>{likes}</p>
      <p>{comments}</p>
      <p>{events}</p>
    </figure>
  );
};
