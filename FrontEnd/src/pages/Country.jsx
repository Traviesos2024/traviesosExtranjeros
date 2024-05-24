import "./Country.css";
import React, { useState, useEffect } from "react";
import { countryById, getAllCountry } from "../services/country.service";
import { useErrorCountry } from "../hooks";
import { Outlet, useParams } from "react-router-dom";
import { Loader, CountryCard } from "../components";
import CardCitiesGallery from "../components/CardCitiesGallery";

export const Country = () => {
  const [country, setCountry] = useState(null);
  const { idCountry } = useParams();
  const [res, setRes] = useState({});

  useEffect(() => {
    (async () => {
      setRes(await countryById(idCountry));
    })();
  }, []);

  useEffect(() => {
    useErrorCountry(res, setRes, setCountry);

    console.log(res);
  }, [res]);

  return (
    <div id="containerGallery">
      <h1>{country != null && country.name}</h1>
      <p>{country != null && country.description}</p>
      <h4>Principales tradiciones:</h4>{" "}
      <p> {country != null && country.traditions}</p>
      <h4>Comida típica:</h4> <p> {country != null && country.tipicalFood}</p>
      {country != null &&
        country.cities.map((item) => (
          <CardCitiesGallery data={item} key={JSON.stringify(item)} />
        ))}{" "}
    </div>
  );
};

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

// //!------------ Estoy intentando hacer la llamada al backend con un getAll de countries en el service de country y no me funciona :(
// export const Country = () => {
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
//       {countries.length != 0 ? (
//         countries.map((country) => <CountryCard country={country} />)
//       ) : (
//         <Loader />
//       )}
//     </div>
//   );
// };
