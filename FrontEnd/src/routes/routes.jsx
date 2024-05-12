import App from "../App";
import {
  Country,
  CountryCity,
  EventsPages,
  Experiencespages,
  Homepages,
  NotFound,
} from "../pages";

import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepages />,
      },
      {
        path: "/experiences",
        element: <Experiencespages />,
      },
      {
        path: "/events",
        element: <EventsPages />,
      },
      {
        path: "/country",
        element: <Country />,
        children: [
          {
            path: "/country/city",
            element: <CountryCity />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
