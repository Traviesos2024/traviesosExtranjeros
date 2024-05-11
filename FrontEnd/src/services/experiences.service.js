import { APITraviesos } from "./serviceApi.config";

//! --HAY QUE METER EL TOKEN A los que tengan marca roja---

// ----------------createExperience ------------------------
//! TOKEN
export const createExperience = async (formData) => {
  return APITraviesos.post(`/experiences/create`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
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
//! TOKEN
export const toggleLikeExperience = async (idExperience) => {
  return APITraviesos.patch(`/experiences/like/${idExperience}`)
    .then((res) => res)
    .catch((error) => error);
};

// ----------------toggleEvent ------------------------
//! TOKEN
export const toggleEvent = async (idExperience, idEvent, formData) => {
  return APITraviesos.patch(
    `/experiences/experience/${idExperience}/events/${idEvent}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  )
    .then((res) => res)
    .catch((error) => error);
};

// ----------------update ------------------------
//! TOKEN
export const update = async (idExperience, formData) => {
  return APITraviesos.patch(`/experiences/update/${idExperience}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------deleteExperience ------------------------
//! TOKEN
export const deleteExperience = async (idExperience) => {
  return APITraviesos.delete(`/experiences/${idExperience}`)
    .then((res) => res)
    .catch((error) => error);
};
