import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useErrorRegister } from "../hooks/useErrorRegister";
import "./FormProfile.css";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import { fetchCountries } from "../services/user.service";
import { deleteCountry } from "../services/country.service";
// import { useDeleteCountry } from "../hooks";

export const DeleteCountryForm = () => {
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [ok, setOk] = useState(false);
  const { user, allUser, setAllUser, bridgeData } = useAuth();
  const [countries, setCountries] = useState([]);
  const [city, setCity] = useState([]);
  const [resDelete, setResDelete] = useState({});

  const { register, handleSubmit, setValue } = useForm();

  const formSubmit = async (formData) => {
    setSend(true);
    setResDelete(await deleteCountry(formData.country));
    setSend(false);
  };

  // useEffect(() => {
  //   useDeleteCountry(res, setRes, setOk);
  //   if (res?.status === 200) {
  //     setCountry([...countries, res.data]);
  //     bridgeData("ALLUSER");
  //   }
  // }, [res]);
  useEffect(() => {
    useErrorRegister(res, setRes, setOk);
    if (res?.status === 200) {
      setCity([...city, res.data]);
    }
  }, [res]);

  useEffect(() => {
    resDelete?.status == 200 && setOk(true);
  }, [resDelete]);

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
    <form onSubmit={handleSubmit(formSubmit)}>
      <div>
        <div className="form-wrap">
          <h3>Eliminar país</h3>

          <select
            className="input_user"
            id="country"
            name="country"
            {...register("country", { required: true })}
          >
            <option value="">Seleccionar país</option>
            {countries.map((country) => (
              <option key={country._id} value={country._id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="user_container form-group">
          <input
            type="file"
            id="file-upload"
            name="file-upload"
            {...register("image")}
          />
        </div>
        <button type="submit" disabled={send}>
          {send ? "Enviando..." : "Eliminar"}
        </button>
      </div>
    </form>
  );
};
