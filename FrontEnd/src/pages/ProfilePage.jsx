import { Experience } from "../components";
import "./ProfilePage.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useErrorEvent } from "../hooks/useErrorEvent";
import { eventById, getAll } from "../services/events.service";
import { getAllExperiences } from "../services/experiences.service";
import { Event } from "../components";
import { useErrorExperience, useErrorUser } from "../hooks";
import { byId } from "../services/user.service";


export const ProfilePage = ({ item }) => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [resEvents, setResEvents] = useState({});
  const [resExperiences, setResExperiences] = useState({});
  const [resUser, setResUser] = useState([]);
  const [userById, setUserById] = useState(null);
  useEffect(() => {
    (async () => {
      setResEvents(await getAll());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setResExperiences(await getAllExperiences());
    })();
  }, []);

  useEffect(() => {
    useErrorExperience(resExperiences, setResExperiences, setExperiences);
  }, [resExperiences]);

  useEffect(() => {
    console.log(experiences);
  }, [experiences]);

  useEffect(() => {
    useErrorEvent(resEvents, setResEvents, setEvents);
  }, [resEvents]);

  useEffect(() => {
    console.log(events);
  }, [events]);

  
  useEffect(() => {
    (async () => {
      setResUser(await byId(user._id));
    })();
  }, []);

  useEffect(() => {
    useErrorUser(resUser, setResUser, setUserById);

    console.log(resUser);
  }, [resUser]);
  console.log("aaaaahhhhhhhhhhhhh",resUser);


  return (
    <>
      <main>
        <div className="homePage">
          <h3 className="TituloViajeros">
            ¡¡Hola {user.user}, aquí tienes todo tu contenido!!
          </h3>
          <h2 className="EventosHome">{user.user}, aquí tienes los eventos que has creado</h2>
          <div>
            {userById != null ? (
              userById.eventsOwner.map((item) => (
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
          <h2 className="EventosHome">Eventos en {user.city.name}</h2>
          <div>
          
            { userById != null ? (
              userById.eventsFav.map((item) => (
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
          <h2 className="EventosHome">Eventos que sigues</h2>
          <div>
            {userById != null  ? (
              userById.eventsFollow.map((item) => (
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
              <p>No hay eventos seguidos disponibles</p>
            )}
          </div>
          <h2 className="EventosHome">Experiencias que te han gustado</h2>
          <div>
            {userById != null ? (
              userById.experiencesOwner.map((item) => (
                <Experience
                  item={item}
                  src={item?.image}
                  name={item?.name}
                  key={item._id}
                  description={item?.description}
                  likes={item?.likes}
                  comments={item?.comments}
                  events={item?.events}
                  experienceId={item?._id}
                  setExperiences={setExperiences}
                />
              ))
            ) : (
              <p>No hay experiencias que te hayan gustado disponibles</p>
            )}
          </div>
          <h2 className="EventosHome">Experiencias que te gustan</h2>
          <div>
            {userById != null ? (
              userById.experiencesFav.map((item) => (
                <Experience
                  item={item}
                  src={item?.image}
                  name={item?.name}
                  key={item._id}
                  description={item?.description}
                  likes={item?.likes}
                  comments={item?.comments}
                  events={item?.events}
                  experienceId={item?._id}
                  setExperiences={setExperiences}
                />
              ))
            ) : (
              <p>No hay experiencias que te hayan gustado disponibles</p>
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
