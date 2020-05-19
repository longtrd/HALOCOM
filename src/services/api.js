import axios from "axios";

const instance = axios.create({
  baseURL: "http://hn.algolia.com/api/v1/",
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => err
);

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
