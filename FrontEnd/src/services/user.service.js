import { updateToken } from "../utils";
import { APIUser } from "./service.config";

//* ---------------------- REGISTER (registerWithRedirect)----------------------
export const registerUser = async (formData) => {
  return APIUser.post("/users/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

//* ------------------------------- SEND MAIL REDIRECT -------------------------
//!no estoy segura si lleva o no formData, creo que no
export const sendMailRedirect = async (id) => {
  return APIUser.post(`/users/register/sendMail/${id}`)
    .then((res) => res)
    .catch((error) => error);
};

//*  ------------------------------- RESEND CODE -------------------------------

export const resendCodeConfirmationUser = async (formData) => {
  return APIUser.post("/users/resend", formData)
    .then((res) => res)
    .catch((error) => error);
};

//* ------------------------------- CHECK CODE ---------------------------------

export const checkCodeConfirmationUser = async (formData) => {
  return APIUser.post("/users/check", formData)
    .then((res) => res)
    .catch((error) => error);
};

//* -------------------------------- LOGIN -------------------------------------

export const loginUserService = async (formData) => {
  return APIUser.post("/users/login", formData)
    .then((res) => res)
    .catch((error) => error);
};

//* -------------------------------- AUTOLOGIN ----------------------------------

export const autologinUser = async (formData) => {
  return APIUser.post("/users/login/autologin", formData)
    .then((res) => res)
    .catch((error) => error);
};

//* ----------------CAMBIO CONTRASEÑA SIN TOKEN (changePassword)--------

export const forgotPasswordUser = async (formData) => {
  return APIUser.patch("/users/forgotpassword", formData)
    .then((res) => res)
    .catch((error) => error);
};

//* ------------------------------- SEND PASSWORD -------------------------
//!no estoy segura si lleva o no formData, creo que no
export const sendPassword = async (id) => {
  return APIUser.patch(`/users/sendPassword/${id}`)
    .then((res) => res)
    .catch((error) => error);
};

//* -------------CAMBIO CONTRASEÑA CUANDO ESTAS LOGUEADO (modifyPassword)----

export const changePasswordUserToken = async (formData) => {
  return APIUser.patch("/users/changepassword", formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//* ------------------------------ UPDATE USER -----------------------

export const updateUser = async (formData) => {
  return APIUser.patch("/users/update/update", formData, {
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
  return APIUser.patch(`/users/follow/${idUserSeQuiereSeguir}`, {
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
  return APIUser.delete("/users/", {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
