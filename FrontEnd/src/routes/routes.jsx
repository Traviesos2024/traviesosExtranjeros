import App from "../App";
import { Protected } from "../components";
import {
  Country,
  CountryCity,
  Homepages,
  NotFound,
  Login,
  Register,
  CheckCode,
  Eventspages,
  ChatListPage,
  ChatPage,
  ProfilePage,
  EventsForm,
  FormProfile,
  ExperiencesForm,
  ExperiencesPage,
  ForgotPassword,
  ChangePassword,
} from "../pages";

import { createBrowserRouter } from "react-router-dom";
// import ProfilePage from "../pages/ProfilePage";

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
        path: "/forgotPassword",
        element: <ForgotPassword />,
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
            <ExperiencesPage />
          </Protected>
        ),
      },
      {
        path: "/ExperiencesForm",
        element: (
          <Protected>
            <ExperiencesForm />
          </Protected>
        ),
      },
      {
        path: "/events",
        element: (
          <Protected>
            <Eventspages />
          </Protected>
        ),
      },
      {
        path: "/EventsForm",
        element: (
          <Protected>
            <EventsForm />
          </Protected>
        ),
      },
      {
        path: "/profile",
        element: (
          <Protected>
            <ProfilePage />
          </Protected>
        ),
        children: [
          {
            path: "/profile/changePassword",
            element: (
              <Protected>
                <ChangePassword />
              </Protected>
            ),
          },
          {
            path: "/profile/",
            element: (
              <Protected>
                <FormProfile />
              </Protected>
            ),
          },
        ],
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
        path: "/:city:id",
        element: (
          <Protected>
            <CountryCity />
          </Protected>
        ),
      },
      {
        path: "/chats",
        element: (
          <Protected>
            <ChatListPage />
          </Protected>
        ),
      },
      {
        path: "/chat/:chatId",
        element: (
          <Protected>
            <ChatPage />
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
