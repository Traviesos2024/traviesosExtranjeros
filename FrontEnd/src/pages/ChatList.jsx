import { useState, useEffect } from "react";
import { ChatPage } from "./index";
import "./ChatList.css";
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
  const [selectedChat, setSelectedChat] = useState(undefined);

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

  function getChatLastMessageHour(lastMessageDate) {
    const lastMessageHour =
      (new Date(lastMessageDate).getHours() < 10 ? "0" : "") +
      new Date(lastMessageDate).getHours() +
      ":" +
      (new Date(lastMessageDate).getMinutes() < 10 ? "0" : "") +
      new Date(lastMessageDate).getMinutes();
    return lastMessageHour;
  }
  function selectChat(chat) {
    if (window.innerWidth > 760) {
      setSelectedChat(chat._id);
    } else {
      navigate(`/chat/${chat._id}`);
    }
  }
  return (
    <>
      <div className="chat-page-container">
        <div className="chats-list-wrapper">
          <h2>Chats</h2>
          {chats && chats.length > 0 ? (
            <div>
              {chats.map((chat) => (
                <div
                  className={
                    selectedChat && chat._id == selectedChat
                      ? "chat-list-wrapper selected"
                      : "chat-list-wrapper"
                  }
                  key={chat._id}
                  onClick={() => selectChat(chat)}
                >
                  <img
                    className="chat-list-image"
                    src={chat.userTwo.image}
                    alt="user"
                  />
                  <div>
                    <h3>{chat.userTwo.name}</h3>
                    <p>{chat.messages.at(-1).content}</p>
                  </div>
                  <small className="chat-time">
                    {getChatLastMessageHour(chat.messages.at(-1).createdAt)}
                  </small>
                </div>
              ))}
            </div>
          ) : (
            <h3>You have no chats</h3>
          )}
        </div>
        {selectedChat ? (
          <div className="chatPage-wrapper">
            <ChatPage selectedChat={selectedChat} />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
