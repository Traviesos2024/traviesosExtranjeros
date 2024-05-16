import "./Country.css";
import CountryCard from "../components/CountryCard";
import React, { useState, useEffect } from "react";
import { getAllCountry } from "../services/country.service";
import { useErrorCountry } from "../hooks";
import { countriesData } from "../data";
import { Outlet } from "react-router-dom";

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

//!------------ Estoy intentando hacer la llamada al backend con un getAll de countries en el service de country y no me funciona :(
// const Country = () => {
//   const [countries, setCountries] = useState([]);
//   const [res, setRes] = useState({});

//   useEffect(() => {
//     (async () => {
//       setRes(await getAllCountry());
//     })();
//   }, []);

//   useEffect(() => {
//     useErrorCountry(res, setRes, setCountries);
//   }, [res]);

//   return (
//     <div id="containerGallery">
//       {countries.map((countries) => (
//         <Figure
//           src={countries.image}
//           name={countries.name}
//           key={countries.name}
//         />
//       ))}
//     </div>
//   );
// };

// export default Country;
