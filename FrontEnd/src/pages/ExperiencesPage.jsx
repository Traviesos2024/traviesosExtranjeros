import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Register.css";
import { useErrorRegister } from "../hooks";
import { useAuth } from "../context/authContext";
import { Uploadfile } from "../components";
import { createExperience } from "../services/experiences.service";
import { Navigate } from "react-router-dom";

export const ExperiencesPage = () => {
  //! 1) crear los estados

  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [ok, setOk] = useState(false);
  const { allUser, setAllUser, bridgeData } = useAuth();
  const [experiences, setExperiences] = useState([]);
  const [showForm, setShowForm] = useState(false);

  //! 2) llamada al hook de react hook form

  const { register, handleSubmit, setValue } = useForm();

  //! 3) la funcion que gestiona los datos del formulario

  const formSubmit = async (formData) => {
    const inputFile = document.getElementById("file-upload").files;

    //* condicional para enviar los datos del formulario al backend tanto si hay subida imagen como si no
    if (inputFile.lenght != 0) {
      // si es diferente a 0 es que hay algo dentro de files
      const customFormData = {
        ...formData,
        image: inputFile[0],
      };
      //llamada al backend
      setSend(true);
      setRes(await createExperience(customFormData));
      setSend(false);
    } else {
      // si no hay imagen solo hago una copia del formData
      const customFormData = {
        ...formData,
      };
      //llamada al backend
      setSend(true);
      setRes(await createExperience(customFormData));
      setSend(false);
    }
  };

  //! 4) useEffects que gestionan la repuesta y manejan los errores

  useEffect(() => {
    useErrorRegister(res, setRes, setOk);
    // si la res es ok llamamos a la funcion puente del contexto y le pasamos el parámetro ALLUSER
    if (res?.status == 200) {
      setExperiences([...experiences, response.data]);
      bridgeData("ALLUSER");
    }
  }, [res]);

  useEffect(() => {
    console.log("allUser 🤡", allUser);
  }, [allUser]);

  //! 5) estados de navegacion

  if (ok) {
    return <Navigate to="/experiences" />;
  }
  const toggleFormVisibility = () => {
    setShowForm(!showForm); // Cambia el estado de visibilidad del formulario
  };

  return (
    <div>
      <h2>Experiences</h2>
      <p>Discover and share experiences with others living abroad!</p>
      <div className="form-wrap">
        <button className="btn" onClick={toggleFormVisibility}>
          Crear experiencia
        </button>
        {showForm && (
          <div>
            <h1>Create experience</h1>
            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="user_container form-group">
                <input
                  className="input_user"
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="false"
                  placeholder="Vinos"
                  {...register("name", { required: true })}
                />
                <label htmlFor="custom-input" className="custom-placeholder">
                  Title
                </label>
              </div>
              <div className="description_container form-group">
                <input
                  className="input_user"
                  type="texto"
                  id="description"
                  name="description"
                  autoComplete="false"
                  placeholder="Fuimos de vinos a Honolulu"
                  {...register("description", { required: true })}
                />
                <label htmlFor="custom-input" className="custom-placeholder">
                  Description
                </label>
              </div>

              <div>
                <Uploadfile required />
              </div>

              <div className="btn_container">
                <button
                  className="btn"
                  type="submit"
                  disabled={send}
                  style={{ background: send ? "#49c1a388" : "#2f7a67" }}
                >
                  {send ? "Cargando..." : "New experience"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <ul>
        {experiences.map((experience) => (
          <li key={experience._id}>
            <h3>{experience.name}</h3>
            <img
              src={experience.image}
              alt={experience.name}
              style={{ maxWidth: "200px" }}
            />
            <p>{experience.description}</p>
            <p>Created by: {experience.createdBy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
