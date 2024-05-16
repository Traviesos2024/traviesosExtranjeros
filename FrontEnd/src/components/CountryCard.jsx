import { useState } from "react";
import "./CountryCard.css";
import { Link } from "react-router-dom";
import axios from "axios";

const CountryCard = ({ country }) => {
  const [expanded, setExpanded] = useState(false); // Estado para ampliar la tarjeta del país

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

// const CountryCard = ({ country }) => {
//   const [cities, setCities] = useState([]);
//   const [showCities, setShowCities] = useState(false);

//   const toggleCities = async () => {
//     if (!showCities) {
//       try {
//         // Realizar una solicitud HTTP GET para obtener las ciudades del país
//         const response = await axios.get(
//           `http://localhost:8081/api/v1/countries/${country._id}/cities`
//         );
//         if (response.status === 200) {
//           setCities(response.data); // Establecer las ciudades en el estado
//           setShowCities(true); // Mostrar las ciudades
//         }
//       } catch (error) {
//         console.error("Error fetching cities:", error);
//         // Manejar el error adecuadamente
//       }
//     } else {
//       setShowCities(false); // Ocultar las ciudades
//     }
//   };

//   return (
//     <div
//       className="country-card"
//       onClick={toggleCities}
//       style={{ backgroundImage: `url(${country.image})` }}
//     >
//       <h1>{country.name}</h1>
//       {showCities && (
//         <ul>
//           {cities.map((city, index) => (
//             <li key={index}>{city.name}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CountryCard;
