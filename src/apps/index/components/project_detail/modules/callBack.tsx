import React, { Component } from "react"
import { Modal, Pagination } from "antd"
import Ajax from "../../../../../chushi/art-ajax"
import Feedback from "./feedback"
import Play from "./play"
export interface IProps {
    handleClose: Function,
    callBackOpen: boolean,
    campaignId: string,
    campaignName: string
}
export interface IState {
    data: Array<{}>,
    feedbackOpen: boolean,
    playOpen?: boolean,
    soundRecord: string,
    total: number,
    itemDetail: string,
    searchParams: {
        provCode: string,
        start: number,
        limit: number,
        campaignId: string
    }
}
interface IBean {
    total: string
}
interface IBeans {
    beans: null | object | any[]
}
export default class CallBack extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            data: [],
            feedbackOpen: false,
            playOpen: false,
            soundRecord: '',
            total: 0,
            itemDetail: '',
            searchParams: {
                provCode: '03112',
                start: 0,
                limit: 10,
                campaignId: this.props.campaignId
            }
        }
    }
    public handleSubmit = () => {
        this.props.handleClose("callBack")
    }
    public search = () => {
        Ajax.post<IBean, IBeans>("/task/getCallbackManagement", this.state.searchParams).then(({ data }: { data: any }) => {
            this.setState({
                data: data,
                total: parseInt(data.bean.total)
            })
        }).catch(() => { })
    }

}