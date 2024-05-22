import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cityById } from "../services/city.service";
import { useErrorCity } from "../hooks";
import { Loader } from "./Loader";

export const Citybyid = () => {
  const [city, setCity] = useState(null);
  const [res, setRes] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setRes(await cityById(id));
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
          <p>{city.country}</p>
          <button onClick={() => navigate("/country")}>Atrás</button>
        </figure>
      ) : (
        <Loader />
      )}
    </div>
  );
};
