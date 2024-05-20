import { useAuth } from "../context/authContext";
import "./Nav.css";
import { NavLink } from "react-router-dom";
export const Nav = () => {
  const { user, login, logout } = useAuth();
  return (
    <>
      <nav>
        <ul>
          {user ? (
            <>
              <li>
                <a href="/profile">Tu perfil</a>
              </li>
              <li>
                <a href="/" onClick={logout}>
                  Cerrar sesión
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/login" onClick={login}>
                  Iniciar Sesión
                </a>
              </li>
              <li>
                <a href="/register">Nuevo usuario </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};