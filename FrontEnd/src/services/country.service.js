import { updateToken } from "../utils";
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

// ----------------countryById ------------------------

export const countryById = async (idCountry) => {
  return APITraviesos.get(`/country/finById/${idCountry}`)
    .then((res) => res)
    .catch((error) => error);
};

// ----------------getAll------------------------

export const getAllCountry = async () => {
  return APITraviesos.get(`/country/getAll`)
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

// ----------------deleteCountry ------------------------
//! SUPER ADMIN
export const deleteCountry = async (idCountry) => {
  return APITraviesos.delete(`/country/${idCountry}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
