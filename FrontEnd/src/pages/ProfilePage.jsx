
import { Experience, NavProfile } from "../components";
import "./ProfilePage.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useErrorEvent } from "../hooks/useErrorEvent";
import { getAll } from "../services/events.service";
import { getAllExperiences } from "../services/experiences.service";
import { Event } from "../components";
import { useErrorExperience } from "../hooks";

export const ProfilePage = ({ item }) => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [resEvents, setResEvents] = useState({});
  const [resExperiences, setResExperiences] = useState({});
  
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

  // Filtrar los eventos que están en la lista de likeEvent del usuario
  const likedEvents = events.filter(event => event.likeEvent.includes(user._id));
  const followedEvents = events.filter(event => event.eventFollowers.includes(user._id));
  const experiencesLikes = experiences.filter(experience => experience.likes && experience.likes.includes(user._id));
  console.log("soy tu experiencia de la caca", experiencesLikes);

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
            {likedEvents.length > 0 ? (
              likedEvents.map((item) => (
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
            {followedEvents.length > 0 ? (
              followedEvents.map((item) => (
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
            {experiencesLikes.length > 0 ? (
              experiencesLikes.map((item) => (
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
            Echa un vistazo de los nuevos eventos disponibles en {user.city.name}
          </p>
          <button>
            <Link to="/events">Eventos</Link>
          </button>
        </div>
      </main>
    </>
  );
};


