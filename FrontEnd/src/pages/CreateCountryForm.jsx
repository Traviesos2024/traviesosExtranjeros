import "./CreateCountryForm.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createCountry } from "../services/country.service";
import { useErrorCreateCountry } from "../hooks";
import { useAuth } from "../context/authContext";
import { Link, Navigate } from "react-router-dom";
import { Uploadfile } from "../components";

export const CreateCountryForm = () => {
  //! 1) Crear los estados
  const [resCreateCountry, setResCreateCountry] = useState({});
  const [send, setSend] = useState(false);
  const [res, setRes] = useState({});
  const [ok, setOk] = useState(false);
  const { user, setUser, bridgeData } = useAuth();

  //! 2) Llamada al hook de react-hook-form
  const { register, handleSubmit, watch } = useForm();

  //! 3) La función que gestiona los datos del formulario
  const formSubmit = async (formData) => {
    const inputFile = document.getElementById("file-upload").files;

    const customFormData = { ...formData };
    if (inputFile.length !== 0) {
      customFormData.image = inputFile[0];
    }

    setSend(true);
    const response = await createCountry(customFormData);
    setResCreateCountry(response);
    setSend(false);
    // setSend(true);
    // setRes(await createCountry(customFormData));
    // setSend(false);
  };

  //! 4) useEffects que gestionan la respuesta y manejan los errores
  useEffect(() => {
    useErrorCreateCountry(resCreateCountry, setResCreateCountry, setOk);
    if (resCreateCountry?.status === 200) bridgeData("ALLUSER");
  }, [resCreateCountry]);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  //   //! 5) Cargar países al montar el componente
  //   useEffect(() => {
  //     const loadCountries = async () => {
  //       const countriesData = await fetchCountries();
  //       setCountries(countriesData);
  //     };
  //     loadCountries();
  //   }, []);

  //   //! 6) Cargar ciudades cuando se seleccione un país
  //   const selectedCountry = watch("country");
  //   useEffect(() => {
  //     if (selectedCountry) {
  //       const loadCities = async () => {
  //         const citiesData = await fetchCities(selectedCountry);
  //         setCities(citiesData);
  //       };
  //       loadCities();
  //     }
  //   }, [selectedCountry]);

  //! 7) Estados de navegación
  if (ok) {
    return <Navigate to="createCountry" />;
  }

  return (
    <div className="form-wrap">
      <h2>Añadir nuevo país</h2>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="user_container form-group">
          <input
            className="input_user"
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            placeholder="Alemania"
            {...register("name", { required: true })}
          />
          <label htmlFor="custom-input" className="custom-placeholder">
            País
          </label>
          <div className="description_container form-group">
            <input
              className="input_user"
              type="texto"
              id="description"
              name="description"
              autoComplete="false"
              placeholder=""
              {...register("description", { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Descripción
            </label>
          </div>
          <input
            className="input_user"
            type="texto"
            id="tipicalFood"
            name="tipicalFood"
            autoComplete="false"
            placeholder=""
            {...register("description", { required: true })}
          />
          <label htmlFor="custom-input" className="custom-placeholder">
            Comida típica
          </label>
          <input
            className="input_user"
            type="texto"
            id="traditions"
            name="traditions"
            autoComplete="false"
            placeholder=""
            {...register("traditions", { required: true })}
          />
          <label htmlFor="custom-input" className="custom-placeholder">
            Tradiciones
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
            {send ? "Cargando..." : "Aceptar"}
          </button>
        </div>
      </form>
    </div>
  );
};
