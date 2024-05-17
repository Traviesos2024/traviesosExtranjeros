import { useState, useEffect } from "react";
import { CountryCard } from "../components/CountryCard";
import "./Homepages.css";

export const Homepages = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/v1/getAll")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCountries(data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  return (
    <main>
      <div className="homePage">
        <h1 className="boton-like">Viajeros Extranjeros</h1>
        <p className="p">Conoce a amigos en tu nueva ciudad y crea experiencias inolvidables</p>
        <h2 className="botonLike">Países</h2>
        <p className="p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, ipsa
          repellat recusandae tenetur adipisci nostrum distinctio perferendis quo,
          voluptas, nam quam voluptatum neque iure expedita iste consequatur harum
          corporis dignissimos?
        </p>
        <div className="country-cards-container">
          {countries.map((country, index) => (
            <CountryCard
              key={index}
              name={country.name}
              image={country.image}
              cities={country.cities}
            />
          ))}
        </div>
      </div>
    </main>
  );
};
