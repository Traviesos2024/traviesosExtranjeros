import { useState } from "react";
import "./CountryCard.css";
import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  const [expanded, setExpanded] = useState(false); // Estado para ampliar la tarjeta de país

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div
      className={`country-card ${expanded ? "expanded" : ""}`}
      onClick={handleExpandClick}
    >
      <h2>{country.name}</h2>
      <img src={country.image} alt={country.name} />
      {expanded && (
        <div className="city-list">
          <h3>Ciudades disponibles:</h3>
          <ul>
            {country.cities.map((city, index) => (
              <ul key={index}>
                <Link to={city.path}>{city.name}</Link>
              </ul>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

//!--- FALTARIA AÑADIR TODOS LOS DATOS DE LA COUNTRY QUE INCLUIMOS EN EL MODELO DE COUNTRY (NEKY)

export default CountryCard;
