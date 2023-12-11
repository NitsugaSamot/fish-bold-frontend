// axiosClient.js
// import axios from "axios";
// import getConfig from "next/config";
import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const axiosClient = axios.create({
  baseURL: publicRuntimeConfig.BACKEND_URL,
});

export default axiosClient;


// import axios from "axios";

// const axiosClient = axios.create({
//     baseURL: `${import.meta.env.BACKEND_URL}`,
//   });
  
//   export default axiosClient;
  