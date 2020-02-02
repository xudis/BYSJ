import { AsyncComponent } from '@common/asyncComponent'
import React, { Component, ComponentClass } from "react"
import { ConnectedComponentClass } from 'react-redux'
import { IHandle } from "react-util"


type IComponent = () => Promise<{ default: (ConnectedComponentClass<any, any> | ComponentClass<any, any>) }>
export interface IRouterConfig {
    path?: string;
    component?: AsyncComponent;
    children?: IRouterConfig[];
    layout?: any
    // layout?: ComponentClass

}

interface IRouterV4 {
    path: IRouterConfig.path;
    component: IRouterConfig.AsyncComponent;
    childRoutes?: IROuterV4;
    layout?: IRouterConfig.layout
}

export interface IHandle extends IHandle { }