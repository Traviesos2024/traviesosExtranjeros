// impor * "./UpdateExperience.css"

import { useForm } from "react-hook-form";
import { FigureExperience, NavProfile } from "../components";
import "./FormProfile.css";
import { Uploadfile } from "../components";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { update } from "../services/experiences.service";
import { useUpdateError } from "../hooks";

export const UpdateExperience = () => {
  const { user, setUser, logout } = useAuth();
  const { handleSubmit, register} = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);

  const defaultData = {
    name: user?.user,
  };

  const formSubmit = (formData) => {
    Swal.fire({
      title: "Are you sure you want to change your data profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(73, 193, 162)",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const inputFile = document.getElementById("file-upload").files;

        const formDataToSubmit = new FormData();
        formDataToSubmit.append("name", formData.name);
        formDataToSubmit.append("description", formData.description);

        if (inputFile.length != 0) {
          const custonFormData = {
            ...formData,
            image: inputFile[0],
          };

          setSend(true);
          setRes(await update(custonFormData));
          setSend(false);
        } else {
          const custonFormData = {
            ...formData,
            image: inputFile[0],
          };
          setSend(true);
          setRes(await update(custonFormData));
          setSend(false);
        }
      }
    });
  };

  useEffect(() => {
    console.log(res);
    useUpdateError(res, setRes, setUser, logout);
  }, [res]);

//  
  return (
    <>
      <NavProfile />
      <div className="containerProfile">
      <div className="containerDataNoChange">
          <FigureExperience experience={idExperience} />
        </div>
        <div className="form-wrap formProfile">
          <h1>Change your data profile ♻</h1>
          <p>Please, enter your new data profile</p>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="user_container form-group">
              <input
                className="input_user"
                type="text"
                id="name"
                name="name"
                autoComplete="false"
                defaultValue={defaultData?.name}
                {...register("name")}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
                Username
              </label>
            </div>
            <div className="user_container form-group">
              <input
                className="input_user"
                type="text"
                id="description"
                name="name"
                autoComplete="false"
                defaultValue={defaultData?.name}
                {...register("name")}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
                Username
              </label>
            </div>
            
            <Uploadfile />

            <div className="btn_container">
              <button
                className="btn"
                type="submit"
                disabled={send}
                style={{ background: send ? "#49c1a388" : "#49c1a2" }}
              >
                CHANGE DATA <EXPERIENCE></EXPERIENCE>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
