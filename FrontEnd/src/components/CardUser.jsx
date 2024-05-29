import "./CardUser.css";
export const CardUser = ({ data }) => {
  const { image, name, city } = data;
  // const { user } = useAuth();
  // const path = `/users/${data.name}/${data._id}`;
  console.log("data", data)
  return (
    <div className="cardUser">
      <img src={data.image} alt={data.name} />
      <p> {name}</p>
      <p>{city.name}</p>
    </div>
  );
};
