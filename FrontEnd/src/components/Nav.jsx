import "./Nav.css";
import { NavLink } from "react-router-dom";
export const Nav = () => {
  return (
    <>
      <nav className="navPrincipal">
        <NavLink to="/">
          <button>Home</button>
        </NavLink>
        <NavLink to="/profile">
          <button>Profile</button>
        </NavLink>
        <NavLink to="/country">
          <button>Country</button>
        </NavLink>
        <NavLink to="/chats">
          <button>Chats</button>
        </NavLink>
      </nav>
    </>
  );
};
