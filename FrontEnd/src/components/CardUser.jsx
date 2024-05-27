export const CardUser = ({ data }) => {
  const { image, name } = data;
  // const path = `/users/${data.name}/${data._id}`;
  return (
    <div className="cardUser">
      <p>Nombre: {user.name}</p>
      <p>Ciudad: {user.city}</p>
    </div>
  );
};
