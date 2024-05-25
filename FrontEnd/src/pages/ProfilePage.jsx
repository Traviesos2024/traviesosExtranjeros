// import { Outlet } from "react-router-dom";
// import { NavProfile } from "../components";
// import "./ProfilePage.css";

// export const ProfilePage = () => {
//   return (
//     <>
//       <NavProfile />
//       <Outlet />
//     </>
//   );
// };

import { NavProfile } from "../components";
import "./ProfilePage.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useErrorEvent } from "../hooks/useErrorEvent";
import { getAll } from "../services/events.service";
import { Event } from "../components";

export const ProfilePage = ({ items }) => {
  const { user } = useAuth();
  console.log(user);
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
    <>
      <NavProfile />
      <main>
        <div className="homePage">
          <h3 className="TituloViajeros">
            ¡¡Hola {user.user}, aquí tienes todo tu contenido!!
          </h3>
          <h2 className="EventosHome">Eventos en {user.city.name}</h2>
          <div>
            {user.eventsFav && events.length > 0 ? (
              events.likeEvent
                .includes(user._id)
                .map((item) => (
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
                ))
            ) : (
              <p>No hay eventos favoritos disponibles</p>
            )}
          </div>

          <p className="parrafo">
            Echa un vistazo de los nuevos eventos disponibles en{" "}
            {user.city.name}
          </p>
          <button>
            <Link to="/events">Eventos</Link>
          </button>
        </div>
      </main>
    </>
  );
};
