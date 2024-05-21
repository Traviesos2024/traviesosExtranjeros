import { useEffect, useState } from "react";
import "./EventsPages.css";
import { Event } from "../components";
import { getAll } from "../services/events.service";
import { useErrorEvent } from "../hooks/useErrorEvent";
import { useNavigate } from "react-router-dom";
import { cityById } from "../services/city.service";

export const Eventspages = () => {
  const [events, setEvents] = useState([]);
  const [res, setRes] = useState({});
  const [searchCities, setSearchCities] = useState(""); //Busqueda

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

  // useEffect(() => {
  //   for(let item of events){
  //     for(let city of item.cities){
  //         (async () =>{
  //          let {data} = await cityById(city);
  //          console.log(data);
  //       })();
  //     }
  //   }
  // }, [events]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/EventsForm");
  };

  // Cambios en la barra de búsqueda
  const handleSearchChange = (e) => {
    setSearchCities(e.target.value.toLowerCase());
  };

  // Filtrar los eventos por ciudad
  // const filteredEvents = events.filter(event =>
  //   event.cities?.some(cities => cities.toLowerCase().includes(searchCities))
  // );

  // Style al buscador
  const inputStyle = {
    width: "50%",
    padding: "12px 20px",
    margin: "8px 30px",
    boxSizing: "border-box",
    border: "2px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    transition: "border-color 0.3s",
  };

  const placeholderStyle = {
    color: "#888",
  };

  const focusStyle = {
    borderColor: "#4CAF50",
  };

  return (
    <div id="containerEvent">
      <button onClick={handleClick}> ✒️ CREA TU EVENTO </button>
      <br></br>
      <input
        type="search"
        style={inputStyle}
        placeholder="Buscar por Ciudad..."
        value={searchCities}
        onChange={handleSearchChange}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = focusStyle.borderColor)
        }
        onBlur={(e) => (e.currentTarget.style.borderColor = inputStyle.border)}
      />
      <hr />
      <br></br>
      {events.length > 0 &&
        events
          .map((item) => (
            <Event
              src={item?.image}
              name={item?.name}
              key={item.name}
              category={item?.category}
              date={item?.date}
              description={item?.description}
              cities={item?.cities?.map((city) => city.name)}
              // cities={item?.city}
              eventId={item?._id}
              comments={item?.comments}
            />
          ))}
    </div>
  );
};
