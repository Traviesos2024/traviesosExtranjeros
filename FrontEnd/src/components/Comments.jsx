import { useState, useEffect, useRef } from "react";
import "./Comments.css";
import { useErrorRegister } from "../hooks";
import { useAuth } from "../context/authContext";
import { createMessage, toggleLikeMessage } from "../services/message.service";
import { getChatLastMessageHour } from "../utils";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

export const Comments = ({ selectedRecipient, commentsProps }) => {
  //! 1) crear los estados

  const [send, setSend] = useState(false);
  const [ok, setOk] = useState(false);
  const { allUser, setAllUser, bridgeData } = useAuth();
  const [comments, setComments] = useState([]);
  const [res, setRes] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef();
  const navigate = useNavigate();
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
    if (user && isLoading && selectedRecipient) {
      async function fetchComments() {
        try {
          // await async "fetchComments()" function
          await setComments(commentsProps);
          setIsLoading(false);

          bridgeData("ALLUSER");
        } catch (err) {
          console.log("Error occured when fetching comments");
        }
      }
      fetchComments();
    }
  }, [isLoading]);

  useEffect(() => {
    console.log("allUser 🤡", allUser);
  }, [allUser]);

  useEffect(() => {
    scrollToBottom();
  }, [comments]);
  //! 5) estados de navegacion

  if (isLoading) {
    return <h1>cargando...</h1>;
  }

  const formSubmit = async (formData) => {
    const customFormData = {
      ...formData,
      type: "public",
    };
    //llamada al backend
    setSend(true);

    const newComment = await createMessage(selectedRecipient, customFormData);

    setComments([...comments, newComment.data.recipient.comments.at(-1)]);
    setRes(newComment.data);
    setSend(false);
    reset();
  };

  function onClickUserName(commentOwnerId) {
    navigate({
      pathname: "/chats",
      search: `?commentOwnerId=${commentOwnerId}`,
    });
  }
  async function onToggleLike(comment) {
    const updatedMessage = await toggleLikeMessage(comment._id);

    let commentsToUpdate = [...comments];
    const indexOfMessageToReplace = commentsToUpdate.findIndex(
      (message) => message._id == updatedMessage.data.message._id
    );
    commentsToUpdate[indexOfMessageToReplace] = updatedMessage.data.message;

    setComments(commentsToUpdate);
  }
  return (
    <>
      <div className="chat-wrapper">
        {comments && comments.length > 0 ? (
          <div className="text-div">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className={
                  user._id == comment.owner || user._id == comment.owner._id
                    ? "my-text-wrapper"
                    : "friend-text-wrapper"
                }
              >
                <div
                  className={
                    user._id == comment.owner || user._id == comment.owner._id
                      ? "my-text"
                      : "friend-text"
                  }
                >
                  <h5 onClick={() => onClickUserName(comment.owner._id)}>
                    {comment.owner.name}:
                  </h5>
                  <span
                    className={
                      comment.likes.find((userFav) => userFav._id == user._id)
                        ? "material-symbols-outlined like"
                        : "material-symbols-outlined"
                    }
                    onClick={() => onToggleLike(comment)}
                  >
                    favorite
                  </span>

                  <div className="comment-and-hour">
                    <p> {comment.content}</p>
                    <small className="chat-time">
                      {getChatLastMessageHour(comment.createdAt)}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3>No comments</h3>
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
              {send ? "Cargando..." : "New comment"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
