import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { cityById } from "../services/city.service";
import { useErrorCity } from "../hooks";
import { Loader } from "./Loader";
import { Eventos } from "./Eventos";

export const Citybyid = () => {
  const [city, setCity] = useState(null);
  const [res, setRes] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setRes(await cityById(id));
      console.log("city 🥑", city);
    })();
  }, []);
  useEffect(() => {
    useErrorCity(res, setRes, setCity);
    console.log(res);
  }, [res]);

  return (
    <div>
      {city != null ? (
        <figure id="cityId">
          <img src={city.image} />
          <h2>{city.name}</h2>
          <p>{city.description}</p>
          <p>{city?.country[0].name}</p>
          {city.events.map((item) => (
            <Eventos
              src={item.image}
              name={item.name}
              key={item._id}
              date={item.date}
            />
          ))}

          <NavLink to="/country">
            <button>Atrás</button>
          </NavLink>
        </figure>
      ) : (
        <Loader />
      )}
    </div>
  );
};
