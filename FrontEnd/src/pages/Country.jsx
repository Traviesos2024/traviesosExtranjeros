import "./Country.css";

import React, { useState, useEffect } from "react";
import { getAllCountry } from "../services/country.service";
import { useErrorCountry } from "../hooks";
import { countriesData } from "../data";
import { Outlet } from "react-router-dom";
import { Loader, CountryCard } from "../components";

// export const Country = () => {
//   return (
//     <div id="containerCountry">
//       <h1>Países</h1>
//       <div className="country-grid">
//         {countriesData.map((country, index) => (
//           <CountryCard key={index} country={country} />
//         ))}
//       </div>
//       <Outlet />
//     </div>
//   );
// };

//!------------ Estoy intentando hacer la llamada al backend con un getAll de countries en el service de country y no me funciona :(
export const Country = () => {
  const [countries, setCountries] = useState([]);
  const [res, setRes] = useState({});

  useEffect(() => {
    (async () => {
      setRes(await getAllCountry());
    })();
  }, []);

  useEffect(() => {
    useErrorCountry(res, setRes, setCountries);
  }, [res]);

  return (
    <div id="containerGallery">
      {countries.length != 0 ? (
        countries.map((country) => <CountryCard country={country} />)
      ) : (
        <Loader />
      )}
    </div>
  );
};
