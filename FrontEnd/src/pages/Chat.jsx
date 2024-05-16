import { useState, useEffect, componentDidMount } from "react";
import "./Register.css";
import { useErrorRegister } from "../hooks";
import { useAuth } from "../context/authContext";
import { getChatById } from "../services/chats.service";
import { useParams } from "react-router-dom";

export const ChatPage = () => {
  //! 1) crear los estados
  const { chatId } = useParams();

  const [ok, setOk] = useState(false);
  const { allUser, setAllUser, bridgeData } = useAuth();
  const [chat, setChat] = useState(null);
  const [res, setRes] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(true);
  //! 4) useEffects que gestionan la repuesta y manejan los errores

  useEffect(() => {
    useErrorRegister(res, setRes, setOk);
    if (user && isLoading) {
      console.log(user._id);
      async function fetchChat() {
        try {
          // await async "fetchChat()" function
          const chatResponse = await getChatById(chatId);
          console.log(chatResponse.data);
          await setChat(chatResponse.data);
          setIsLoading(false);
          console.log(chat);
          bridgeData("ALLUSER");
        } catch (err) {
          console.log("Error occured when fetching chat");
        }
      }
      fetchChat();
    }
  }, [isLoading]);

  useEffect(() => {
    console.log("allUser 🤡", allUser);
  }, [allUser]);

  //! 5) estados de navegacion

  if (isLoading) {
    return <h1>cargando...</h1>;
  }
  const goToChat = () => {
    // Navegar a Chat
  };

  return (
    <>
      <div>
        <h2>Chat</h2>
        <p>These are the chats you have with others living abroad!</p>
        {chat && chat.messages ? (
          <ul>
            <h3>{chat.userTwo.name}</h3>
            {chat.messages.map((message) => (
              <li key={message._id}>
                <h3>{message.content}</h3>
              </li>
            ))}
          </ul>
        ) : (
          <h3>You have no messages</h3>
        )}
      </div>
    </>
  );
};
