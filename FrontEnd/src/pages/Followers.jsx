import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useErrorUser } from "../hooks";
import { byId } from "../services/user.service";

export const Followers = ({}) => {
  const { user } = useAuth();
  console.log("Soy el usuario logado 🥑", user);
  // const [followedData, setFollowedData] = useState([]);
  // const [followersData, setFollowersData] = useState([]);
  const [resUser, setResUser] = useState([]);
  const [userById, setUserById] = useState(null);

  // useEffect(() => {
  //   if (user.followed && user.followed.length > 0) {
  //     fetchUserDetails(user.followed).then(setFollowedData);
  //   }
  //   if (user.followers && user.followers.length > 0) {
  //     fetchUserDetails(user.followers).then(setFollowersData);
  //   }
  // }, []);

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

    // <>
    //   <div>
    //     <h3>Seguidos</h3>
    //     {followedData.length > 0 ? (
    //       <ul>
    //         {followedData.map((followedUser, index) => (
    //           <li key={index}>{followedUser.name}</li>
    //         ))}
    //       </ul>
    //     ) : (
    //       <p>No sigues a nadie</p>
    //     )}
    //   </div>
    //   <div>
    //     <h3>Seguidores</h3>
    //     {followersData.length > 0 ? (
    //       <ul>
    //         {followersData.map((followerUser, index) => (
    //           <li key={index}>{followerUser.name}</li>
    //         ))}
    //       </ul>
    //     ) : (
    //       <p>No tienes seguidores</p>
    //     )}
    //   </div>
    // </>
  );
};
