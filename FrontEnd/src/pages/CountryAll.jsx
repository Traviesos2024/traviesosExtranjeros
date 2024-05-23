import { CardCountryHome } from "../components";
// import { CardCitiesGallery } from "../components";
import "./CountryAll.css";
import React, { useState, useEffect } from "react";
import { countryById, getAllCountry } from "../services/country.service";
import { useErrorCountry } from "../hooks";
import { Outlet, useParams } from "react-router-dom";
// export const CountryAll = () => {
//   return (
//     <>
//       <CardCountryHome /> <CardCitiesGallery />
//     </>
//   );
// };
// export const CountryAll = () => {
//   const [country, setCountry] = useState(null);
//   const { idCountry } = useParams();
//   const [res, setRes] = useState({});

//   useEffect(() => {
//     (async () => {
//       setRes(await countryById(idCountry));
//     })();
//   }, []);

//   useEffect(() => {
//     useErrorCountry(res, setRes, setCountry);

//     console.log(res);
//   }, [res]);

//   return (
//     <div id="containerGallery">
//       <h1>{country != null && country.name}</h1>
//       {country != null &&
//         country.cities.map((item) => (
//           <CardCitiesGallery data={item} key={JSON.stringify(item)} />
//         ))}{" "}
//     </div>
//   );
// };

// export const CountryAll = () => {
//   const [country, setCountry] = useState(null);
//   const { idCountry } = useParams();
//   const [res, setRes] = useState({});

//   useEffect(() => {
//     const fetchCountry = async () => {
//       try {
//         const response = await countryById(idCountry);
//         setRes(response);
//       } catch (error) {
//         console.error("Error fetching country:", error);
//       }
//     };

//     fetchCountry();
//   }, [idCountry]);

//   useEffect(() => {
//     useErrorCountry(res, setRes, setCountry);
//     console.log(res);
//   }, [res]);

//   return (
//     <div id="containerGallery">
//       <h1>{country && country.name}</h1>
//       {country &&
//         country.cities.map((item) => (
//           <CardCitiesGallery data={item} key={item.id || item.name} />
//         ))}
//     </div>
//   );
// };
// export const CountryAll = () => {
//   const [country, setCountries] = useState([]);
//   const [res, setRes] = useState({});

//   useEffect(() => {
//     (async () => {
//       setRes(await getAllCountry());
//     })();
//   }, []);

//   useEffect(() => {
//     useErrorCountry(res, setRes, setCountries);
//     console.log(country);
//   }, [res]);
// };
// <div id="containerCountry">
//   {
//     /**meter los botones  */
//     country.length != 0 ? (
//       country.map((item) => <CardCountryHome data={item} key={item._id} />)
//     ) : (
//       <p>Cargando...</p>
//     )
//   }
// </div>;
export const CountryAll = () => {
  const [countries, setCountries] = useState([]);
  const [res, setRes] = useState({});

  useEffect(() => {
    const fetchCountries = async () => {
      const result = await getAllCountry();
      setRes(result);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (res) {
      useErrorCountry(res, setRes, setCountries);
    }
  }, [res]);

  return (
    <div id="containerCountry">
      {countries.length !== 0 ? (
        countries.map((item) => <CardCountryHome data={item} key={item._id} />)
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};
