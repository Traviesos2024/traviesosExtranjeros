import { APITraviesos } from "./serviceApi.config";

// ----------------createMessage ------------------------
//! no sé si es multipart o json
export const createMessage = async (idRecipient, formData) => {
  return APITraviesos.post(`/messages/${idRecipient}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------deleteMessage ------------------------

export const deleteMessage = async (id) => {
  return APITraviesos.delete(`/messages/${id}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------updateMessage ------------------------
//!-- no sé si es multipart o json
export const updateMessage = async (id, formData) => {
  return APITraviesos.patch(`/messages/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------getAllMessages ------------------------

export const getAllMessages = async () => {
  return APITraviesos.get(`/messages/get/all`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------getMessageById ------------------------

export const getMessageById = async (id) => {
  return APITraviesos.get(`/messages/get/id/${id}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------getMessageByUserOwner ------------------------

export const getMessageByUserOwner = async (idUserOwner) => {
  return APITraviesos.get(`/messages/get/${idUserOwner}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

// ----------------toggleLikeMessage ------------------------

export const toggleLikeMessage = async (idMessage) => {
  return APITraviesos.patch(`/messages/like/${idMessage}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
