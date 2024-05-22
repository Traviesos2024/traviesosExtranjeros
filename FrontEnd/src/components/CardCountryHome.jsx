import { Link } from "react-router-dom";
import "./CardCountryHome.css";
export const CardCountryHome = ({ data }) => {
  const { image, name } = data;
  const path = `/country/${data.name}/${data._id}`;
  return (
    <div className="cardCountryHome">
      <Link to={path}>
        <img src={image} alt={name} />
      </Link>
    </div>
  );
};
