import api from "../services/api";
const endPoint = "/search";

export const getHints = (payload) => {
  return api.get(`${endPoint}?page=${payload.page - 1}&hitsPerPage=40`);
};
