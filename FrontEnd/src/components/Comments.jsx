import { useState, useEffect, useRef } from "react";
import "./Comments.css";
import { useErrorRegister } from "../hooks";
import { useAuth } from "../context/authContext";
import {
  createMessage,
  getMessageByUserOwner,
} from "../services/message.service";
import { useForm } from "react-hook-form";

export const Comments = ({ selectedRecipient }) => {
  //! 1) crear los estados

  const [send, setSend] = useState(false);
  const [ok, setOk] = useState(false);
  const { allUser, setAllUser, bridgeData } = useAuth();
  const [comments, setComments] = useState([]);
  const [res, setRes] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  const { register, handleSubmit, setValue, reset } = useForm();

  //! 4) useEffects que gestionan la repuesta y manejan los errores

  useEffect(() => {
    useErrorRegister(res, setRes, setOk);
    if (user && isLoading && selectedRecipient) {
      async function fetchComments() {
        try {
          var commentsResponse = await getMessageByUserOwner(selectedRecipient);

          // await async "fetchComments()" function

          await setComments(commentsResponse.data);
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
    setComments([...comments, newComment.data]);
    setRes(newComment.data);
    setSend(false);
    reset();
  };

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
                  {comment.content}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3>No comments</h3>
        )}
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
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};
