import "./Header.css";
import { Nav } from "./Nav";

import { ProfileButton } from "./ProfileButton";

export const Header = () => {
  return (
    <header>
      <h1>Traviesos Extranjeros 🌎</h1>
      <Nav />
      <p>HOla</p>
      <div className="Botonesuser">
        <ProfileButton />
      </div>
    </header>
  );
};
