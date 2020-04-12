import React, { Component } from "react"
import Play from "./play"
import Ajax from "../../../../../chushi/art-ajax"
import { Modal, Pagination } from "antd"

export interface IProps {
    handleClose: Function,
    reservationOpen: boolean,
    campaignId: string,
    campaignName: string
}
export interface IState {
    data: any,
    total: number,
    playOpen: boolean,
    soundRecord: string,
    searchParams: {
        start: number,
        limit: number,
        campaignId: string
    }
}

export default class Reservation extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            data: null,
            total: 0,
            playOpen: false,
            soundRecord: "",
            searchParams: {
                start: 0,
                limit: 10,
                campaignId: this.props.campaignId
            }
        }
    }
    public handleSubmit = () => {
        this.props.handleClose("reservation")
    }
    public search = () => {
        Ajax.post("/task/getProjectReservationInformation", this.state.searchParams).then(({ data }: { data: any }) => {
            this.setState({
                data: data,
                total: parseInt(data.bean.total)
            })
        }).catch(() => { })
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
    public handleClose = (type: any) => {
        if (/^play$/.test(type)) {
            this.setState({
                playOpen: false
            })
        }
    }
    public handleOpen = (e: any, item: { soundRecord: string }) => {
        const operationType = e.currentTarget.getAttribute("opration-type")
        if (/^play$/.test(operationType)) {
            this.setState({
                playOpen: true,
                soundRecord: item.soundRecord
            })
        }
        e.preventDefault()
    }
    public componentDidMount = () => {
        this.search()
    }
    public render() {
        return (
            <Modal
                style={{ width: 850, height: 550 }}
                onOk={this.handleSubmit}
                onCancel={this.props.handleClose("reservation")}
                keyboard={true}
                title="预约管理"
            >
                <div>
                    <div className="qd-popup-content" style={{ "height": "360px", "margin": "0 0 25px 0" }}>
                        <div className="describe">
                            <span>{this.props.campaignName}</span>
                            <div className="clearfix"></div>
                        </div>
                        <table className="t-table t-table-striped">
                            <thead>
                                <tr>
                                    <th>预约时间</th>
                                    <th>预约手机号</th>
                                    <th>业务结果</th>
                                    <th>预约原因</th>
                                    <th>状态</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data ?
                                        this.state.data.beans.map((item: any, index: number) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.apptolTime}</td>
                                                    <td className="perIcon">
                                                        <span>{item.acceptPhone}</span>
                                                        <em onClick={(e) => { this.handleOpen(e, item) }}
                                                            opration-type="play" className="iconfont icon-arraw"></em>
                                                    </td>
                                                    <td>{item.calloutStsCd}</td>
                                                    <td>{item.apptolReason}</td>
                                                    {
                                                        (() => {
                                                            let date = item.apptolTime.replace(/-/g, '/')
                                                            if (86400000 <= new Date().getTime() - Date.parse(date)) {
                                                                return (
                                                                    <td>
                                                                        已超时
                                                                    </td>
                                                                )
                                                            } else {
                                                                return (
                                                                    <td>待外呼</td>
                                                                )
                                                            }
                                                        }
                                                        )()
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
                            soundRecord={this.state.soundRecord}
                            playOpen={this.state.playOpen}
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