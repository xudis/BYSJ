import "*.module.sass"
import React from "react"
import { HashRouter as Router, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import routerConfig from "./routerConfig"
import qs from "qs"
import Store from "./store"
import Ajax from "../../chushi/art-ajax"
import renderRouterConfig from 'src/common/renderRouterConfig'
import { render } from 'react-dom'
Ajax.globalConfig.headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"

};
Ajax.globalConfig.ajaxStart = function (url, data, options) {
    const newData = qs.stringify(data)
    return {
        url: "/ngcfcmnet/api" + url, data: newData, options
    }
}
const NOUNT_NODE = document.getElementById("roots")
const initState = {
    hehe: "init_hehe"
}
const store = Store(initState)
store.dispatch({
    type: "clickhehe",
    return: {
        hehe: "hehe_click"
    }
})
render(
    <Provider
        store={store}
    >
        <Router>
            <Switch>
                {
                    renderRouterConfig(routerConfig)
                }
            </Switch>
        </Router>
    </Provider>
    , NOUNT_NODE
)