import App from "../App";
import { Protected } from "../components";
import {
  Country,
  CountryCity,
  EventsPages,
  Experiencespages,
  Homepages,
  NotFound,
  Login,
  Register,
  CheckCode,
} from "../pages";

import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/verifyCode",
        element: <CheckCode />,
      },
      {
        path: "/",
        element: <Homepages />,
      },
      {
        path: "/experiences",
        element: (
          <Protected>
            <Experiencespages />
          </Protected>
        ),
      },
      {
        path: "/events",
        element: (
          <Protected>
            <EventsPages />
          </Protected>
        ),
      },
      {
        path: "/:country",
        element: (
          <Protected>
            <Country />
          </Protected>
        ),
      },
      {
        path: "/:city",
        element: (
          <Protected>
            <CountryCity />
          </Protected>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
