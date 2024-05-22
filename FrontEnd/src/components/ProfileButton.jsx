import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";
export const ProfileButton = () => {
  const { user, login, logout } = useAuth();
  return (
    <>
      {user ? (
        <>
          <NavLink to="/profile">
            <button>Tu perfil</button>
          </NavLink>
          <NavLink to="/">
            <button onClick={logout}>Cerrar sesión</button>
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/login">
            <button>Iniciar sesión</button>
          </NavLink>
          <NavLink to="/register">
            <button>Nuevo usuario</button>
          </NavLink>
        </>
      )}
    </>
  );
};
