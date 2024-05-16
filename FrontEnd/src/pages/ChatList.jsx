import { useState, useEffect, componentDidMount } from "react";
import "./Register.css";
import { useErrorRegister } from "../hooks";
import { useAuth } from "../context/authContext";
import { getChatByUser } from "../services/chats.service";
import { useNavigate } from "react-router-dom";

export const ChatListPage = () => {
  //! 1) crear los estados

  const [ok, setOk] = useState(false);
  const { allUser, setAllUser, bridgeData } = useAuth();
  const [chats, setChats] = useState([]);
  const [res, setRes] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  //! 4) useEffects que gestionan la repuesta y manejan los errores

  useEffect(() => {
    useErrorRegister(res, setRes, setOk);
    if (user && isLoading) {
      console.log(user._id);
      async function fetchChats() {
        try {
          // await async "fetchChats()" function
          const chatsResponse = await getChatByUser(user._id);
          console.log(chatsResponse.data);
          await setChats(chatsResponse.data);
          setIsLoading(false);
          console.log(chats);
          bridgeData("ALLUSER");
        } catch (err) {
          console.log("Error occured when fetching chats");
        }
      }
      fetchChats();
    }
  }, [isLoading]);

  useEffect(() => {
    console.log("allUser 🤡", allUser);
  }, [allUser]);

  //! 5) estados de navegacion

  if (isLoading) {
    return <h1>cargando...</h1>;
  }
  const goToChat = (chatId) => {
    // return <Navigate to=`/chat/` />;
    // Navegar a Chat
  };

  return (
    <>
      <div>
        <h2>Chats</h2>
        <p>These are the chats you have with others living abroad!</p>
        {chats.length > 0 ? (
          <ul>
            {chats.map((chat) => (
              <li key={chat._id} onClick={() => navigate(`/chat/${chat._id}`)}>
                <h3>{chat._id}</h3>
              </li>
            ))}
          </ul>
        ) : (
          <h3>You have no chats</h3>
        )}
      </div>
    </>
  );
};
