import { updateToken } from "../utils";
import { APITraviesos } from "./serviceApi.config";

// ----------------createExperience ------------------------

export const createExperience = async (formData) => {
  return APITraviesos.post(`/experiences/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------byId------------------------

export const byId = async (idExperience) => {
  return APITraviesos.get(`/experiences/finById/${idExperience}`)
    .then((res) => res)
    .catch((error) => error);
};

// ----------------toggleLikeExperience ------------------------

export const toggleLikeExperience = async (idExperience) => {
  return APITraviesos.patch(`/experiences/like/${idExperience}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------toggleEvent ------------------------

export const toggleEvent = async (idExperience, idEvent) => {
  return APITraviesos.patch(
    `/experiences/experience/${idExperience}/events/${idEvent}`,
    {
      headers: {
        Authorization: `Bearer ${updateToken()}`,
      },
    }
  )
    .then((res) => res)
    .catch((error) => error);
};

// ----------------update ------------------------

export const update = async (idExperience, formData) => {
  return APITraviesos.patch(`/experiences/update/${idExperience}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------deleteExperience ------------------------

export const deleteExperience = async (idExperience) => {
  return APITraviesos.delete(`/experiences/${idExperience}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
