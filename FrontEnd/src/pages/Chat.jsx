import { useState, useEffect, componentDidMount, useRef } from "react";
import "./Chat.css";
import { useErrorRegister } from "../hooks";
import { useAuth } from "../context/authContext";
import { getChatById } from "../services/chats.service";
import { createMessage, toggleLikeMessage } from "../services/message.service";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getChatLastMessageHour } from "../utils";

export const ChatPage = ({ selectedChat, updateChatHour }) => {
  //! 1) crear los estados
  const { chatId } = useParams();
  const [send, setSend] = useState(false);
  const [ok, setOk] = useState(false);
  const { allUser, setAllUser, bridgeData } = useAuth();
  const [chat, setChat] = useState(null);
  const [res, setRes] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "center",
    });
  };

  const { register, handleSubmit, setValue, reset } = useForm();

  //! 4) useEffects que gestionan la repuesta y manejan los errores

  useEffect(() => {
    useErrorRegister(res, setRes, setOk);
    if (user && isLoading) {
      async function fetchChat() {
        try {
          if (selectedChat) {
            var chatResponse = await getChatById(selectedChat);
          } else {
            var chatResponse = await getChatById(chatId);
          }
          // await async "fetchChat()" function

          await setChat(chatResponse.data);
          setIsLoading(false);

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

  useEffect(() => {
    scrollToBottom();
  }, [chat]);
  //! 5) estados de navegacion

  if (isLoading) {
    return <h1>cargando...</h1>;
  }

  const formSubmit = async (formData) => {
    const customFormData = {
      ...formData,
      type: "private",
    };
    //llamada al backend
    setSend(true);

    var recipientId = chat.userTwo._id;

    if (user._id == chat.userTwo._id) {
      recipientId = chat.userOne._id;
    }
    const newMessage = await createMessage(recipientId, customFormData);
    chat.messages = [...chat.messages, newMessage.data.comment];
    await setChat(chat);
    setRes(newMessage.data);
    setSend(false);

    updateChatHour(chat);
    reset();
  };

  async function onToggleLike(comment) {
    const updatedMessage = await toggleLikeMessage(comment._id);

    let chatToUpdate = { ...chat };
    const indexOfMessageToReplace = chatToUpdate.messages.findIndex(
      (message) => message._id == updatedMessage.data.message._id
    );
    chatToUpdate.messages[indexOfMessageToReplace] =
      updatedMessage.data.message;

    await setChat(chatToUpdate);
  }

  return (
    <>
      <div className="chat-wrapper">
        <div className="chat-header-wrapper">
          <img
            className="chat-user-image"
            src={chat.userTwo.image}
            alt="user"
          />
          <h3>{chat.userTwo.name}</h3>
        </div>
        {chat && chat.messages && chat.messages.length > 0 ? (
          <div className="text-div">
            {chat.messages.map((message) => (
              <div
                key={message._id}
                className={
                  user._id == message.owner || user._id == message.owner._id
                    ? "my-text-wrapper"
                    : "friend-text-wrapper"
                }
              >
                <div
                  className={
                    user._id == message.owner || user._id == message.owner._id
                      ? "my-text"
                      : "friend-text"
                  }
                >
                  {message.content}
                </div>
                <small className="chat-time">
                  {getChatLastMessageHour(message?.createdAt)}
                </small>
                <span
                  className={
                    message?.likes?.find((userFav) => userFav?._id == user._id)
                      ? "material-symbols-outlined like"
                      : "material-symbols-outlined"
                  }
                  onClick={() => onToggleLike(message)}
                >
                  favorite
                </span>
              </div>
            ))}
          </div>
        ) : (
          <h3>You have no messages</h3>
        )}
        <div ref={messagesEndRef} />
        <form id="formularios" onSubmit={handleSubmit(formSubmit)}>
          <label htmlFor="content">Escribe tu mensaje:</label>
          <textarea
            id="content"
            className="textarea-message"
            name="content"
            {...register("content", { required: true })}
            required
          />

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#2f7a67" }}
            >
              {send ? "Cargando..." : "New message"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
