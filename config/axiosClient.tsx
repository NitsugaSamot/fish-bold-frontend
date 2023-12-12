import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const axiosClient = axios.create({
  baseURL: publicRuntimeConfig.BACKEND_URL,
});

export default axiosClient;



  