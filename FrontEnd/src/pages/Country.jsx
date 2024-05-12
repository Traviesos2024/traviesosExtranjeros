import { NavLink, Outlet } from "react-router-dom";
import "./Country.css";

export const Country = () => {
  return (
    <div id="containerCountry">
      {/* Añadir aqui tarjetas de cada country, tengo el estilo creado en CSS  */}

      <NavLink to="/country/city">
        <button>Cities</button>
      </NavLink>
      <p>
        Estoy el la pagina de country y dentro de esta página tengo las citys
      </p>
      <Outlet />
    </div>
  );
};
