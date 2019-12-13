import axios from "axios"

// 基准地址
axios.defaults.baseURL = 'http://localhost:3000'

// 拦截器

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log(config);
    let token = localStorage.getItem("newtoken")
    // 如果有token值，则添加请求头设置
    if (token) {
        config.headers.Authorization = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    console.log(response);

    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});





export default axios