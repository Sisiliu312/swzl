import axios from 'axios'
import store from '@/store'



const service = axios.create({
  baseURL: "http://localhost:8888",
  timeout: 10000
})


// 请求接口拦截
service.interceptors.request.use(function (config) {
    //有token就要携带Authentication
    if (store.state.token) {
    	config.headers['Authorization'] = localStorage.token
  	}
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  
  
// 响应拦截
service.interceptors.response.use(function (response) {
     const res = response.data;

    if (res.state !== 200) {
    }
    return response;
  }, function (error) {
    return Promise.reject(error);
  });





export default service