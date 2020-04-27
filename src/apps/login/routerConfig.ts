import asyncComponent from "../../common/asyncComponent"
import { IRouterConfig } from "../../../typing/interfaces"

const notFount: any = [
    {
        path: "*",
        component: asyncComponent(() => import("../index/components/home")),
        // component: asyncComponent(() => import("./routers/login")),
    }
]
export default [].concat(notFount)