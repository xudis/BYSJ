import React, { Component, Fragment } from "react"
import Ajax from '../../../../chushi/art-ajax'
// import Header from "./modules/header"

export interface IState {

}
export interface IProps {

}
export default class Data_center extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)
        this.state = {
            reportTitleListAll: [],
            reportTitleList: [],
            reportUrl: "",
            status: ""
        }

    }
    render() {
        return (
            <div>数据中心</div>
        )
    }
}