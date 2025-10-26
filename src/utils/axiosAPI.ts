import axios from "axios";
import toast from "react-hot-toast";

const axiosAPI = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

axiosAPI.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.descripcion)
      toast.error(error.response.descripcion);
    else toast.error("Ocurrio un error al realizar la peticion");
    return Promise.reject(error);
  }
);

export default axiosAPI;
