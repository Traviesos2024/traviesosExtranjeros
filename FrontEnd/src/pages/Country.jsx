import { NavLink, Outlet } from "react-router-dom";
import "./Country.css";
import CountryCard from "../components/CountryCard";
import { countriesData } from "../data/countriesData";

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
