import axios from "./base.js"


export const upolad = (data) => {
    return axios({
        url: "/upload",
        method: "post",
        data
    })
}