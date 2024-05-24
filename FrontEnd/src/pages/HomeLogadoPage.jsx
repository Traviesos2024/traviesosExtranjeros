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



