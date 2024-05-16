import { useState } from "react";
import "./Header.css";
import { Nav } from "./Nav";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import ProfileButton from "./ProfileButton";

export const Header = () => {
  const [Login, setLogin] = useState(true); // Estado de si el usuario está logado o no. Esta en true inicialmente porque tiene que estar logado para hacer logout
  const handleLogout = () => {
    // Aqui se setea el estado si ha cambiado a false porque se ha deslogado
    setLogin(false);
  };
  return (
    <header>
      <h1>Traviesos Extranjeros 🌎</h1>
      <div className="Botonesuser">
        <div>
          {Login ? (
            <Logout onLogout={handleLogout} />
          ) : (
            <button>
              <Link to="/login">Login here</Link>
            </button>
          )}
        </div>
        <ProfileButton />
      </div>
      <Nav />
    </header>
  );
};
