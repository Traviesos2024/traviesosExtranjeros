import { APITraviesos } from "./serviceApi.config";

//! --HAY QUE METER EL TOKEN A los que tengan marca roja---

// ----------------createEvent ------------------------
//! SUPER ADMIN
export const createEvent = async (formData) => {
  return APITraviesos.post(`/event/createEvent`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------getAll------------------------

export const getAll = async () => {
  return APITraviesos.get(`/event/getAll`)
    .then((res) => res)
    .catch((error) => error);
};

// ----------------getByName------------------------

export const getByName = async (name) => {
  return APITraviesos.get(`/event/get/name/${name}`)
    .then((res) => res)
    .catch((error) => error);
};

// ----------------getByCategory------------------------

export const getByCategory = async (category) => {
  return APITraviesos.get(`/event/get/category/${category}`)
    .then((res) => res)
    .catch((error) => error);
};

// ----------------getByCity------------------------

export const getByCity = async (city) => {
  return APITraviesos.get(`/event/get/city/${city}`)
    .then((res) => res)
    .catch((error) => error);
};

// ----------------toggleCity ------------------------
//! TOKEN
export const toggleCity = async (idCity, idEvent, formData) => {
  return APITraviesos.patch(
    `/event/cities/${idCity}/events/${idEvent}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  )
    .then((res) => res)
    .catch((error) => error);
};

// ----------------updateEvent ------------------------
//! TOKEN
export const updateEvent = async (idEvent, formData) => {
  return APITraviesos.patch(`/event/${idEvent}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------deleteEvent ------------------------
//! TOKEN
export const deleteEvent = async (id) => {
  return APITraviesos.delete(`/event/${id}`)
    .then((res) => res)
    .catch((error) => error);
};

// ----------------toggleLikeEvent ------------------------
//! TOKEN
export const toggleLikeEvent = async (idEvent, formData) => {
  return APITraviesos.patch(`/event/like/${idEvent}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------toggleFollowEvent ------------------------
//! TOKEN
export const toggleFollowEvent = async (idEvent, formData) => {
  return APITraviesos.patch(`/event/follow/${idEvent}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------sortByDate------------------------

export const sortByDate = async () => {
  return APITraviesos.get(`/event/sortByDate`)
    .then((res) => res)
    .catch((error) => error);
};
