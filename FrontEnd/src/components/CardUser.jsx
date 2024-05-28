import "./CardUser.css";
export const CardUser = ({ data }) => {
  const { image, name } = data;
  // const path = `/users/${data.name}/${data._id}`;
  return (
    <div className="cardUser">
      <img src={data.image} alt={data.name} />
      <p>Nombre: {name}</p>
      {/* <p>Ciudad: {city}</p> */}
    </div>
  );
};
