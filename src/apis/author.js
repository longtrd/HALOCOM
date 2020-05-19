import api from "../services/api";
const endpoint = "users";

export const getAuthor = (payload) => {
  return api.get(`${endpoint}/${payload}`);
};
