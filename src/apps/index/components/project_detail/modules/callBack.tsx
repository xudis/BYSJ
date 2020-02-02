import React, { Component } from "react"
import { Modal, Pagination, Table } from "antd"
import Ajax from "../../../../../chushi/art-ajax"
import Feedback from "./feedback"
import Play from "./play"
export interface IProps {
    handleClose: Function,
    callBackOpen: boolean,
    campaignId: string,
    campaignName: string,
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

    private columns = [
        {
            title: "回拨时间",
            dataIndex: "reserTimeFlag"
        }, {
            title: "手机号",
            dataIndex: "callbackTel",
            render: (record: any, text: any) => {
                return (
                    <div>
                        <span> {text}</span>
                        <em onClick={(e) => { this.playHandleOpen(e, record) }}></em>
                    </div>
                )
            }
        }, {
            title: "业务结果",
            dataIndex: "businessResult"
        }, {
            title: "回拨原因",
            dataIndex: "callbackReason"
        }, {
            title: "操作",
            dataIndex: "callbackState",
            render: (record: any, text: any) => {
                switch (text) {
                    case "1":
                        let d = new Date()
                        let date = record.reserTimeFlag.replace(/-/g, "/")
                        if (d.getTime() < Date.parse(date)) {
                            text = (<span>待外呼</span>)
                        } else {
                            text = (<span>已超时</span>)
                        }
                        break;
                    case "2":
                        text = (
                            <span onClick={(e) => { this.handleOpen(e, record) }} opeation-type="feedback">
                                <a href="javascript:;">查看反馈</a>
                            </span>)
                        break;
                }
                return (
                    <div>{text}</div>
                )
            }
        }
    ]

    public handleSubmit = () => {
        this.props.handleClose("callBack")
    }
    public search = () => {
        Ajax.post<IBean, IBeans>("/task/getCallbackManagement", this.state.searchParams).then(({ data }: { data: any }) => {
            this.setState({
                data: data.beans,
                total: parseInt(data.bean.total)
            })
        }).catch(() => { })
    }
    public componentDidMount = () => {
        this.search()
    }
    //点击分页器更新列表数据
    public pageSearch = (page: number) => {
        this.setState({
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
                soundRecord: item.rcdngFilePath
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
        const operationType = e.currentTarget.getAttribute("operation-type")
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
                onCancel={this.props.handleClose("callBack")}
                keyboard={true}
                title="回拨管理"
            >
                <div>
                    <div className="qd-popup-content" style={{ "height": "360px", "margin": "0 0 25px 0" }}>
                        <div className="describe">
                            <div className="clearfix"></div>
                        </div>
                        <Table
                            dataSource={this.state.data}
                            columns={this.columns}
                            bordered={true}
                            pagination={false}
                        >
                        </Table>
                    </div>
                </div>
                {
                    this.state.playOpen ?
                        <Play
                            soundRecord={this.state.soundRecord}
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