import { useEffect, useState } from "react";
import "./EventsPages.css";
import { Event, Input } from "../components";
import { getAll } from "../services/events.service";
import { useErrorEvent } from "../hooks/useErrorEvent";
import { useNavigate } from "react-router-dom";

export const Eventspages = () => {
  const [events, setEvents] = useState([]);
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
      if (events && events.allEvent?.length > 0) {
        // Check if events is defined and is an array
        const filter = events.allEvent?.filter((event) =>
          event.cities?.some((city) =>
            eliminarDiacriticos(city.name.toLowerCase()).includes(
              eliminarDiacriticos(valueInput.toLowerCase())
            )
          )
        );

        localStorage.setItem("input", JSON.stringify(valueInput.toLowerCase()));

        return filter;
      }

      return [];
    });
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
    console.log("👽", events);
  }, [events]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/EventsForm");
  };

  const handleInputChange = (event) => {
    setValueInput(event.target.value);
  };

  return (
    <div id="containerEvent">
      <button onClick={handleClick}> ✒️ CREA TU EVENTO </button>
      <br></br>
      <Input
        setValueInput={setValueInput}
        value={valueInput}
        onChange={handleInputChange} // Update state when input changes
      />
      <hr />
      <br></br>
      <div className="cards-wrapper">
        {data.length > 0
          ? data.map((item) => (
              <Event
                renderData={item}
                key={item._id}
                setEvents={setData}
                profile={false}
                // userAuth={userById}
              />
            ))
          : events.allEvent?.length > 0 &&
            events.allEvent?.map((item) => (
              <Event
                renderData={item}
                key={item._id}
                setEvents={setEvents}
                profile={false}
                // userAuth={userById}
              />
            ))}
      </div>
    </div>
  );
};
