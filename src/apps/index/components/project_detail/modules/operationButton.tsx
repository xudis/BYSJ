import React, { Component } from "react"
import { Modal, message } from "antd"
import CallBack from "./callBack"
import CallTwice from "./callTwice"
import Reservation from "./reservation"
import MyReservation from "./myReservation"
import MyCallBack from "./myCallBack"
import QuestionView from "./questionnaireView"
import Ajax from "../../../../../chushi/art-ajax"

export interface IProps {
    charactor: string,
    campaignId: string,
    addressUrl: string,
    campaignName: string,
    gradualTypeOutBound: string
}
export interface IState {
    open: boolean,
    imgUrl: string,
    reservationOpen: boolean,
    callBackOpen: boolean,
    callTwiceOpen: boolean,
    myCallBackOpen: boolean,
    myReservationOpen: boolean,
    feedBackOpen: boolean,
    status: string,
}
export interface IBean {
    questionnaireAddress: string
}
export interface IBeans {
}
export default class myMonitoring extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            open: false,
            imgUrl: "",
            reservationOpen: false,
            callBackOpen: false,
            callTwiceOpen: false,
            myCallBackOpen: false,
            myReservationOpen: false,
            feedBackOpen: false,
            status: props.charactor,
        }
    }
    public questionPreview = () => {
        if (this.state.status === "1" || this.state.status == "2") {
            const url = this.props.addressUrl
            if (url) {
                this.setState({
                    imgUrl: url,
                    open: true
                })
            } else {
                message.info("该项目无问卷", 0.3)
            }
        } else if (this.state.status === "3") {
            Ajax.post<IBean, IBeans>("/task/getProjectQuestionnaire", { campaignId: this.props.campaignId }, {}).then(({ data }: any) => {
                const url = data.bean.questionnaireAddress
                if (url) {
                    this.setState({
                        imgUrl: url,
                        open: true
                    })
                } else {
                    message.info("该项目无问卷", 0.3)
                }
            }).catch(() => { })
        }
    }
    public handleOpen = (e: any) => {
        const operationType = e.currentTarget.getAttribute("operation-type")
        if (/^resefalseion$/.test(operationType)) {
            this.setState({
                reservationOpen: true
            })
        }
        else if (/^callBack$/.test(operationType)) {
            this.setState({
                callBackOpen: true
            })
        }
        else if (/^callTwice$/.test(operationType)) {
            this.setState({
                callTwiceOpen: true
            })
        }
        else if (/^myCallBack$/.test(operationType)) {
            this.setState({
                myCallBackOpen: true
            })
        }
        else if (/^myReservation$/.test(operationType)) {
            this.setState({
                myReservationOpen: true
            })
        }
    }
    public handleClose = (type: string) => {
        if (/^reservation$/.test(type)) {
            this.setState({
                reservationOpen: false
            })
        }
        else if (/^callBack$/.test(type)) {
            this.setState({
                callBackOpen: false
            })
        }
        else if (/^callTwice$/.test(type)) {
            this.setState({
                callTwiceOpen: false
            })
        }
        else if (/^myCallBack$/.test(type)) {
            this.setState({
                myCallBackOpen: false
            })
        }
        else if (/^myReservation$/.test(type)) {
            this.setState({
                myReservationOpen: false
            })
        }
    }
    public handleCloseTz = () => {
        this.setState({
            open: false
        })
    }
    public render() {
        let { open, imgUrl } = this.state
        if (this.state.status === "3") {
            return (
                <div>
                    <div className="operate-box mt-10">
                        <ul className="clearfix">
                            <li className="cursor" onClick={this.questionPreview}>
                                <p>
                                    <label className="wenjuan"></label>
                                    <span>问卷预览</span>
                                </p>
                            </li>
                            <li className="cursor" operation-type="reservation" onClick={this.handleOpen}>
                                <p>
                                    <label className="yuyue"></label>
                                    <span>预约管理</span>
                                </p>
                            </li>
                            <li className="cursor" operation-type="callBack" onClick={this.handleOpen}>
                                <p>
                                    <label className="huibo"></label>
                                    <span>回拨管理</span>
                                </p>
                            </li>
                            <li className="cursor" operation-type="callTwice" onClick={this.handleOpen}>
                                <p>
                                    <label className="erhu"></label>
                                    <span>二呼管理</span>
                                    <em className="green-cricle"></em>
                                </p>
                            </li>
                        </ul>
                        <Modal
                            mask={open}
                            onCancel={this.handleCloseTz}
                            title="问卷预览"
                            width={850}
                            style={{ height: "550px" }}
                        >
                            <QuestionView imgUrl={imgUrl} />
                        </Modal>
                    </div>
                    {/* 预约管理*/}
                    {
                        this.state.reservationOpen ?
                            <Reservation
                                campaignId={this.props.campaignId}
                                reservationOpen={this.state.reservationOpen}
                                handleClose={this.handleClose}
                                campaignName={this.props.campaignName}
                            /> : ""
                    }
                    {/* /**回拨管理 */}
                    {
                        this.state.callBackOpen ?
                            <CallBack
                                callBackOpen={this.state.callBackOpen}
                                handleClose={this.handleClose}
                                campaignId={this.props.campaignId}
                                campaignName={this.props.campaignName}
                            /> : ""
                    }
                    {/* /**二呼管理 */}
                    {
                        this.state.callTwiceOpen ?
                            <CallTwice
                                callTwiceOpen={this.state.callTwiceOpen}
                                handleClose={this.handleClose}
                                campaignId={this.props.campaignId}
                            /> : ""
                    }

                </div>
            )
        } else if (this.state.status === "1" || this.state.status === "2") {
            return (
                <div>
                    <div className="operate-box mt-10">
                        <ul className="clearfix">
                            <li className="cursor" onClick={this.questionPreview}>
                                <p>
                                    <label className="wenjuan"></label>
                                    <span>问卷预览</span>
                                </p>
                            </li>
                            <li className="cursor" operation-type="myReservation" onClick={this.handleOpen}>
                                <p>
                                    <label className="yuyue"></label>
                                    <span>我的预约</span>
                                </p>
                            </li>
                            <li className="cursor" operation-type="myCallBack" onClick={this.handleOpen}>
                                <p>
                                    <label className="huibo"></label>
                                    <span>我的回拨</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                    {/**我的回拨 */}
                    {
                        this.state.myCallBackOpen ?
                            <MyCallBack
                                myCallBackOpen={this.state.myCallBackOpen}
                                handleOpen={this.handleOpen}
                                handleClose={this.handleClose}
                                campaignId={this.props.campaignId}
                                campaignName={this.props.campaignName}
                            /> : ""
                    }
                    {/**我的预约 */}
                    {
                        this.state.myReservationOpen ?
                            <MyReservation
                                myReservationOpen={this.state.myReservationOpen}
                                handleClose={this.handleClose}
                                campaignId={this.props.campaignId}
                                campaignName={this.props.campaignName}
                            /> : ""
                    }
                    <Modal
                        mask={open}
                        onCancel={this.handleCloseTz}
                        title="问卷预览"
                        width={850}
                        style={{ height: "550px" }}
                    >
                        <QuestionView imgUrl={imgUrl} />
                    </Modal>
                </div>
            )
        }
    }
}