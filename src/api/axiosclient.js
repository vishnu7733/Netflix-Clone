import apiConfig from "./apiConfig";
import axios from "axios";
const axiosClient=axios.create({
    baseURL:apiConfig.baseUrl,
    headers:{
        "Content-Type":"application/json"
    }
}
);

axiosClient.interceptors.request.use((config)=>{
    config.params={
        ...config.params,
        api_key:apiConfig.apiKey
    };
    return config;
});
axiosClient.interceptors.response.use(
    (response)=>{
        return response.data;
    },
    (error) => Promise.reject(error)
);

export default axiosClient;