//我的预约
import React, { Component } from "react"
import { Modal, Pagination, message } from "antd"
import Ajax from "../../../../../chushi/art-ajax"
import Play from "./play"

export interface IProps {
    handleClose: Function,
    myReservationOpen: boolean,
    campaignId: string,
    campaignName: string
}
export interface IState {
    data: { beans: any[] },
    playOpen: boolean,
    sound: string,
    total: number,
    searchParams: {
        start: number,
        limit: number,
        campaignId: string,
    }
}
export interface IBean {
    total: number,
}
export interface IBeans {
}
export default class MyReservation extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            data: {
                beans: []
            },
            playOpen: false,
            sound: "",
            total: 0,
            searchParams: {
                start: 0,
                limit: 0,
                campaignId: this.props.campaignId,
            }
        }
    }
    public handleSubmit = () => {
        this.props.handleClose("myReservation")
    }
    public search = () => {
        Ajax.post<IBean, IBeans>("/task/getMyAppointment", this.state.searchParams).then(({ data }) => {
            this.setState({
                data: data,
                total: data.bean.total
            })
        }).catch(() => { })
    }
    public componentDidMount = () => {
        this.search()
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
        Ajax.post("/task/getAudioUrl", { callId: item.soundRecord }).then(({ data }) => {
            this.setState({
                sound: data.object.audioURL
            })
        }).catch(() => { })
        if (!this.state.sound) {
            this.setState({
                playOpen: false
            })
            message.warning("暂无录音", 0.5)
        } else {
            const operationType = e.currentTarget.getAttribute("operation-type")
            if (/^play$/.test(operationType)) {
                this.setState({
                    playOpen: true,
                })
            }
        }
        e.preventDefault()
    }
    public playHandleClose = (type: string) => {
        if (/^play$/.test(type)) {
            this.setState({
                playOpen: false,
            })
        }
    }
    public render() {
        return (
            <Modal
                style={{ width: 850, height: 550 }}
                onOk={this.handleSubmit}
                onCancel={this.props.handleClose("myReservation")}
                keyboard={true}
                title="我的预约"
            >
                <div>
                    <div>
                        <div className="qd-popup-contnet" style={{ height: "370px" }}>
                            <div className="describe">
                                <span>分省汇总：汇总3</span>
                                <div className="fn-right">
                                    <a href="" title="删除">
                                        <i className="iconfont icon-iconfont-shanchu"></i>
                                    </a>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <table className="t-table t-table-striped">
                                <thead>
                                    <tr>
                                        <th>预约时间</th>
                                        <th>客户手机号</th>
                                        <th>业务结果</th>
                                        <th>预约原因</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.data ? this.state.data.beans.map((item: any, index: number) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.apptolTime}</td>
                                                    <td>
                                                        <span>{item.acceptPhone}</span>
                                                        {
                                                            (() => {
                                                                if (item.soundRecord) {
                                                                    //判断是否有录音地址
                                                                    return (
                                                                        <em onClick={(e) => { this.playHandleOpen(e, item) }} operation-type="play" className="iconfont icon-arrow"></em>
                                                                    )
                                                                }
                                                            })()
                                                        }
                                                    </td>
                                                    <td>{item.calloutStsCd}</td>
                                                    <td>{item.approlReason}</td>
                                                    {
                                                        (() => {
                                                            let date = item.apptolTime.replace(/-/g, '/')
                                                            if (new Date().getTime() - new Date(date).getTime() <= 86400000 && 0 <= new Date().getTime() - new Date(date).getTime()) {
                                                                return (
                                                                    <td>可呼叫</td>
                                                                )
                                                            } else if (new Date().getTime() - new Date(date).getTime() < 0) {
                                                                return (
                                                                    <td>待外呼</td>
                                                                )
                                                            } else if (86400000 < new Date().getTime() - new Date(date).getTime()) {
                                                                return (
                                                                    <td>已超时</td>
                                                                )
                                                            }
                                                        })()
                                                    }

                                                </tr>
                                            )
                                        }) : null
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                {
                    this.state.playOpen ?
                        <Play
                            soundRecord={this.state.sound}
                            playOpen={this.state.playOpen}
                            handleClose={this.playHandleClose}
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

