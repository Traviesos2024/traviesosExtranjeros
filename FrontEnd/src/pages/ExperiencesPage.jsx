import { useEffect, useState } from "react";
import "./ExperiencesPage.css";
import { Experience } from "../components";
import { toggleEvent } from "../services/experiences.service";
import { useNavigate } from "react-router-dom";
import { useErrorExperience } from "../hooks/useErrorExperience";
import { getAllExperiences } from "../services/experiences.service";
import { useErrorEvent } from "../hooks";
import { getAll } from "../services/events.service";

export const ExperiencesPage = () => {
  const [experiences, setExperiences] = useState([]);
  const [res, setRes] = useState({});
  const [resEvents, setResEvents] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      setRes(await getAllExperiences());
    })();
  }, []);

  useEffect(() => {
    useErrorExperience(res, setRes, setExperiences);
  }, [res]);

  useEffect(() => {
    console.log(experiences);
  }, [experiences]);

  useEffect(() => {
    (async () => {
      setResEvents(await getAll());
    })();
  }, []);

  useEffect(() => {
    useErrorEvent(resEvents, setResEvents, setEvents);
  }, [resEvents]);

  useEffect(() => {
    console.log(events);
  }, [events]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/ExperiencesForm");
  };

  // const experiencesEvent = experiences.filter(experience => experience.events.includes(events._id));
  const experiencesEvent = experiences.filter(
    (experience) =>
      Array.isArray(experience.events) && experience.events.includes(events._id)
  );

  return (
    <div id="containerExperience">
      <button onClick={handleClick}> ✒️ CREA TU EXPERIENCIA </button>
      <hr />
      <br></br>
      {experiencesEvent.length > 0 &&
        experiencesEvent
          .slice(0, 1000)
          .map((item) => (
            <Experience
              item={item}
              src={item?.image}
              name={item?.name}
              key={item.name}
              description={item?.description}
              likes={item?.likes}
              comments={item?.comments}
              events={item?.events}
              experienceId={item?._id}
              setExperiences={setExperiences}
            />
          ))}
    </div>
  );
};
