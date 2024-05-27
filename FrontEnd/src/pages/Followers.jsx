import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useErrorUser } from "../hooks";
import { byId } from "../services/user.service";

export const Followers = ({}) => {
  const { user } = useAuth();
  console.log("Soy el usuario logado 🥑", user);
  const [resUser, setResUser] = useState([]);
  const [userById, setUserById] = useState(null);

  useEffect(() => {
    (async () => {
      setResUser(await byId(user._id));
    })();
  }, []);

  useEffect(() => {
    useErrorUser(resUser, setResUser, setUserById);

    console.log(resUser);
  }, [resUser]);
  console.log("user", resUser);

  return (
    <>
      <div>
        <h3>Seguidos</h3>
        {userById != null ? (
          <ul>
            {userById.followed.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <p>No sigues a nadie</p>
        )}
      </div>
      <div>
        <h3>Seguidores</h3>
        {userById != null ? (
          <ul>
            {userById.followers.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <p>No tienes seguidores</p>
        )}
      </div>
    </>
  );
};
