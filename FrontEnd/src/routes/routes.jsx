// import App from "../App";
// import { Protected } from "../components";
// import {
//   Country,
//   CountryCity,
//   Homepages,
//   NotFound,
//   Login,
//   Register,
//   CheckCode,
//   Eventspages,
//   ChatListPage,
//   ChatPage,
//   ProfilePage,
//   EventsForm,
//   FormProfile,
//   ExperiencesForm,
//   ExperiencesPage,
//   ForgotPassword,
//   ChangePassword,
//   CountryAll,
//   EventDetallePage,
//   Followers,
//   UserAll,
//   UpdateEvent,
//   UpdateExperience,
//   CreateCountryForm,
// } from "../pages";

// import { createBrowserRouter } from "react-router-dom";
// import { HomeLogadoPage } from "../pages/HomeLogadoPage";
// // import ProfilePage from "../pages/ProfilePage";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/register",
//         element: <Register />,
//       },
//       {
//         path: "/login",
//         element: <Login />,
//       },

//       {
//         path: "/forgotPassword",
//         element: <ForgotPassword />,
//       },
//       {
//         path: "/verifyCode",
//         element: <CheckCode />,
//       },
//       {
//         path: "/",
//         element: <Homepages />,
//       },
//       {
//         path: "/log",
//         element: <HomeLogadoPage />,
//       },
//       {
//         path: "/experiences",
//         element: (
//           <Protected>
//             <ExperiencesPage />
//           </Protected>
//         ),
//       },
      
//       {
//         path: "/events",
//         element: (
//           <Protected>
//             <Eventspages />
//           </Protected>
//         ),
//       },
//       {
//         path: "/events/updateEvent",
//         element: (
//           <Protected>
//             <UpdateEvent />
//           </Protected>
//         ),
//       },
//       {
//         path: "/experiences/update",
//         element: (
//           <Protected>
//             <UpdateExperience />
//           </Protected>
//         ),
//       },
//       {
//         path: "/usersAll",
//         element: (
//           <Protected>
//             <UserAll />
//           </Protected>
//         ),
//       },
//       {
//         path: "/EventsForm",
//         element: (
//           <Protected>
//             <EventsForm />
//           </Protected>
//         ),
//       },
//       {
//         path: "/followers",
//         element: (
//           <Protected>
//             <Followers />
//           </Protected>
//         ),
//       },
//       {
//         path: "/ajustes",
//         element: <FormProfile />,
//       },
//       {
//         path: "/ajustes/changePassword",
//         element: (
//           <Protected>
//             <ChangePassword />
//           </Protected>
//         ),
//       },

//       {
//         path: "/ajustes/updateUser",
//         element: (
//           <Protected>
//             <FormProfile />
//           </Protected>
//         ),
//       },
//       {
//         path: "/profile",
//         element: (
//           <Protected>
//             <ProfilePage />
//           </Protected>
//         ),
//       },
//       {
//         path: "/country/:name/:idCountry",
//         element: <Country />,
//       },

//       {
//         path: "/country",
//         element: <CountryAll />,
//       },
//       {
//         path: "/:city/:id",
//         element: (
//           <Protected>
//             <CountryCity />
//           </Protected>
//         ),
//       },
//       {
//         path: "/events/:id",
//         element: (
//           <Protected>
//             <EventDetallePage />
//           </Protected>
//         ),
//         children: [
//           {
//             path: "/ExperiencesForm",
//             element: (
//               <Protected>
//                 <ExperiencesForm />
//               </Protected>
//             ),
//           },
//         ]
//       },
//       {
//         path: "/chats",
//         element: (
//           <Protected>
//             <ChatListPage />
//           </Protected>
//         ),
//       },
//       {
//         path: "/chat/:chatId",
//         element: (
//           <Protected>
//             <ChatPage />
//           </Protected>
//         ),
//       },
//       {
//         path: "/createCountry",
//         element: (
//           <Protected>
//             <CreateCountryForm />
//           </Protected>
//         ),
//       },
//       {
//         path: "*",
//         element: <NotFound />,
//       },
//     ],
//   },
// ]);

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
  CountryAll,
  EventDetallePage,
  Followers,
  UserAll,
  UpdateEvent,
  UpdateExperience,
  CreateCountryForm,
} from "../pages";

import { createBrowserRouter } from "react-router-dom";
import { HomeLogadoPage } from "../pages/HomeLogadoPage";

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
        path: "/log",
        element: <HomeLogadoPage />,
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
        path: "/events",
        element: (
          <Protected>
            <Eventspages />
          </Protected>
        ),
      },
      {
        path: "/events/updateEvent",
        element: (
          <Protected>
            <UpdateEvent />
          </Protected>
        ),
      },
      {
        path: "/experiences/update",
        element: (
          <Protected>
            <UpdateExperience />
          </Protected>
        ),
      },
      {
        path: "/usersAll",
        element: (
          <Protected>
            <UserAll />
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
        path: "/followers",
        element: (
          <Protected>
            <Followers />
          </Protected>
        ),
      },
      {
        path: "/ajustes",
        element: <FormProfile />,
      },
      {
        path: "/ajustes/changePassword",
        element: (
          <Protected>
            <ChangePassword />
          </Protected>
        ),
      },
      {
        path: "/ajustes/updateUser",
        element: (
          <Protected>
            <FormProfile />
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
      },
      {
        path: "/country/:name/:idCountry",
        element: <Country />,
      },
      {
        path: "/country",
        element: <CountryAll />,
      },
      {
        path: "/:city/:id",
        element: (
          <Protected>
            <CountryCity />
          </Protected>
        ),
      },
      {
        path: "/events/:id",
        element: (
          <Protected>
            <EventDetallePage />
          </Protected>
        ),
        children: [
          {
            path: "ExperiencesForm",
            element: (
              <Protected>
                <ExperiencesForm />
              </Protected>
            ),
          },
        ],
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
        path: "/createCountry",
        element: (
          <Protected>
            <CreateCountryForm />
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

