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


