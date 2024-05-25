import { useState, useEffect } from "react";
import "./Homepages.css";
import { useErrorCountry } from "../hooks/useErrorCountry";
import { Link, useNavigate } from "react-router-dom";
import { getAllCountry } from "../services/country.service";
import { CardCountryHome } from "../components";

export const Homepages = () => {
  const [country, setCountries] = useState([]);
  const [res, setRes] = useState({});

  useEffect(() => {
    (async () => {
      setRes(await getAllCountry());
    })();
  }, []);

  useEffect(() => {
    useErrorCountry(res, setRes, setCountries);
    console.log(country);
  }, [res]);

  // useEffect(() => {
  //   console.log(country);
  // }, [country]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Country");
  };

  return (
    <main>
      <div className="homePage">
        <h3 className="TituloViajeros">Traviesos Extranjeros 🌎</h3>
        <p className="parrafo">
          Conoce a amigos en tu nueva ciudad y crea experiencias inolvidables
        </p>

        <h2 className="tituloPaises">Países</h2>
        <p className="parrafo">
          Estos son los paises que tenemos disponibles para que puedas conocer
          gente nueva. En cada país disponemos de ciudades disponibles con
          multitud de eventos y actividades para que no estés solo en tu nueva
          ciudad
        </p>

        <div id="containerHome">
          {
            /**meter los botones  */
            country.length != 0 ? (
              country.map((item) => (
                <CardCountryHome data={item} key={item._id} />
              ))
            ) : (
              <p>Cargando...</p>
            )
          }
        </div>

        <h2 className="EventosHome">
          ¿Quieres ver lo que se cuece en tu nueva ciudad?
        </h2>
        <p className="parrafo">Echa un vistazo de los eventos disponibles</p>
        <button>
          <Link to="/events">Eventos</Link>
        </button>
      </div>
    </main>
  );
};

{
  /* <div className="card">
  <button onClick={handleClick}>
    <img
      src="https://res.cloudinary.com/dqiudrruv/image/upload/v1715956882/traviesosExtrajeros/t1gwnw8ztndp9o8ovlqi.jpg"
      alt="Portugal"
    />
  </button>
</div>; */
}
