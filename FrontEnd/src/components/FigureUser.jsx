import "./FigureUser.css";
export const FigureUser = ({ user }) => {
  return (
    <figure className="dataProfile">
      <img src={user.image} alt="user image" className="imageUser" />
      <h4 className="emailUser">Email: {user.email}</h4>
      <h4 className="nameUser">Nombre: {user.name}</h4>
      <h4 className="genderUser">Género: {user.gender}</h4>
      {/* <h4 type="date">Edad: {user.age}</h4>
      <h4 className="countryUser">País: {user?.country}</h4>
      <h4 className="cityUser">Ciudad: {user?.city}</h4> */}
    </figure>
  );
};
