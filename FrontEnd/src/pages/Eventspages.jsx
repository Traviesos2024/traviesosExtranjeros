import { useEffect, useState } from "react";
import "./EventsPages.css";
import { Event, Input } from "../components";
import { getAll } from "../services/events.service";
import { useErrorEvent } from "../hooks/useErrorEvent";
import { useNavigate } from "react-router-dom";
import { byId } from "../services/user.service";
import { useAuth } from "../context/authContext";

export const Eventspages = () => {
  const { user } = useAuth();
  console.log("user", user);
  const [events, setEvents] = useState([]);
  const [res, setRes] = useState({});
  const [resById, setResById] = useState({});

  const [userById, setUserById] = useState(null);
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
      const filter = events.filter((event) =>
        event.cities?.some((city) =>
          eliminarDiacriticos(city.name.toLowerCase()).includes(
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
      setResById(await byId(user._id));
    })();
  }, []);

  useEffect(() => {
    resById?.status == 200 && setUserById(resById.data);
  }, [resById]);

  useEffect(() => {
    useErrorEvent(res, setRes, setEvents, user?.city?.name);
  }, [res, user.city.name]);

  useEffect(() => {
    console.log(events);
  }, [events]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/EventsForm");
  };

  return (
    <div id="containerEvent">
      <button onClick={handleClick}> ✒️ CREA TU EVENTO </button>
      <br></br>{" "}
      <Input
        setValueInput={setValueInput}
        value={
          localStorage.getItem("input")
            ? JSON.parse(localStorage.getItem("input"))
            : ""
        }
      />
      <hr />
      <br></br>
      <div className="cards-wrapper">
        {data.length > 0
          ? data.map((item) => (
              <Event
                renderData={item}
                key={item._id}
                setEvents={setEvents}
                profile={false}
                userAuth={userById}
              />
            ))
          : events.length > 0 &&
            userById != null &&
            events.map((item) => (
              <Event
                renderData={item}
                key={item._id}
                setEvents={setEvents}
                profile={false}
                userAuth={userById}
              />
            ))}
      </div>
    </div>
  );
};
