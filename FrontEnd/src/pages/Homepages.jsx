import { useState, useEffect } from "react";
import "./Homepages.css";
import { useErrorCountry } from "../hooks/useErrorCountry";
import { useNavigate } from "react-router-dom";

export const Homepages = () => {
  const [country, setCountries] = useState([]);
  const [res, setRes] = useState ({});

  useEffect(() => {
    (async () => {
      setRes(await country());
    })();
  }, []);

  useEffect(() => {
    useErrorCountry(res, setRes, setCountries)
  }, [res]);

  useEffect(() => {
    console.log(country);
  }, [country]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Country");
    navigate('/Country');

  };

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
        <div id="containerHome">
        <button onClick={handleClick}>
            <img src="https://res.cloudinary.com/dqiudrruv/image/upload/v1715956882/traviesosExtrajeros/t1gwnw8ztndp9o8ovlqi.jpg" alt="Portugal" />
        </button>
        <button  onClick={handleClick}>
            <img src="https://res.cloudinary.com/dqiudrruv/image/upload/v1715956992/traviesosExtrajeros/shq2unoqbgcjqzrwegfe.jpg" alt="Francia" />
        </button>
        <button  onClick={handleClick}>
            <img src="https://res.cloudinary.com/dqiudrruv/image/upload/v1715867057/Countries/Italia_Roma_njwygm.jpg" alt="Italia" />
        </button>
        <button  onClick={handleClick}>
            <img src="https://res.cloudinary.com/dqiudrruv/image/upload/v1715867046/Countries/Inglaterra-1-e1579225431994_lpcuiq.jpg" alt="Inglaterra" />
        </button >
    </div>
      </div>
    </main>
  );
};
