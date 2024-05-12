import { APITraviesos } from "./serviceApi.config";

// ----------------createCountry ------------------------
//! SUPER ADMIN
export const createCountry = async (formData) => {
  return APITraviesos.post(`/country/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------gcountryById ------------------------

export const countryById = async (idCountry) => {
  return APITraviesos.get(`/country/finById/${idCountry}`)
    .then((res) => res)
    .catch((error) => error);
};

// ----------------update ------------------------

export const update = async (idCountry, formData) => {
  return APITraviesos.patch(`/country/update/${idCountry}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------deleteCity ------------------------
//! SUPER ADMIN
export const deleteCity = async (idCountry) => {
  return APITraviesos.delete(`/country/${idCountry}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
