import { APITraviesos } from "./serviceApi.config";

//! --HAY QUE METER EL TOKEN A los que tengan marca roja---

// ----------------createCountry ------------------------
//! SUPER ADMIN
export const createCountry = async (formData) => {
  return APITraviesos.post(`/country/create`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------get By Id ------------------------

export const countryById = async (idCountry) => {
  return APITraviesos.get(`/country/finById/${idCountry}`)
    .then((res) => res)
    .catch((error) => error);
};

// ----------------update ------------------------
//! TOKEN
export const update = async (idCountry, formData) => {
  return APITraviesos.patch(`/country/update/${idCountry}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------deleteCity ------------------------
//! TOKEN
export const deleteCity = async (idCountry) => {
  return APITraviesos.delete(`/country/${idCountry}`)
    .then((res) => res)
    .catch((error) => error);
};
