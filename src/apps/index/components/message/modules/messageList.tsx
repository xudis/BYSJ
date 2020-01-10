import React, { Component, Fragment } from "react"
import Ajax from '../../../../../chushi/art-ajax'
import { Link } from 'react-router-dom'

export interface IState {
    items: any,
    searchParams: object
}
export interface IProps {
    listMessage: Array<{}>,
    showDetail: Function,
    searchParamsParam: object,
    history: {
        push: Function
    }
}


export default class Data_center extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)
        this.state = {
            items: this.props.listMessage,
            searchParams: this.props.searchParamsParam,
        }
    }
    public rightContentitem = (item: any) => {
        item.isRead = "1"
        let recordId = item.recordId
        let crtTime = item.crtTime
        Ajax.post("/message/getMsgDetail", { recordId: recordId, crtTime: crtTime }).then(({ data }) => {
            this.setState({
                items: data.beans[0]
            }, () => {
                this.props.showDetail(this.state.items)
            })
        }).catch(() => { })
        setTimeout(() => {
            this.props.history.push({
                pathname: `/todoApprove/approveRecord`,
                state: {}
            }, 500)
        })
    }
    render() {
        const messageList = this.props.listMessage
        return (
            <div>
                <div className='fn-left list-scroll'>
                    <ul>
                        {
                            messageList.map((item: any) => {
                                if (item.msgType == "1") {
                                    return (
                                        <li className="weidu-list" key={item.id} onClick={() => { this.rightContentitem(item) }}>
                                            {
                                                (() => {
                                                    if (item.isRead == "0") {
                                                        return <em></em>
                                                    } else {
                                                        return <span></span>
                                                    }
                                                })()
                                            }
                                            <b className="weidu">审批类消息</b>
                                            <div className="time1"><a href="javascript:;"><span>在&nbsp;{item.modfTime}</span><i className="iconfont icon-right"></i></a></div>
                                            <p>{item.remark}</p>
                                        </li>
                                    )
                                }
                                else if (item.msgTpye == "2") {
                                    return (
                                        <li className="weidu-list" key={item.id} onClick={() => { this.rightContentitem(item) }}>
                                            {
                                                (() => {
                                                    if (item.isRead == "0") {
                                                        return <em></em>
                                                    } else {
                                                        return <span></span>
                                                    }
                                                })()
                                            }
                                            <b className="weidu">项目状态变更类消息</b>
                                            <div className="time1"><a href="javascript:;"><span>在&nbsp;{item.modfTime}</span><i className="iconfont icon-right"></i></a></div>
                                            <p>{item.remark}</p>
                                        </li>
                                    )
                                }
                                else if (item.msgTpye == "3") {
                                    return (
                                        <li className="weidu-list" key={item.id} onClick={() => { this.rightContentitem(item) }}>
                                            {
                                                (() => {
                                                    if (item.isRead == "0") {
                                                        return <em></em>
                                                    } else {
                                                        return <span></span>
                                                    }
                                                })()
                                            }
                                            <b className="weidu">项目预警类消息</b>
                                            <div className="time1"><a href="javascript:;"><span>在&nbsp;{item.modfTime}</span><i className="iconfont icon-right"></i></a></div>
                                            <p>{item.remark}</p>
                                        </li>
                                    )
                                }
                                else if (item.msgTpye == "4") {
                                    return (
                                        <li className="weidu-list" key={item.id} onClick={() => { this.rightContentitem(item) }}>
                                            {
                                                (() => {
                                                    if (item.isRead == "0") {
                                                        return <em></em>
                                                    } else {
                                                        return <span></span>
                                                    }
                                                })()
                                            }
                                            <b className="weidu">培训提醒类</b>
                                            <div className="time1"><a href="javascript:;"><span>在&nbsp;{item.modfTime}</span><i className="iconfont icon-right"></i></a></div>
                                            <p>{item.remark}</p>
                                        </li>
                                    )
                                } else if (item.msgTpye == "5") {
                                    return (
                                        <li className="weidu-list" key={item.id} onClick={() => { this.rightContentitem(item) }}>
                                            {
                                                (() => {
                                                    if (item.isRead == "0") {
                                                        return <em></em>
                                                    } else {
                                                        return <span></span>
                                                    }
                                                })()
                                            }
                                            <b className="weidu">预约提醒类</b>
                                            <div className="time1"><a href="javascript:;"><span>在&nbsp;{item.modfTime}</span><i className="iconfont icon-right"></i></a></div>
                                            <p>{item.remark}</p>
                                        </li>
                                    )
                                } else if (item.msgTpye == "6") {
                                    return (
                                        <li className="weidu-list" key={item.id} onClick={() => { this.rightContentitem(item) }}>
                                            {
                                                (() => {
                                                    if (item.isRead == "0") {
                                                        return <em></em>
                                                    } else {
                                                        return <span></span>
                                                    }
                                                })()
                                            }
                                            <b className="weidu">回拨提醒类消息</b>
                                            <div className="time1"><a href="javascript:;"><span>在&nbsp;{item.modfTime}</span><i className="iconfont icon-right"></i></a></div>
                                            <p>{item.remark}</p>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}