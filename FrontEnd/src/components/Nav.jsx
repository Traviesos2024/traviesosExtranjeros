import { useAuth } from "../context/authContext";
import "./Nav.css";
import { NavLink } from "react-router-dom";
export const Nav = () => {
  const { user, login, logout } = useAuth();
  return (
    <>
       <nav className="navPrincipal">
        <NavLink to="/">
          <button>Home</button>
        </NavLink>
        <NavLink to="/login">
          <button>Login</button>
        </NavLink>
        <NavLink to="/profile">
          <button>Profile</button>
        </NavLink>
        <NavLink to="/country">
          <button>Country</button>
        </NavLink>
        <NavLink to="/chats">
          <button>Chats</button> //!_Cambiar los chats de aqui irian en
          profile buton
        </NavLink>
      </nav>
    </>
  );
};

//! Este funciona es el que teníamos antes, estoy haciend prueba de que cambie la nav si estás logado.

//   return (
//     <>
      // <nav className="navPrincipal">
      //   <NavLink to="/">
      //     <button>Home</button>
      //   </NavLink>
      //   <NavLink to="/experiences">
      //     <button>Experiences</button>
      //   </NavLink>
      //   <NavLink to="/events">
      //     <button>Events</button>
      //   </NavLink>
      //   <NavLink to="/country">
      //     <button>Country</button>
      //   </NavLink>
      //   <NavLink to="/chats">
      //     <button>Chats</button> //!_Cambiar los chats de aqui irian en
      //     profile buton
      //   </NavLink>
      // </nav>
//     </>
//   );
// }; 
//!------- Ejemplo forma de hacerlo 1. Funciona ok  (NEKY)  Esta forma de hacerlo es sin utilizar el archivo de rutas, incluyendo los navlink uno a uno y sin utilizar
//!----- los componentes de header ni footer, haciendolo con etiquetas.
// <header>
//   <h1>Traviesos Extranjeros 🌎</h1>
// </header>
// <main className="main">
//   <nav className="navGeneral">
//     <NavLink to="">Home</NavLink>
//     <NavLink to="experiences">Experiences</NavLink>
//     <NavLink to="events">Events</NavLink>
//   </nav>
//   <Outlet />
// </main>
// <footer>Hecho con amor 💜</footer>


// import Logout from "./Logout";
// import "./Nav.css";
// import { NavLink } from "react-router-dom";
// export const Nav = () => {
//   return (
//     <>
//       <nav className="navPrincipal">
//         <NavLink to="/">
//           <button>Home</button>
//         </NavLink>
//         <NavLink to="/experiences">
//           <button>Experiences</button>
//         </NavLink>
//         <NavLink to="/events">
//           <button>Events</button>
//         </NavLink>
//         <NavLink to="/country">
//           <button>Country</button>
//         </NavLink>
//         <NavLink to="/chats">
//           <button>Chats</button>
//         </NavLink>
//       </nav>
//     </>
//   );
// };

// //!------- Ejemplo forma de hacerlo 1. Funciona ok  (NEKY)  Esta forma de hacerlo es sin utilizar el archivo de rutas, incluyendo los navlink uno a uno y sin utilizar
// //!----- los componentes de header ni footer, haciendolo con etiquetas.
// // <header>
// //   <h1>Traviesos Extranjeros 🌎</h1>
// // </header>
// // <main className="main">
// //   <nav className="navGeneral">
// //     <NavLink to="">Home</NavLink>
// //     <NavLink to="experiences">Experiences</NavLink>
// //     <NavLink to="events">Events</NavLink>
// //   </nav>
// //   <Outlet />
// // </main>
// // <footer>Hecho con amor 💜</footer>
