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
// 注册
export const register = (data) => {
    return axios({
        url: "/register",
        method: "post",
        data


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

// 编辑用户详情
export const edituser = (id, data) => {
    return axios({
        url: `/user_update/${id}`,
        method: "post",
        data

    })
}

// 栏目列表
export const newlist = () => {
    return axios({
        url: "/category",

    })
}

// 获取栏目新闻数据
export const getnewlist = (params) => {
    return axios({
        url: "/post",
        params

    })
}

// 新闻详情
export const newsart = (id) => {
    return axios({
        url: `/post/${id}`,
        id
    })
}

// 关注用户  
export const follows = (id) => {
    return axios({
        url: `/user_follows/${id}`,
        id
    })
}

// 取消关注

export const unfollows = (id) => {
    return axios({
        url: `/user_unfollow/${id}`,
        id
    })
}

// 点赞api
export const like = (id) => {
    return axios({
        url: `/post_like/${id}`,
        id
    })
}

// 收藏文章
export const collect = (id) => {
    return axios({
        url: `/post_star/${id}`,
        id
    })
}

// 个人中心用户关注列表
export const focusapi = () => {
    return axios({
        url: `/user_follows`,

    })
}

// 个人中心我的收藏文章列表


export const myclooect = () => {
    return axios({
        url: `/user_star`,
    })
}


// 评论列表
export const allcomment = (id, params) => {
    return axios({
        url: `/post_comment/${id}`,
        params
    })
}

// 点击发送评论
export const sendcomment = (id, data) => {
    return axios({
        url: `/post_comment/${id}`,
        method: "post",
        data
    })
}