//!--- Esta es la página de las citis que están dentro de una country. Ejemplo España (Madrid,Malaga,Cordoba)

import { countriesData } from "../data/countriesData";
import "./CountryCity.css";
import { Link, Outlet, useParams } from "react-router-dom";

export const CountryCity = () => {
  const { city } = useParams(); //intento acceder a cada city por las rutas dinámicas (no funciona, solo me pinta el nombre)
  return (
    <>
      <div id="containerCity">
        <h1>{city}</h1>
        <div className="city">
          {countriesData.map((city, Index) => (
            <ul key={Index}>
              <Link to={city.path}></Link>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};

// He utilizado el código que me has dicho, ¿cómo configuro las rutas para que sean dinámicas y funcionen las páginas?
