import { useEffect, useState } from "react";
import "./EventsPages.css";
import { Event, Input } from "../components";
import { getAll } from "../services/events.service";
import { useErrorEvent } from "../hooks/useErrorEvent";
import { useNavigate } from "react-router-dom";
import { cityById } from "../services/city.service";

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
      // const filter = events.cities.filter((item) =>
      //   item.name.toLowerCase().includes(valueInput.toLowerCase())
      // );
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

  return (
    <div id="containerEvent">
      <button onClick={handleClick}> ✒️ CREA TU EVENTO </button>
      <br></br>
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

      {data.length > 0
        ? data.map((item) => (
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
              setEvents = {setEvents}
            />
          ))
        : events.length > 0 &&
          events.map((item) => (
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
  );
};
