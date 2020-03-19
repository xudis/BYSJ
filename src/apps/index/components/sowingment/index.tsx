import React, { Component } from "react"
import Ajax from "../../../../chushi/art-ajax"
import { Button, message } from "antd"
import List from "./modules/list"


export interface IProps {

}
export interface IState {
    saveData: any[]
}

export default class Sowingment extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            saveData: [],
        }
    }
    public changePlatform = (valNow: any, record: object, index: number) => {
        let dataIndex = index;
        let oldObj = { ...this.state.saveData[dataIndex] };
        oldObj.toPlatform = valNow;
        let originSaceData = [...this.state.saveData]
        originSaceData.splice(dataIndex, 1, oldObj)
        this.setState({
            saveData: originSaceData
        })
    }
    public changeType = (valNow: any, record: object, index: number) => {
        let dataIndex = index;
        let oldObj = { ...this.state.saveData[dataIndex] };
        oldObj.contentType = valNow;
        let originSaceData = [...this.state.saveData]
        originSaceData.splice(dataIndex, 1, oldObj)
        this.setState({
            saveData: originSaceData
        })
    }
    public changeMode = (valNow: any, record: object, index: number) => {
        let dataIndex = index;
        let oldObj = { ...this.state.saveData[dataIndex] };
        oldObj.bearMode = valNow;
        let originSaceData = [...this.state.saveData]
        originSaceData.splice(dataIndex, 1, oldObj)
        this.setState({
            saveData: originSaceData
        })
    }
    public render() {
        return (
            <div>开发者</div>
        )
    }
}