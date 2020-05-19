import api from "../services/api";

export const getHintsByPoint = (payload) => {
  return api.get(
    `search?page=${payload.page - 1}&hitsPerPage=40&tags=story&query=${
      payload.q
    }`
  );
};

export const getHintsByDate = (payload) => {
  return api.get(
    `search_by_date?page=${payload.page - 1}&hitsPerPage=40&tags=story&query=${
      payload.q
    }`
  );
};
