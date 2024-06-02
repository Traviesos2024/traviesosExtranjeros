

import { useForm } from "react-hook-form";
import "./FormProfile.css";
import { Uploadfile } from "../components";
import { useEffect, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { updateEvent, eventById } from "../services/events.service";
import { useErrorEventDetalle } from "../hooks";
import { Navigate, useParams } from "react-router-dom";

export const UpdateEvent = () => {
  const [ok, setOk] = useState(false);
  const [eventoById, setEventById] = useState(null);
  const { id } = useParams();
  const [resEvent, setResEvent] = useState(null);
  const { handleSubmit, register } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);

  const defaultData = {
    name: eventoById?.name,
    description: eventoById?.description,
  };

  const formSubmit = (formData) => {
    Swal.fire({
      title: "Are you sure you want to change your event data?",
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
          formDataToSubmit.append("image", inputFile[0]);
        }

        setSend(true);
        setRes(await updateEvent(id, formDataToSubmit));
        setSend(false);
      }
    });
  };

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await eventById(id);
      setResEvent(response);
    };
    fetchEvent();
  }, [id]);

  useErrorEventDetalle(resEvent, setResEvent, setEventById);
  if (send) {
    return <Navigate to="/profile" />;

  }

  return (
    <>
      <div className="containerProfile">
        <div className="form-wrap formProfile">
          <h1>Change your event data ♻</h1>
          <p>Please, enter your new event data</p>
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
                Event name
              </label>
            </div>

            <div className="description_container form-group">
            <input
              className="input_user"
              type="text"
              id="description"
              name="description"
              defaultValue={defaultData?.description}
              {...register("description", { required: true })}
            />
            <label htmlFor="description" className="custom-placeholder">
              Descripción
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
                CHANGE EVENT DATA 
              </button>
            
            </div>
          </form>
        </div>
      </div>
    </>
  );
};


