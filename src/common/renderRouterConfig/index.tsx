import { IRouterConfig, IRouterV4 } from "../../../typing/interfaces"
import React, { ComponentClass } from "react"
import { Route, Router } from "react-router-dom"


/***
 * 将路由信息扁平化，继承上一级路由的path
 * @param {Array} config  路由配置
 */
function recursiveRouterConfigV4(config: IRouterConfig[] = []) {
    return config.map((item) => {
        const router: IRouterV4 = {
            path: item.path,
            component: item.component,
            layout: item.layout
        }
        if (Array.isArray(item.children)) {
            router.childRoutes = recursiveRouterConfigV4(item.children)
        }
        return router
    })
}
/***
 * 将扁平化后的路由信息生成route节点
 * @param  {Element} container 路由容器
 * @param  {object} routers 路由对象
 * @param  {string} contextPath 上层路由地址
 * @return {Router}
 * @example
 * <Switch>
 *  <Route exact path="/" component ={Home}/>
 *  <Route exact path="/page3" component ={Page3}/>
 *  <Route exact path="/page4" component ={Page4}/>
 *  <Route exact path="/page3/:id" component ={Page3}/>
 *  <Route exact component={NotFound}/>
 * </Switch>
 */

function renderRouterConfigV4(container: ComponentClass, routers: IRouterV4[], contextPath: string) {
    const routeChildren: JSX.Element[] = []
    const renderRoute = (RouteContainer: ComponentClass, routeItem: IRouterV4, routeContextPath: string) => {
        let routePath: string
        if (!routeItem.path) {
            console.error("route must has `path`");
            return
        }
        if (routeItem.path === '/' || routeItem.path === '*') {
            routePath = routeItem.path
        } else {
            routePath = `/${routeContextPath}/${routeItem.path}`.replace(/\/+/g, '/')
        }
        const Layout = routeItem.layout
        const RouteComponent = routeItem.component
        if (Layout && RouteComponent) {
            routeChildren.push(
                <Route
                    key={routePath}
                    exact
                    path={routePath}
                    render={(props) => {
                        return React.createElement(
                            routeItem.layout,
                            props,
                            React.createElement(routeItem.component, props)
                        )
                    }}
                />
            )
        } else if (RouteContainer && routeItem.component) {
            routeChildren.push(
                <Route
                    key={routePath}
                    exact
                    path={routePath}
                    render={(props) => {
                        return (<RouteContainer {...props}><Layout {...props} /></RouteContainer>)
                    }}
                />
            )
        } else {
            routeChildren.push(
                <Route
                    key={routePath}
                    exact
                    path={routePath}
                    component={routeItem.component}
                />
            )
        }
        if (Array.isArray(routeItem.childRoutes)) {
            routeItem.childRoutes.forEach((r: IRouterV4) => {
                renderRoute(routeItem.component, r, routePath)
            })
        }
    }
    routers.forEach((router) => {
        renderRoute(container, router, contextPath)
    })
    return routeChildren
}
export default function (routerConfig: IRouterConfig[]) {
    return renderRouterConfigV4(null as any, recursiveRouterConfigV4(routerConfig), '/')
}