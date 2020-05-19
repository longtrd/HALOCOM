import api from "../services/api";
const endpoint = "items";

export const getArticle = (payload) => {
  return api.get(`${endpoint}/${payload}`);
};
