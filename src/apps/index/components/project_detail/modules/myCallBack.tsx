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
    data: any,
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
    total?: number
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
                telphone: ""
            }
        }
    }
    /**
     frequentExecution=
     */
    public frequentExecution = () => {
        Ajax.post("/getCrossApi/crossApi", { callType: "1" }).then(({ data }: { data: any }) => {
            if (data.returnCode == 0) {
                // frequentUrl = data.bean.crossApi
            }
        }).catch(() => { })
    }
    public handleSubmit = () => {
        this.props.handleClose("mycallBack")
    }
    public callNumberParam = () => {
        Ajax.get("/login/getStaffInfo").then((data: any) => {
            if (data.returnCode == 0) {
                this.setState({
                    getStaffInfos: data.bean
                })
            }
        }).catch(() => { })
    }
    public search = () => {
        Ajax.post("/task/getCallbackList", this.state.searchParams).then((data: any) => {
            this.setState({
                data: data,
                total: data.bean.total
            })
        }).catch(() => { })
    }
    public componentDidMount() {
        this.search()
        this.callNumberParam()
        this.frequentExecution()
    }
    //点击分页器更新列表数据
    public pageSearch = (page: number) => {
        this.setState({
            // page: page,
            searchParams: {
                ...this.state.searchParams,
                start: (page - 1) - this.state.searchParams.limit
            }
        }, () => {
            this.search()
        })
    }
    public playHandleOpen = (e: any, item: any) => {
        const operationType = e.currentTarget.getAttribute("operation-type")
        if (/^play$/.test(operationType)) {
            this.setState({
                playOpen: true,
                rcdngFilePath: item.rcdngFilePath
            })
        }
        e.preventDefault()
    }
    public playHandleClose = (type: any) => {
        if (/^play$/.test(type)) {
            this.setState({
                playOpen: false
            })
        }
    }
    public handleOpen = (e: any, item: any) => {
        const operationType = e.currentTarget.getAttribute("opration-type")
        if (/^feedback$/.test(operationType)) {
            this.setState({
                feedbackOpen: true,
                itemDetail: item.callbackFeedback
            })
        }
        e.preventDefault()
    }
    public handleClose = (type: any) => {
        if (/^feedback$/.test(type)) {
            this.setState({
                feedbackOpen: false
            })
        }
    }
    public render() {
        return (
            <Modal
                style={{ width: 850, height: 550 }}
                onOk={this.handleSubmit}
                onCancel={this.props.handleClose("myCallBack")}
                keyboard={true}
                title="我的回拨"
            >
                <div>
                    <div className="qd-popup-content" style={{ "height": "360px", "margin": "0 0 25px 0" }}>
                        <div className="describe">
                            <div className="clearfix"></div>
                        </div>
                        <table className="t-table t-table-striped">
                            <thead>
                                <tr>
                                    <th>回拨时间</th>
                                    <th>客户手机号</th>
                                    <th>业务结果</th>
                                    <th>回拨原因</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data ?
                                        this.state.data.beans.map((item: any, index: number) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.reserTime}</td>
                                                    <td>
                                                        <span>{item.callbackTel}</span>
                                                        {
                                                            (() => {
                                                                if (item.rcsngFilePath) {
                                                                    return (
                                                                        <em onClick={(e) => { this.playHandleOpen(e, item) }}
                                                                            opration-type="play" className="iconfont icon-arraw"></em>
                                                                    )
                                                                }
                                                            })()
                                                        }
                                                    </td>
                                                    <td>{item.businessResult}</td>
                                                    <td>{item.callbackReason}</td>
                                                    {
                                                        (() => {
                                                            let date = item.reserTime.replace(/-/g, '/')
                                                            if (item.callbackState == 1) {
                                                                if (0 <= new Date().getTime() - new Date((date)).getTime()) {
                                                                    return (
                                                                        <td>
                                                                            <a href="javascript:;" onClick={() => { this.callNumberParam() }}>呼叫</a>
                                                                        </td>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <td>待外呼</td>
                                                                    )
                                                                }
                                                            } else if (item.callbackState == 2) {
                                                                return (
                                                                    <td onClick={(e) => { this.handleOpen(e, item) }} opration-type="feedback">
                                                                        <a href="javascript:;" >查看反馈</a>
                                                                    </td>
                                                                )
                                                            }
                                                        })()
                                                    }
                                                </tr>
                                            )
                                        }) : ""

                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {
                    this.state.playOpen ?
                        <Play
                            soundRecord={this.state.rcdngFilePath}
                            playOpen={this.state.playOpen}
                            handleClose={this.playHandleClose}
                        /> : ""
                }
                {
                    this.state.feedbackOpen ?
                        <Feedback
                            content={this.state.itemDetail}
                            feedbackOpen={this.state.feedbackOpen}
                            handleClose={this.handleClose}
                        /> : ""
                }
                <Pagination
                    total={this.state.total}
                    pageSize={10}
                    onChange={this.pageSearch}
                />
            </Modal>
        )
    }
}