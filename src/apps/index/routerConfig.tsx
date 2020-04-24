import asyncComponent from "../../common/asyncComponent"
import { IRouterConfig } from "../../../typing/interfaces"
import BaseLayout from "./common/common"
// import { createStore } from "redux"
const login: any = [];
//
const project: any = [{
    path: '/home',
    component: asyncComponent(() => import('./routers/home')),
    layout: BaseLayout
}];

const project_detail: any = [{
    path: '/home/detail/:id',
    component: asyncComponent(() => import('./routers/project_detail')),
    layout: BaseLayout
}];

const todoApprove: any = [{
    path: '/todoApprove',
    component: asyncComponent(() => import('./routers/todoApprove')),
    layout: BaseLayout
}];

const approveDetail: any = [{
    path: '/approveDetail/:id',
    component: asyncComponent(() => import('./routers/approveDetail')),
    layout: BaseLayout
}];

const approveRecord: any = [{
    path: '/approveDetail/approveRecord',
    component: asyncComponent(() => import('./routers/approveRecord')),
    layout: BaseLayout
}];

const approveddDetail: any = [{
    path: '/home',
    component: asyncComponent(() => import('./routers/home')),
    layout: BaseLayout
}];

// const dataCenter: any = [{
//     path: '/dataCenter',
//     component: asyncComponent(() => import('./routers/data_center')),
//     layout: BaseLayout
// }]

const createReports: any = [{
    path: '/home',
    component: asyncComponent(() => import('./routers/organization')),
    layout: BaseLayout
}];

const organization: any = [{
    path: '/organization',
    component: asyncComponent(() => import('./routers/organization')),
    layout: BaseLayout
}];

const sowingmanagement: any = [{
    path: '/sowingmanagement',
    component: asyncComponent(() => import('./routers/sowingment')),
    layout: BaseLayout
}];


const user: any = [{
    path: '/user',
    component: asyncComponent(() => import('./routers/user')),
    layout: BaseLayout
}];

const resultChan: any = [{
    path: '/user/resultChan',
    component: asyncComponent(() => import('./routers/resultChan')),
    layout: BaseLayout
}];

const modifyLog: any = [{
    path: '/user/modifyQur',
    component: asyncComponent(() => import('./routers/modifyLog')),
    layout: BaseLayout
}];
const modifyQue: any = [{
    path: '/user/modifyLog',
    component: asyncComponent(() => import('./routers/modifyQue')),
    layout: BaseLayout
}];
const modifyDis: any = [{
    path: '/user/modifyLog',
    component: asyncComponent(() => import('./routers/modifyDis')),
    layout: BaseLayout
}];

const resultDetails: any = [{
    path: '/user/resultDetails/:id',
    component: asyncComponent(() => import('./routers/resultDetails')),
    layout: BaseLayout
}];
const serRecoveryS: any = [{
    path: '/user/serRecoveryS',
    component: asyncComponent(() => import('./routers/serRecoveryS')),
    layout: BaseLayout
}];
const serRecovery: any = [{
    path: '/user/serRecovery',
    component: asyncComponent(() => import('./routers/serRecovery')),
    layout: BaseLayout
}];


const backlog: any = [{
    path: '/message',
    component: asyncComponent(() => import('./routers/message')),
    layout: BaseLayout
}];

const notFound: any = [{
    path: '*',
    component: asyncComponent(() => import('./routers/home')),
    layout: BaseLayout
}];
// export default [].concat(login, project, project_detail, todoApprove, approveDetail, approveRecord, approveddDetail, dataCenter, createReports, organization, sowingmanagement, report, user, resultChan, modifyDis, modifyLog, modifyQue, resultDetails, serRecovery, serRecoveryS,  createModal, backlog, IndexModelDetail, notFound)
export default [].concat(project, project_detail, todoApprove, approveDetail, approveRecord, approveddDetail, createReports, organization, sowingmanagement, user, resultChan, modifyDis, modifyLog, modifyQue, resultDetails, serRecovery, serRecoveryS, backlog, notFound)