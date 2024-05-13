import { updateToken } from "../utils";
import { APITraviesos } from "./serviceApi.config";

// ----------------createEvent ------------------------

export const createEvent = async (formData) => {
  return APITraviesos.post(`/event/createEvent`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${updateToken()}`,
    },
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

export const toggleCity = async (idCity, idEvent) => {
  return APITraviesos.patch(`/event/cities/${idCity}/events/${idEvent}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------updateEvent ------------------------

export const updateEvent = async (idEvent, formData) => {
  return APITraviesos.patch(`/event/${idEvent}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------deleteEvent ------------------------

export const deleteEvent = async (id) => {
  return APITraviesos.delete(`/event/${id}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------toggleLikeEvent ------------------------

export const toggleLikeEvent = async (idEvent) => {
  return APITraviesos.patch(`/event/like/${idEvent}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------toggleFollowEvent ------------------------

export const toggleFollowEvent = async (idEvent) => {
  return APITraviesos.patch(`/event/follow/${idEvent}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
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
