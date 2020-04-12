import '../../asstes/sass/qudao.scss';
import "../../common/pollyfill";
import renderRouterConfig from '../../common/renderRouterConfig';
import "antd/dist/antd.min.css";
import { Provider } from 'react-redux';
import { HashRouter as Router, Switch } from 'react-router-dom';
import routerConfig from "./routerConfig";
import Store from "./store";
// import Ajax from "react-ajax";
import qs from "qs";
import "./wsj.scss"
import { render } from '@testing-library/react';
import React from 'react';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
interface Bean {
    isProvMng: string,
    roleCode: string
}
interface Beans {

}

// Ajax.globalConfig.headers = {
//     'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8"
// }
// Ajax.globalConfig.ajaxStart = function (url, data, options) {
//     const newData = qs.stringify(data)
//     return { url: "ngcfcmnet/api" + url, data: newData, options }
// }
// const MOUNT_NODE: any = document.getElementById('root');
// let currentRole, proviceRoleCode
// Ajax.post<Bean, Beans>('/login/getInitRoleCode').then(({ data }: { data: any }) => {
//     if (data.returnCode == '0') {
//         currentRole = data.bean.roleCode
//         proviceRoleCode = data.bean.isProvMng
//         localStorage.setItem("USER_TYPE", currentRole)
//         let USER_TYPE = localStorage.getItem('USER_TYPE')
//         window.server_URL = '/ngcfcm/api'
//         const initState = {
//             charactoe: USER_TYPE ? USER_TYPE : currentRole,
//             proviceRoleCode: proviceRoleCode
//         }
//         const store = Store(initState)
//         render(
//             <Provider store={store}>
//                 <Router>
//                     <Switch>{renderRouterConfig(routerConfig)}</Switch>
//                 </Router>
//             </Provider>, MOUNT_NODE)
//     }
//     else {
//         currentRole = data.bean.roleCode
//         proviceRoleCode = data.bean.isProvMng
//         localStorage.setItem("USER_TYPE", currentRole)
//         let USER_TYPE = localStorage.getItem('USER_TYPE')
//         window.server_URL = '/ngcfcmnet/api'
//         const initState = {
//             charactoe: USER_TYPE ? USER_TYPE : currentRole,
//             proviceRoleCode: proviceRoleCode
//         }
//         const store = Store(initState)
//         render(
//             <Provider store={store}>
//                 <Router>
//                     <Switch>{renderRouterConfig(routerConfig)}</Switch>
//                 </Router>
//             </Provider>, MOUNT_NODE)
//     }
// }).catch(() => {
//     render(
//         <div style={{
//             position: 'absolute',
//             left: "50%",
//             top: "50%",
//             textAlign: "center"
//         }}>
//             <h1 style={{ color: "red" }}>请重新登陆</h1>

//         </div >
//     )
// })

const MOUNT_NODE: any = document.getElementById('root');
let currentRole = "", proviceRoleCode
let USER_TYPE = localStorage.getItem('USER_TYPE')
localStorage.setItem("USER_TYPE", currentRole)
//         let USER_TYPE = localStorage.getItem('USER_TYPE')
const initState = {
    charactoe: USER_TYPE ? USER_TYPE : currentRole,
    proviceRoleCode: proviceRoleCode
}
const store = Store(initState)
render(
    <Provider store={store}>
        <Router>
            <Switch>{renderRouterConfig(routerConfig)}</Switch>
        </Router>
    </Provider>, MOUNT_NODE)