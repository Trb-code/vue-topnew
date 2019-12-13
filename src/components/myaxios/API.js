import axios from "./base.js"

export const logi = (data) => {
    return axios({
        method: "post",
        url: "/login",
        data
    })
}


// 3.获取用户详情
export const personal = (id) => {
    return axios({
        // headers: {
        //     Authorization: localStorage.getItem("newtoken") 请求头，每次都需要写，麻烦，所以添加拦截器
        // },
        url: `/user/${id}`,

    })
}
// 3.获取用户详情
// export const getUserInfo = (id) => {
// return axios({
// 我们当前所请求的api是需要授权的api,所以要根据后台的要求传入用户状态
// 这个状态需要根据后台的严格要求进行传递
// 后台要求使用：Authorization做为键,token做为值
// headers: {
//   Authorization: localStorage.getItem('heima_40_token')
// },
// url: `/user/${id}`
// })
// }