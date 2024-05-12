//!--- Esta es la página de las citis que están dentro de una country. Ejemplo España (Madrid,Malaga,Cordoba)

import CityCard from "../components/CityCard";
import "./CountryCity.css";

export const CountryCity = () => {
  // ESTE ES UN EJEMPLO DE DONDE METEMOS LAS CITIES, NO SÉ SI ESTO HABRIA QUE PONERLO EN DATA
  const cities = [
    {
      city: "Ciudad 1",
      image: "ruta-a-imagen-1.jpg",
      description: "Descripción de la ciudad 1", // FALTARÍA AÑADIR TODA LA INFO QUE PUSIMOS EN EL MODELO DE CITY
    },
    {
      city: "Ciudad 2",
      image: "ruta-a-imagen-2.jpg",
      description: "Descripción de la ciudad 2",
    },
  ];
  return (
    <>
      <h2>Cities disponibles en </h2>
      {/* //!-- Estaria guay poner un templed string */}
      de la ciudd que tenemos abierta en ese momento
      <div className="city-card-container">
        {cities.map((city, index) => (
          <CityCard
            key={index}
            city={city.city}
            image={city.image}
            description={city.description}
          />
        ))}
      </div>
    </>
  );
};
