import vue from "vue"
import vuerouter from "vue-router"

import logo from "@/views/logo.vue"

vue.use(vuerouter)

var router = new vuerouter({
    routes: [{
        name: "logo",
        path: "/logo",
        component: logo
    }]
})
// 暴露出去
export default router