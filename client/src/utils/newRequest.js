import axios from "axios";

const newRequest = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND}/api/`,
  withCredentials: true,
});

export default newRequest;