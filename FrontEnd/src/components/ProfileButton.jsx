import React, { useState, useEffect } from "react";
import { byId, updateUser } from "../services/user.service";

const ProfileButton = () => {
  const [loggedInUser, setLoggedInUser] = useState(false);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        byId;

        if (!response.ok) {
          throw new Error("Error al obtener el usuario logado");
        }

        const user = await response.json();
        setLoggedInUser(user);
      } catch (error) {
        console.error("Error al obtener el usuario logado:", error);
      }
    };

    fetchLoggedInUser();
  }, []);

  const handleProfileClick = () => {
    console.log("Mostrar perfil del usuario:", loggedInUser);
  };

  return (
   
    <button onClick={handleProfileClick}>
      {loggedInUser ? "Ver perfil" : "Iniciar sesión"}
    </button>
  );
};

export default ProfileButton;
