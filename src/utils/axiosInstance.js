import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api/',
    headers: {'X-Custom-Header': 'foobar'}
});

axiosInstance.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    return Promise.reject(error.response);
  });

export default axiosInstance