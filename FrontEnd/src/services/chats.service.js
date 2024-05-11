import { APITraviesos } from "./serviceApi.config";

//! -------HAY QUE METER EL TOKEN A TODOS-----------
// ----------------get All ------------------------

export const getAllChats = async () => {
  return APITraviesos.get(`/chat/get/all`)
    .then((res) => res)
    .catch((error) => error);
};

// ----------------get By Id ------------------------

export const getChatById = async (id) => {
  return APITraviesos.get(`/chat/get/id/${id}`)
    .then((res) => res)
    .catch((error) => error);
};

// ----------------get By User ------------------------

export const getChatByUser = async (id) => {
  return APITraviesos.get(`/chat/get/${id}`)
    .then((res) => res)
    .catch((error) => error);
};

// ----------------Delete chat ------------------------

export const deleteChat = async (id) => {
  return APITraviesos.delete(`/chat/${id}`)
    .then((res) => res)
    .catch((error) => error);
};
