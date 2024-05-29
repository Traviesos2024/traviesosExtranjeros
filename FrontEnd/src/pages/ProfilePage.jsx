import { Experience } from "../components";
import "./ProfilePage.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useErrorEvent } from "../hooks/useErrorEvent";
import { eventById, getAll } from "../services/events.service";
import { deleteExperience, getAllExperiences } from "../services/experiences.service";
import { Event } from "../components";
import { useErrorExperience, useErrorUser } from "../hooks";
import { byId } from "../services/user.service";
import { deleteEvent } from "../services/events.service";
// import { followUserToggle } from "../services/user.service";


export const ProfilePage = ({ item }) => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [res, setRes] = useState({});
  const [resExperiences, setResExperiences] = useState({});
  const [resUser, setResUser] = useState([]);
  const [userById, setUserById] = useState(null);
  useEffect(() => {
    (async () => {
      setRes(await getAll());
    })();
  }, []);

  useEffect(() => {
    useErrorEvent(res, setRes, setEvents);
    // console.log("setEveents", setEvents)
  }, [res]);

  useEffect(() => {
    console.log("events", events);
  }, [events]);

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
    (async () => {
      setResUser(await byId(user._id));
    })(user);
  }, [user]);

  useEffect(() => {
    useErrorUser(resUser, setResUser, setUserById);

    console.log(resUser);
  }, [resUser]);

  const handleDelete = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setUserById((prevUser) => ({
        ...prevUser,
        eventsOwner: prevUser.eventsOwner.filter(
          (event) => event._id !== eventId
        ),
      }));
    } catch (error) {
      console.error("Error al eliminar el evento:", error);
    }
  };
 
  const handleDeleteExperience = async (experienceId) => {
    try {
      await deleteExperience(experienceId);
      setUserById((prevUser) => ({
        ...prevUser,
        eventsOwner: prevUser.eventsOwner.filter(
          (experience) => experience._id !== experienceId
        ),
      }));
    } catch (error) {
      console.error("Error al eliminar el evento:", error);
    }
  };
  return (
    <>
      <main>
        <div className="homePage">
          <h3 className="TituloViajeros">
            ¡¡Hola {user.user}, aquí tienes todo tu contenido!!
          </h3>

          <h2 className="EventosHome">Tus eventos creados</h2>
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
                  // description={item?.description}
                  // cities={item?.cities[0]}
                  // eventId={item?._id}
                  // comments={item?.comments}
                  // setEvents={setEvents}
                  // eventOwner={item?.eventOwner.name}
                  // setUserById={setUserById}
                  // userById={userById}
                  // handleDelete={handleDelete}
                />
              ))
            ) : (
              <p>No hay eventos creados disponibles</p>
            )}
          </div>
          <h2 className="EventosHome">Tus eventos favoritos</h2>
          <div>
            {userById != null ? (
              userById.eventsFav.map((item) => (
                <Event
                  item={item}
                  src={item?.image}
                  name={item?.name}
                  key={item._id}
                  category={item?.category}
                  date={item?.date}
                  // description={item?.description}
                  // cities={item?.cities[0]}
                  // eventId={item?._id}
                  // comments={item?.comments}
                  // setEvents={setEvents}
                  // eventOwner={item?.eventOwner.name}
                />
              ))
            ) : (
              <p>No hay eventos favoritos disponibles</p>
            )}
          </div>
          <h2 className="EventosHome">Eventos que sigues</h2>
          <div>
            {userById != null ? (
              userById.eventsFollow.map((item) => (
                <Event
                  item={item}
                  src={item?.image}
                  name={item?.name}
                  key={item._id}
                  category={item?.category}
                  date={item?.date}
                  description={item?.description}
                  cities={item?.cities[0]}
                  eventId={item?._id}
                  comments={item?.comments}
                  setEvents={setEvents}
                  eventOwner={item?.eventOwner.name}
                />
              ))
            ) : (
              <p>No hay eventos seguidos disponibles</p>
            )}
          </div>
          <h2 className="EventosHome">Experiencias que has creado</h2>
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
                  setUserById={setUserById}
                />
              ))
            ) : (
              <p>No has creado aún experiencias</p>
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
                  setUserById={setUserById}
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
