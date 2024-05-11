import { APITraviesos } from "./serviceApi.config";

//! -------HAY QUE METER EL TOKEN A TODOS-----------

// ----------------createMessage ------------------------
//! TOKEN -- no sé si es multipart o json
export const createMessage = async (idRecipient, formData) => {
  return APITraviesos.post(`/messages/${idRecipient}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------deleteMessage ------------------------
//! TOKEN
export const deleteMessage = async (id) => {
  return APITraviesos.delete(`/messages/${id}`)
    .then((res) => res)
    .catch((error) => error);
};

// ----------------updateMessage ------------------------
//! TOKEN -- no sé si es multipart o json
export const updateMessage = async (id, formData) => {
  return APITraviesos.patch(`/messages/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------getAllMessages ------------------------
//! TOKEN
export const getAllMessages = async () => {
  return APITraviesos.get(`/messages/get/all`)
    .then((res) => res)
    .catch((error) => error);
};

// ----------------getMessageById ------------------------
//! TOKEN
export const getMessageById = async (id) => {
  return APITraviesos.get(`/messages/get/id/${id}`)
    .then((res) => res)
    .catch((error) => error);
};

// ----------------getMessageByUserOwner ------------------------
//! TOKEN
export const getMessageByUserOwner = async (idUserOwner) => {
  return APITraviesos.get(`/messages/get/${idUserOwner}`)
    .then((res) => res)
    .catch((error) => error);
};

// ----------------toggleLikeMessage ------------------------
//! TOKEN
export const toggleLikeMessage = async (idMessage) => {
  return APITraviesos.patch(`/messages/like/${idMessage}`)
    .then((res) => res)
    .catch((error) => error);
};
