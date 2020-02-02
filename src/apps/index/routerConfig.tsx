import asyncComponent from "../../common/asyncComponent"
import { IRouterConfig } from "../../../typing/interfaces"
import BaseLayout from "./common/common"
// import { createStore } from "redux"
const login: IRouterConfig[] = [];
//
const project: IRouterConfig[] = [{
    path: '/home',
    component: asyncComponent(() => import('./routers/home')),
    layout: BaseLayout
}];

const project_detail: IRouterConfig[] = [{
    path: '/home/detail/:id',
    component: asyncComponent(() => import('./routers/project_detail')),
    layout: BaseLayout
}];

const todoApprove: IRouterConfig[] = [{
    path: '/todoApprove',
    component: asyncComponent(() => import('./routers/todoApprove')),
    layout: BaseLayout
}];

const approveDetail: IRouterConfig[] = [{
    path: '/approveDetail/:id',
    component: asyncComponent(() => import('./routers/approveDetail')),
    layout: BaseLayout
}];

const approveRecord: IRouterConfig[] = [{
    path: '/approveDetail/approveRecord',
    component: asyncComponent(() => import('./routers/approveRecord')),
    layout: BaseLayout
}];

const approveddDetail: IRouterConfig[] = [{
    path: '/home',
    component: asyncComponent(() => import('./routers/home')),
    layout: BaseLayout
}];

// const dataCenter: IRouterConfig[] = [{
//     path: '/dataCenter',
//     component: asyncComponent(() => import('./routers/data_center')),
//     layout: BaseLayout
// }]

const createReports: IRouterConfig[] = [{
    path: '/home',
    component: asyncComponent(() => import('./routers/createReports')),
    layout: BaseLayout
}];

const organization: IRouterConfig[] = [{
    path: '/organization',
    component: asyncComponent(() => import('./routers/organization')),
    layout: BaseLayout
}];

const sowingmanagement: IRouterConfig[] = [{
    path: '/sowingmanagement',
    component: asyncComponent(() => import('./routers/sowingment')),
    layout: BaseLayout
}];
const report: IRouterConfig[] = [{
    path: '/report',
    component: asyncComponent(() => import('./routers/report')),
    layout: BaseLayout
}];

const user: IRouterConfig[] = [{
    path: '/user',
    component: asyncComponent(() => import('./routers/user')),
    layout: BaseLayout
}];

const resultChan: IRouterConfig[] = [{
    path: '/user/resultChan',
    component: asyncComponent(() => import('./routers/resultChan')),
    layout: BaseLayout
}];

const modifyLog: IRouterConfig[] = [{
    path: '/user/modifyQur',
    component: asyncComponent(() => import('./routers/modifyLog')),
    layout: BaseLayout
}];
const modifyQue: IRouterConfig[] = [{
    path: '/user/modifyLog',
    component: asyncComponent(() => import('./routers/modifyQue')),
    layout: BaseLayout
}];
const modifyDis: IRouterConfig[] = [{
    path: '/user/modifyLog',
    component: asyncComponent(() => import('./routers/modifyDis')),
    layout: BaseLayout
}];

const resultDetails: IRouterConfig[] = [{
    path: '/user/resultDetails/:id',
    component: asyncComponent(() => import('./routers/resultDetails')),
    layout: BaseLayout
}];
const serRecoveryS: IRouterConfig[] = [{
    path: '/user/serRecoveryS',
    component: asyncComponent(() => import('./routers/serRecoveryS')),
    layout: BaseLayout
}];
const serRecovery: IRouterConfig[] = [{
    path: '/user/serRecovery',
    component: asyncComponent(() => import('./routers/serRecovery')),
    layout: BaseLayout
}];


const backlog: IRouterConfig[] = [{
    path: '/message',
    component: asyncComponent(() => import('./routers/message')),
    layout: BaseLayout
}];

const IndexModelDetail: IRouterConfig[] = [{
    path: '/indexModelDetail',
    component: asyncComponent(() => import('./routers/indexModelDetail')),
    layout: BaseLayout
}];
const notFound: IRouterConfig[] = [{
    path: '*',
    component: asyncComponent(() => import('./routers/home')),
    layout: BaseLayout
}];
// export default [].concat(login, project, project_detail, todoApprove, approveDetail, approveRecord, approveddDetail, dataCenter, createReports, organization, sowingmanagement, report, user, resultChan, modifyDis, modifyLog, modifyQue, resultDetails, serRecovery, serRecoveryS,  createModal, backlog, IndexModelDetail, notFound)
export default [].concat(login, project, project_detail, todoApprove, approveDetail, approveRecord, approveddDetail, createReports, organization, sowingmanagement, report, user, resultChan, modifyDis, modifyLog, modifyQue, resultDetails, serRecovery, serRecoveryS, backlog, IndexModelDetail, notFound)