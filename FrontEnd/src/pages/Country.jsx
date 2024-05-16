import { NavLink, Outlet } from "react-router-dom";
import "./Country.css";
import CountryCard from "../components/CountryCard";
import { countriesData } from "../data/countriesData";
import React, { useState, useEffect } from "react";
import axios from "axios";

// const Country = () => {
//   const [countries, setCountries] = useState([]);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         // Realizar una solicitud HTTP GET para obtener los países desde el backend
//         const response = await axios.get(
//           "http://localhost:8081/api/v1/country/getAll"
//         );
//         if (response.status === 200) {
//           setCountries(response.data); // Establecer los países en el estado
//         }
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//         // Manejar el error adecuadamente
//       }
//     };

//     fetchCountries(); // Llamar a la función para obtener los países cuando el componente se monte
//   }, []);

//   return (
//     <div id="containerCountry">
//       <h1>Países</h1>
//       <div className="country-grid">
//         {countries.map((country, index) => (
//           <CountryCard key={index} country={country} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Country;

export const Country = () => {
  return (
    <div id="containerCountry">
      <h1>Países</h1>
      <div className="country-grid">
        {countriesData.map((country, index) => (
          <CountryCard key={index} country={country} />
        ))}
      </div>
      <Outlet />
    </div>
  );
};
