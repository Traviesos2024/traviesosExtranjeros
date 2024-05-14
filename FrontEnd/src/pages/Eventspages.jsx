//* habría que importar la data de las ciudades para que los eventos estuvieran dentro de ellas. Si no lo hubiera importariamos countriesData.
//import { citiesData } from "../data/citiesData";
import { eventsData } from "../data/eventsData";
import "./EventsPages.css";
import { Link, Outlet, useParams } from "react-router-dom";

export const EventsPages = () => {
  const { event } = useParams();
  return (
    <>
      <div id="containerCity">
        <h1>{event}</h1>
        <div className="event">
          {eventsData.map((city, Index) => (
            <ul key={Index}>
              <Link to={city.path}></Link>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};
