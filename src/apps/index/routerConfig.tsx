import asyncComponent from "../../common/asyncComponent"
import { IRouterConfig } from "../../../typing/interfaces"
import BaseLayout from "./common/common"
// import { createStore } from "redux"
const login: never[] = []
//
const project: IRouterConfig[] = [{
    path: '/home',
    component: asyncComponent(() => import('./routers/home')),
    layout: BaseLayout
}]

const project_detail: IRouterConfig[] = [{
    path: '/home/detail/:id',
    component: asyncComponent(() => import('./routers/project_detail')),
    layout: BaseLayout
}]

const todoApprove: IRouterConfig[] = [{
    path: '/todoApprove',
    component: asyncComponent(() => import('./routers/todoApprove')),
    layout: BaseLayout
}]

const approveDetail: IRouterConfig[] = [{
    path: '/approveDetail/:id',
    component: asyncComponent(() => import('./routers/approveDetail')),
    layout: BaseLayout
}]

const approveRecord: IRouterConfig[] = [{
    path: '/approveDetail/approveRecord',
    component: asyncComponent(() => import('./routers/approveRecord')),
    layout: BaseLayout
}]

const approveddDetail: IRouterConfig[] = [{
    path: '/home',
    component: asyncComponent(() => import('./routers/home')),
    layout: BaseLayout
}]

// const dataCenter: IRouterConfig[] = [{
//     path: '/dataCenter',
//     component: asyncComponent(() => import('./routers/data_center')),
//     layout: BaseLayout
// }]

const createReports: IRouterConfig[] = [{
    path: '/home',
    component: asyncComponent(() => import('./routers/createReports')),
    layout: BaseLayout
}]

const organization: IRouterConfig[] = [{
    path: '/organization',
    component: asyncComponent(() => import('./routers/organization')),
    layout: BaseLayout
}]

const sowingmanagement: IRouterConfig[] = [{
    path: '/sowingmanagement',
    component: asyncComponent(() => import('./routers/sowingment')),
    layout: BaseLayout
}]
const report: IRouterConfig[] = [{
    path: '/report',
    component: asyncComponent(() => import('./routers/report')),
    layout: BaseLayout
}]

const user: IRouterConfig[] = [{
    path: '/user',
    component: asyncComponent(() => import('./routers/user')),
    layout: BaseLayout
}]

const resultChan: IRouterConfig[] = [{
    path: '/user/resultChan',
    component: asyncComponent(() => import('./routers/resultChan')),
    layout: BaseLayout
}]

const modifyLog: IRouterConfig[] = [{
    path: '/user/modifyQur',
    component: asyncComponent(() => import('./routers/modifyLog')),
    layout: BaseLayout
}]
const modifyQue: IRouterConfig[] = [{
    path: '/user/modifyLog',
    component: asyncComponent(() => import('./routers/modifyQue')),
    layout: BaseLayout
}]
const modifyDis: IRouterConfig[] = [{
    path: '/user/modifyLog',
    component: asyncComponent(() => import('./routers/modifyDis')),
    layout: BaseLayout
}]

const resultDetails: IRouterConfig[] = [{
    path: '/user/resultDetails/:id',
    component: asyncComponent(() => import('./routers/resultDetails')),
    layout: BaseLayout
}]
const serRecoveryS: IRouterConfig[] = [{
    path: '/user/serRecoveryS',
    component: asyncComponent(() => import('./routers/serRecoveryS')),
    layout: BaseLayout
}]
const serRecovery: IRouterConfig[] = [{
    path: '/user/serRecovery',
    component: asyncComponent(() => import('./routers/serRecovery')),
    layout: BaseLayout
}]


const dataSinkingStore: IRouterConfig[] = [{
    path: '/user/dataSinkingStore',
    component: asyncComponent(() => import('./routers/dataSinkingStore')),
    layout: BaseLayout
}]

const createModal: IRouterConfig[] = [{
    path: '/createModal',
    component: asyncComponent(() => import('./routers/createModal')),
    layout: BaseLayout
}]
const backlog: IRouterConfig[] = [{
    path: '/message',
    component: asyncComponent(() => import('./routers/message')),
    layout: BaseLayout
}]
const dataSinkingProvince: IRouterConfig[] = [{
    path: '/home_dataSinkingProvince',
    component: asyncComponent(() => import('./routers/dataSinkingProvince')),
    layout: BaseLayout
}]
const DataSinkingCity: IRouterConfig[] = [{
    path: '/home_dataSinkingCity',
    component: asyncComponent(() => import('./routers/dataSinkingCity')),
    layout: BaseLayout
}]
const DataSinkingCounty: IRouterConfig[] = [{
    path: '/home_dataSinkingCounty',
    component: asyncComponent(() => import('./routers/dataSinkingCounty')),
    layout: BaseLayout
}]
const DataSinkingGird: IRouterConfig[] = [{
    path: '/home_dataSinkingGird',
    component: asyncComponent(() => import('./routers/dataSinkingGird')),
    layout: BaseLayout
}]
const DataSinkingStore: IRouterConfig[] = [{
    path: '/home_dataSinkingStore',
    component: asyncComponent(() => import('./routers/dataSinkingStore')),
    layout: BaseLayout
}]
const DataSinkingStaff: IRouterConfig[] = [{
    path: '/home_dataSinkingStaff',
    component: asyncComponent(() => import('./routers/dataSinkingStaff')),
    layout: BaseLayout
}]
const DataSinkingResultDetails: IRouterConfig[] = [{
    path: '/home_dataSinkingResultDetails',
    component: asyncComponent(() => import('./routers/dataSinkingResultDetails')),
    layout: BaseLayout
}]
const IndexModelDetail: IRouterConfig[] = [{
    path: '/indexModelDetail',
    component: asyncComponent(() => import('./routers/indexModelDetail')),
    layout: BaseLayout
}]
const notFound: IRouterConfig[] = [{
    path: '*',
    component: asyncComponent(() => import('./routers/home')),
    layout: BaseLayout
}]
// export default [].concat(login, project, project_detail, todoApprove, approveDetail, approveRecord, approveddDetail, dataCenter, createReports, organization, sowingmanagement, report, user, resultChan, modifyDis, modifyLog, modifyQue, resultDetails, serRecovery, serRecoveryS, dataSinkingStore, createModal, backlog, dataSinkingProvince, DataSinkingCity, DataSinkingCounty, DataSinkingGird, DataSinkingResultDetails, DataSinkingStore, DataSinkingStaff, IndexModelDetail, notFound)
export default [].concat(login, project, project_detail, todoApprove, approveDetail, approveRecord, approveddDetail, createReports, organization, sowingmanagement, report, user, resultChan, modifyDis, modifyLog, modifyQue, resultDetails, serRecovery, serRecoveryS, dataSinkingStore, createModal, backlog, dataSinkingProvince, DataSinkingCity, DataSinkingCounty, DataSinkingGird, DataSinkingResultDetails, DataSinkingStore, DataSinkingStaff, IndexModelDetail, notFound)