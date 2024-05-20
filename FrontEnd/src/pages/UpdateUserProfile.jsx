import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateError } from "../hooks";
import { Uploadfile } from "../components";
import { byId, updateUser } from "../services/user.service";
import { useAuth } from "../context/authContext";
import { fetchCountries, fetchCities } from "../services/user.service";

export const UpdateProfile = () => {
  //! --------------- estados

  const [resEdit, setResEdit] = useState({});
  const [sendEdit, setSendEdit] = useState(false);
  const [data, setData] = useState(null);

  //! --------------- hooks

  const { user, logout } = useAuth();
  const { handleSubmit, register, watch } = useForm();
  const [countries, setCountries] = useState(user?.country);
  const [cities, setCities] = useState(user?.city);
  // const [interests, setInterests] = useState(user?.interests)

  const fetchData = async () => {
    const dataForState = await byId(user?._id);
    setData(dataForState);
    setIsDataReady(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const editProfileFormSubmit = async (formData) => {
    Swal.fire({
      title: "Save changes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(73, 193, 162)",
      cancelButtonColor: "#DB3236",
      cancelButtonText: "Cancel",
      confirmButtonText: "Save",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const inputFile = document.getElementById("file-upload").files;
        if (inputFile.length != 0) {
          const customFormData = {
            ...formData,
            image: inputFile[0],
          };

          setSendEdit(true);
          setResEdit(await updateUser(customFormData));
          setSendEdit(false);
        } else {
          const customFormData = {
            ...formData,
            image: user?.image,
          };
          setSendEdit(true);
          setResEdit(await updateUser(customFormData));
          setSendEdit(false);
        }
      }
    });
  };
  //! ----- useEffect

  useEffect(() => {
    useUpdateError(resEdit, setResEdit, logout);
  }, [resEdit]);

  //! 5) cargar países al montar el componente
  useEffect(() => {
    const loadCountries = async () => {
      const countriesData = await fetchCountries();
      setCountries(countriesData);
    };
    loadCountries();
    console.log(loadCountries);
  }, []);

  //! 6) cargar ciudades cuando se seleccione un país
  const selectedCountry = watch("country");
  useEffect(() => {
    if (selectedCountry) {
      const loadCities = async () => {
        const citiesData = await fetchCities(selectedCountry);
        setCities(citiesData);
      };
      loadCities();
    }
  }, [selectedCountry]);

  return (
    <>
      {data && (
        <>
          <input width={"40vw"} onSubmit={handleSubmit(editProfileFormSubmit)}>
            <h1>Edit your information </h1>
            <div className="country_container form-group">
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
            {selectedCountry && (
              <div className="city_container form-group">
                <select
                  className="input_user"
                  id="city"
                  name="city"
                  country=""
                  {...register("city", { required: true })}
                >
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city._id} value={city._id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="city" className="custom-placeholder">
                  City
                </label>
              </div>
            )}
            <div>
              <Uploadfile />
            </div>
            //! comentado para la descripción del usuario por si queremos
            meterlo
            {/* <LabelAndInput inputHeight={"60px"}>
                Brief description of you
                <textarea
                  type="text"
                  defaultValue={data?.data?.description}
                  name="description"
                  autoComplete="false"
                  {...register("description")}
                />
              </LabelAndInput> */}
            <button
              type="submit"
              width={"70%"}
              disabled={sendEdit}
              variant={sendEdit ? "loading" : "normal"}
            >
              SAVE CHANGES
            </button>
          </input>
        </>
      )}
    </>
  );
};
