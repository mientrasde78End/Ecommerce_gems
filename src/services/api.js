import axios from "axios";

const api = axios.create({
  baseURL: "https://mega-data.onrender.com/api/",
});

export default api;
