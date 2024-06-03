import { useForm } from "react-hook-form";
import "./FormProfile.css";
import { Uploadfile } from "../components";
import { useEffect, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { useErrorCountryDetalle} from "../hooks";
import { Navigate, useParams } from "react-router-dom";
import { countryById, update } from "../services/country.service";

export const UpdateCountry = () => {
  const [ok, setOk] = useState(false);
  const [countrieById, setCountrieById] = useState(null);
  const { id } = useParams();
  const [resCountrie, setResCountrie] = useState(null);
  const { handleSubmit, register } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [countries, setCountries] = useState([]);


//   const defaultData = {
//     name: countries?._id?.name,
//     description: countries?._id?.description,
//     tipicalFood: countries?._id.tipicalFood,
//     traditions: countries?._id.traditions,
//   };

  const formSubmit = (formData) => {
    Swal.fire({
      title: "¿Estás seguro de que quieres actualizar los datos?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(73, 193, 162)",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const inputFile = document.getElementById("file-upload").files;
        let customFormData = formData;

        if (inputFile.length != 0) {
          customFormData = {
            ...formData,
            image: inputFile[0],
          };
        }

        setSend(true);
        setRes(await update(id, customFormData));
        setSend(false);
      }
    });
  };

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await countryById(id);
      response?.status == 200 && setCountrieById(response.data);
      setResCountrie(response);
    };
    fetchCountries();
  }, [id]);

  useEffect(() => {
    res?.status == 200 && setOk(true);
  }, [res]);

  //---------PARA SELECCIONAR EL PAÍS-------
  useEffect(() => {
    const loadCountries = async () => {
      const countriesData = await fetchCountries();
      setCountries(countriesData);
    };
    loadCountries();
  }, []);

  if (ok) {
    return <Navigate to="/country" />;
  }

  return (
    <>
      <div className="containerProfile">
        <div className="form-wrap formProfile">
          <h1>Actualiza tu País ♻</h1>
          <p>Introduce los nuevos datos del país</p>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="user_container form-group">
            <div className="user_container form-group">
              <select
                className="input_user"
                id="country"
                name="country"
                {...register("country", { required: true })}
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country._id} value={country._id}>
                    {country.name}
                  </option>
                ))}
              </select>
              <label htmlFor="country" className="custom-placeholder">
                Country
              </label>
            </div>
              <label htmlFor="custom-input" className="custom-placeholder">
                Nombre del país
              </label>
              <input
                className="input_user"
                type="text"
                id="name"
                name="name"
                autoComplete="false"
                // defaultValue={defaultData?.name}
                {...register("name")}
              />
            </div>

            <div className="description_container form-group">
              <label htmlFor="description" className="custom-placeholder">
                Descripción
              </label>
              <input
                className="input_user"
                type="text"
                id="description"
                name="description"
                // defaultValue={defaultData?.description}
                {...register("description")}
              />
            </div>
            <div className="description_container form-group">
            <label htmlFor="custom-input" className="custom-placeholder">
                Comida típica
              </label>
              <input
                className="input_user"
                type="text"
                id="tipicalFood"
                name="tipicalFood"
                autoComplete="false"
                // defaultValue={defaultData?.tipicalFood}
                {...register("tipicalFood")}
              />
            </div>
            <div className="description_container form-group"> 
             <label htmlFor="custom-input" className="custom-placeholder">
                Tradiciones
              </label>
              <input
                className="input_user"
                type="text"
                id="traditions"
                name="traditions"
                autoComplete="false"
                // defaultValue={defaultData?.traditions}
                {...register("traditions")}
              />
            </div>

            <Uploadfile />

            <div className="btn_container">
              <button
                className="btn"
                type="submit"
                disabled={send}
                style={{ background: send ? "#49c1a388" : "#49c1a2" }}
              >
                ACTUALIZA LOS DATOS
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
