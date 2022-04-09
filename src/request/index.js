import axios from 'axios'
import store from '@/store'



const service = axios.create({
  baseURL: "http://120.53.120.80:8080",
  timeout: 10000
})


// 请求接口拦截
service.interceptors.request.use(function (config) {
    //有token就要携带Authentication
    if (store.state.token) {
    	config.headers['Authorization'] = localStorage.token
  	}
    return config
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