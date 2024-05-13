import { updateToken } from "../utils";
import { APITraviesos } from "./serviceApi.config";

// ----------------createCity ------------------------
//! SUPER ADMIN
export const createCity = async (formData) => {
  return APITraviesos.post(`/city/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------get By Id ------------------------

export const cityById = async (idCity) => {
  return APITraviesos.get(`/city/finById/${idCity}`)
    .then((res) => res)
    .catch((error) => error);
};

// ----------------toggleEvent ------------------------

export const toggleEvent = async (idCity, idEvent, formData) => {
  return APITraviesos.patch(
    `/city/cities/${idCity}/events/${idEvent}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${updateToken()}`,
      },
    }
  )
    .then((res) => res)
    .catch((error) => error);
};

// ----------------toggleCountry ------------------------

export const toggleCountry = async (idCity, idCountry) => {
  return APITraviesos.patch(`/city/cities/${idCity}/country/${idCountry}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------updateCity ------------------------

export const updateCity = async (idCity, formData) => {
  return APITraviesos.patch(`/city/update/${idCity}`, formData, {
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
export const deleteCity = async (idCity) => {
  return APITraviesos.delete(`/city/${idCity}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
