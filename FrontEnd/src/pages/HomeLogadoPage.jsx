<<<<<<< HEAD
import { useEffect, useState } from "react";
import "./HomeLogadoPage.css";
import { Event, Input } from "../components";
import { getAll } from "../services/events.service";
import { useErrorEvent } from "../hooks/useErrorEvent";
import { useNavigate } from "react-router-dom";
import { cityById } from "../services/city.service";
import { useAuth } from "../context/authContext";


export const HomeLogadoPage = () => {
    const {user} = useAuth;
    const [events, setEvents] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [res, setRes] = useState({});
    const [valueInput, setValueInput] = useState(() => {
      return localStorage.getItem("input")
        ? JSON.parse(localStorage.getItem("input"))
        : "";
    });
    const [data, setData] = useState([]);
    const eliminarDiacriticos = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    useEffect(() => {
        setData(() => {
          
          const filter = user.filter((user) =>
            user.events?.some((event) =>
              eliminarDiacriticos(event.name.toLowerCase()).includes(
                eliminarDiacriticos(valueInput.toLowerCase())
              )
            )
          );
    
          localStorage.setItem("input", JSON.stringify(valueInput.toLowerCase()));
    
          return filter;
        });
    
        return () => {};
      }, [valueInput]);

      useEffect(() => {
        (async () => {
          setRes(await getAll());
        })();
      }, []);

      useEffect(() => {
        useErrorEvent(res, setRes, setEvents);
      }, [res]);
    
      useEffect(() => {
        console.log(events);
      }, [events]);

      const navigate = useNavigate();

  const handleClick = () => {
    navigate("/EventsForm");
  };

  return(
  <>
  <p>Bienvenido a tu página {`${user.name}`} </p>
  <div>
  <Link to={`/${user.city.name}/${user.city._id}`}>
            {/* Hay que hacer un link dinámico aqui para que pinte la ciudad del
            usuario según la que corresponda */}
           
          </Link>

  </div>
   
          <NavLink to="/country">
            
          </NavLink>
          <NavLink to="/chats">
            
          </NavLink>
    </>

  )

}


=======
import { useState, useEffect } from "react";
import "./HomeLogadoPage.css";
import { Link} from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useErrorEvent } from "../hooks/useErrorEvent";
import { getAll } from "../services/events.service";
import { Event } from "../components";


export const HomeLogadoPage = ({items}) => {
    const {user} = useAuth();
    console.log("la caca", user);
    const [events, setEvents] = useState([]);
    const [res, setRes] = useState({});
   


  useEffect(() => {
    (async () => {
      setRes(await getAll());
    })();
  }, []);

  useEffect(() => {
    useErrorEvent(res, setRes, setEvents);
  }, [res]);

  useEffect(() => {
    console.log(events);
  }, [events]);


  return (
    <main>
      <div className="homePage">
        <h3 className="TituloViajeros">Bienvenid@ {user.user}!!</h3>
        <p className="parrafo">
            Aquí tienes tus destacados...
        </p>

        <h2 className="EventosHome">
          ¿Quieres ver lo que se cuece en {user.city.name}?
        </h2>
        <div>
        {events.length > 0 && events.slice(-5).map((item) => (
            <Event
            item={item}
              src={item?.image}
              name={item?.name}
              key={item._id}
              category={item?.category}
              date={item?.date}
              description={item?.description}
              cities={item?.cities?.map((city) => city.name)}
              eventId={item?._id}
              comments={item?.comments}
              setEvents={setEvents}
            />
          ))}
        </div>
          
              
        <p className="parrafo">Echa un vistazo de los nuevos eventos disponibles en {user.city.name}</p>
        <button>
          <Link to="/events">Eventos</Link>
        </button>
        
      </div>
    </main>
  );
};

>>>>>>> 799ba9289733046f778e565e0c3429bd0e5a5e36

