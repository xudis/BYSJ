import React, { Component } from "react"
import { Modal, Pagination } from "antd"
import Feedback from "./feedback"
import Play from "./play"
import Ajax from "../../../../../chushi/art-ajax"

export interface IProps {
    handleClose: Function,
    myCallBackOpen: boolean,
    handleOpen: Function,
    campaignId: string,
    campaignName: string
}
export interface IState {
    data: [],
    feedbackOpen: boolean,
    playOpen: boolean,
    rcdngFilePath: string,
    total: number,
    itemDetail: any,
    searchParams: {
        start: number,
        limit: number,
        campaignId: string
    },
    getStaffInfos: {
        staffName: any,
        staffId: any,
        namttId: any,
        hallName: any,
        hallId: any,
        hallAddress: string,
        serviceType: any,
        actvId: any,
        callingProvName: any,
        callingCityName: any,
        callingCountName: any,
        belgProvCode: any,
        telphone: any,
    }
}
interface IBeans {
    beans?: any[]
}
interface IBean {
    total: number
}

export default class MyCallBack extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            data: [],
            feedbackOpen: false,
            playOpen: false,
            rcdngFilePath: '',
            total: 0,
            itemDetail: "",
            searchParams: {
                start: 0,
                limit: 10,
                campaignId: this.props.campaignId
            },
            getStaffInfos: {
                staffName: "",
                staffId: "",
                namttId: "",
                hallName: "",
                hallId: "",
                hallAddress: "",
                serviceType: "",
                actvId: "",
                callingProvName: "",
                callingCityName: "",
                callingCountName: "",
                belgProvCode: "",
                telphone: "",
            }
        }
    }
}