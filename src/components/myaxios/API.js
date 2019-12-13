import axios from "./base"

export const logi = (data) => {
    return axios({
        url: "/login",
        method: "post",
        data
    })
}