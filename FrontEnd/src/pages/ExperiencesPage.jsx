import { useEffect, useState } from "react";
import "./ExperiencesPage.css";
import { Experience } from "../components";
import { toggleEvent } from "../services/experiences.service";
import { useNavigate } from "react-router-dom";
import { useErrorExperience } from "../hooks/useErrorExperience";
import { getAllExperiences } from "../services/experiences.service";

export const ExperiencesPage = () => {
  const [experiences, setExperiences] = useState([]);
  const [res, setRes] = useState({});

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

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/ExperiencesForm");
  };

  return (
    <div id="containerExperience">
      <button onClick={handleClick}> ✒️ CREA TU EXPERIENCIA </button>
      <hr />
      <br></br>
      {experiences.length > 0 &&
        experiences
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
              setExperiences = {setExperiences}
            />
          ))}
    </div>
  );
};
