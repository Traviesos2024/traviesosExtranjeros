import "./ForgotPassword.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { forgotPasswordUser } from "../services/user.service";
import { useForgotPasswordError } from "../hooks";

export const ForgotPassword = () => {
  const { handleSubmit, register } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [forgotOk, setForgotOk] = useState(false);

  const formSubmit = async (formData) => {
    setSend(true);
    setRes(await forgotPasswordUser(formData));
    setSend(false);
  };

  useEffect(() => {
    useForgotPasswordError(res, setRes, setForgotOk);
  }, [res]);

  if (forgotOk) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="form-wrap">
        <h1>Change your password 💱</h1>

        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="email"
              name="email"
              autoComplete="false"
              {...register("email", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Email
            </label>
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#FEB0CD" }}
            >
              Change password
            </button>
          </div>

          <p className="bottom-text">
            <small>Enter your email to send you the new password 💌</small>
          </p>
        </form>
      </div>
    </>
  );
};
