import axios from 'axios'
import store from '@/store'



const service = axios.create({
  baseURL: "http://47.104.189.95:9999/",
  timeout: 10000
})



service.interceptors.request.use(function (config) {
    if (store.state.token) {
    	config.headers['Authorization'] = localStorage.token
  	}
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  
  

service.interceptors.response.use(function (response) {
     const res = response.data;

    if (res.state !== 200) {
    }
    return response;
  }, function (error) {
    return Promise.reject(error);
  });





export default service