import { useState, useEffect, componentDidMount } from "react";
import "./Register.css";
import { useErrorRegister } from "../hooks";
import { useAuth } from "../context/authContext";
import { getChatById } from "../services/chats.service";
import { createMessage } from "../services/message.service";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
export const ChatPage = () => {
  //! 1) crear los estados
  const { chatId } = useParams();
  const [send, setSend] = useState(false);
  const [ok, setOk] = useState(false);
  const { allUser, setAllUser, bridgeData } = useAuth();
  const [chat, setChat] = useState(null);
  const [res, setRes] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(true);

  const { register, handleSubmit, setValue } = useForm();

  //! 4) useEffects que gestionan la repuesta y manejan los errores

  useEffect(() => {
    useErrorRegister(res, setRes, setOk);
    if (user && isLoading) {
      async function fetchChat() {
        try {
          // await async "fetchChat()" function
          const chatResponse = await getChatById(chatId);

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

    const newMessage = await createMessage(chat.userTwo._id, customFormData);
    chat.messages = [...chat.messages, newMessage.data.comment];
    setChat(chat);
    setRes(newMessage.data);
    setSend(false);
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
        <form id="formularios" onSubmit={handleSubmit(formSubmit)}>
          <label htmlFor="content">Escribe tu mensaje:</label>
          <textarea
            id="content"
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
