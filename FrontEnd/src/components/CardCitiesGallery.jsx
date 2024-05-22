import { Link } from "react-router-dom";
import "./CardCitiesGallery.css";

const CardCitiesGallery = ({ data }) => {
  const { image, name } = data;
  const path = `/${data.name}/${data._id}`;
  return (
    <div className="cardCityGallery">
      <Link to={path}>
        <img src={image} alt={name} />
      </Link>
    </div>
  );
};

export default CardCitiesGallery;
