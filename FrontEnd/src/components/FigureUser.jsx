import "./FigureUser.css";
export const FigureUser = ({ user }) => {
  console.log("user", user);
  return (
    <figure className="dataProfile">
      <img src={user.image} alt="user image" className="imageUser" />
      <h4>Name: {user.user}</h4>
      <h4>Email: {user.email}</h4>
      <h4>Gender: {user.gender}</h4>
      <h4 type="date">Edad: {user.age}</h4>
      <h4 className="countryUser">País: {user?.country}</h4>
      <h4 className="cityUser">Ciudad: {user?.city}</h4>
    </figure>
  );
};
