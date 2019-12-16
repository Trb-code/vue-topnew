import vue from "vue"
import vuerouter from "vue-router"

import logo from "@/views/logo.vue"
import personal from "../views/personal.vue"
import editpersonal from "../views/editpersonal.vue"
import index from "../views/index.vue"


vue.use(vuerouter)

var router = new vuerouter({
    routes: [{
            name: "index",
            path: "/",
            component: index
        },
        {
            name: "logo",
            path: "/logo",
            component: logo
        },
        {
            name: "personal",
            path: "/personal/:id",
            component: personal
        },
        {
            name: "editpersonal",
            path: "/editpersonal/:id",
            component: editpersonal
        }
    ]
})


// 导航守卫
router.beforeEach((to, from, next) => {
    // 如果去的路径包含/personal/
    if (to.path.indexOf("/personal/") === 0) {
        // 如果有token值，表示登录国，就可以跳转
        let token = localStorage.getItem("newtoken")
        if (token) {
            next()
        }
        // 否则就跳会登录页面
        else {
            next({
                name: "logo"
            })
        }
    } else {
        next()
    }
})

// 暴露出去
export default router