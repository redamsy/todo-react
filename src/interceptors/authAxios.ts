import axios from "axios";
const authAxios = axios.create({
  baseURL: process.env.BACKEND_URL || "http://localhost:3000",
});

export default authAxios;
