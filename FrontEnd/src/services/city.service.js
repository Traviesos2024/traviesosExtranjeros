import { APITraviesos } from "./serviceApi.config";

//! --HAY QUE METER EL TOKEN A los que tengan marca roja---

// ----------------createCity ------------------------
//! SUPER ADMIN
export const createCity = async (formData) => {
  return APITraviesos.post(`/city/create`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
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
//! TOKEN
export const toggleEvent = async (idCity, idEvent, formData) => {
  return APITraviesos.patch(
    `/city/cities/${idCity}/events/${idEvent}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  )
    .then((res) => res)
    .catch((error) => error);
};

// ----------------toggleCountry ------------------------
//! TOKEN
export const toggleCountry = async (idCity, idCountry, formData) => {
  return APITraviesos.patch(
    `/city/cities/${idCity}/country/${idCountry}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  )
    .then((res) => res)
    .catch((error) => error);
};

// ----------------updateCity ------------------------
//! TOKEN
export const updateCity = async (idCity, formData) => {
  return APITraviesos.patch(`/city/update/${idCity}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------deleteCity ------------------------
//! TOKEN
export const deleteCity = async (idCity) => {
  return APITraviesos.delete(`/city/${idCity}`)
    .then((res) => res)
    .catch((error) => error);
};
