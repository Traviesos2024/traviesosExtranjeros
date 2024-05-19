import { updateToken } from "../utils";
import { APITraviesos } from "./serviceApi.config";
import axios from "axios";


//* ---------------------- REGISTER (registerWithRedirect)----------------------
export const registerUser = async (formData) => {
  return APITraviesos.post("/users/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

//* ------------------------------- SEND MAIL REDIRECT -------------------------
//!no estoy segura si lleva o no formData, creo que no
export const sendMailRedirect = async (id) => {
  return APITraviesos.post(`/users/register/sendMail/${id}`)
    .then((res) => res)
    .catch((error) => error);
};

//*  ------------------------------- RESEND CODE -------------------------------

export const resendCodeConfirmationUser = async (formData) => {
  return APITraviesos.post("/users/resend", formData)
    .then((res) => res)
    .catch((error) => error);
};

//* ------------------------------- CHECK CODE ---------------------------------

export const checkCodeConfirmationUser = async (formData) => {
  return APITraviesos.post("/users/check", formData)
    .then((res) => res)
    .catch((error) => error);
};

//* -------------------------------- LOGIN -------------------------------------

export const loginUserService = async (formData) => {
  return APITraviesos.post("/users/login", formData)
    .then((res) => res)
    .catch((error) => error);
};

//* -------------------------------- AUTOLOGIN ----------------------------------

export const autologinUser = async (formData) => {
  return APITraviesos.post("/users/login/autologin", formData)
    .then((res) => res)
    .catch((error) => error);
};

//* ----------------CAMBIO CONTRASEÑA SIN TOKEN (changePassword)--------

export const forgotPasswordUser = async (formData) => {
  return APITraviesos.patch("/users/forgotpassword", formData)
    .then((res) => res)
    .catch((error) => error);
};

//* ------------------------------- SEND PASSWORD -------------------------
//!no estoy segura si lleva o no formData, creo que no
export const sendPassword = async (id) => {
  return APITraviesos.patch(`/users/sendPassword/${id}`)
    .then((res) => res)
    .catch((error) => error);
};

//* -------------CAMBIO CONTRASEÑA CUANDO ESTAS LOGUEADO (modifyPassword)----

export const changePasswordUserToken = async (formData) => {
  return APITraviesos.patch("/users/changepassword", formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//* ------------------------------ UPDATE USER -----------------------

export const updateUser = async (formData) => {
  return APITraviesos.patch("/users/update/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------------------------GET ALL------------------------

export const getAll = async () => {
  return APITraviesos.get(`/users/`)
    .then((res) => res)
    .catch((error) => error);
};

// -----------------------------------byId------------------------

export const byId = async (id) => {
  return APITraviesos.get(`/users/finById/${id}`)
    .then((res) => res)
    .catch((error) => error);
};

// --------------------------------getByName------------------------

export const byName = async (name) => {
  return APITraviesos.get(`/users/finByName/${name}`)
    .then((res) => res)
    .catch((error) => error);
};

// --------------------------------byGender------------------------

export const byGender = async (gender) => {
  return APITraviesos.get(`/users/finByGender/${gender}`)
    .then((res) => res)
    .catch((error) => error);
};

//* ------------------------------followUserToggle------------------

export const followUserToggle = async (idUserSeQuiereSeguir) => {
  return APITraviesos.patch(`/users/follow/${idUserSeQuiereSeguir}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

// --------------------------------deleteMessageDeleteUser------------------------

export const deleteMessageDeleteUser = async (arrayIdMessages) => {
  return APITraviesos.delete(`/users/redirect/message/${arrayIdMessages}`)
    .then((res) => res)
    .catch((error) => error);
};

//* ------------------------------------BORRADO DEL USUARIO----------------------

export const deleteUserService = async () => {
  return APITraviesos.delete("/users/", {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};


//*-------------------------fetchCountries y fetchCities -------------------------

export const fetchCountries = async () => {
  try {
    const response = await axios.get("http://localhost:8081/api/v1/country/getAll"); // Ajusta la URL según tu configuración
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

export const fetchCities = async (countryId) => {
  try {
    const response = await axios.get(`http://localhost:8081/api/v1/city/cities/${countryId}`); // Ajusta la URL según tu configuración
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};