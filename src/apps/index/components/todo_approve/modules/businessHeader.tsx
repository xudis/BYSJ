import React, { Component } from "react"
import Ajax from "../../../../../chushi/art-ajax"
import { Modal, message } from "antd"

export interface IProps {
    record: any
}
export interface IState {
    agreeOpen: boolean,
    rejectOpen: boolean,
    rejectReason: string,
    isApprove: boolean,
    isReject: boolean
}
export interface IBeans {

}
export interface IBean {

}
export default class BusinessHeader extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)
        this.state = {
            agreeOpen: false,
            rejectOpen: false,
            rejectReason: "",
            isApprove: false,
            isReject: false
        }
    }
    //审批弹窗
    public handleAgreeOpen = () => {
        this.setState({
            agreeOpen: true
        })
    }
    public handleAgreeClose = () => {
        this.setState({
            agreeOpen: false
        })
    }

    public handleAgreeSubmit = () => {
        const { record } = this.props
        Ajax.post("/chnlApprove/qyChnlApprovePass", {
            callId: record.called,
            oldStatu: record.oldCallResult,
            newStatu: record.newCallResult,
            applyStats: "0",
            applyId: record.applyId,
            campaignId: record.campaignId,
            sampleId: record.sampleId,
            bizId: record.bizId,
            approlStaffId: record.approlStaffId,
            approlStaffName: record.approlStaffId,
            calledNmDisplay: record.calledNmDisplay,
            calledNmExtStr: record.calledNmExtStr,
            calledNm: record.calledNm
        }).then(({ data }) => {
            if (data.returnCode == 0) {
                this.setState({
                    isApprove: true
                })
                message.success("审批成功")
            } else {
                message.error("审批失败")
            }
        }).catch(() => {
            message.error("审批失败")
        })
        this.handleAgreeClose()
    }
    public handleRejectOpen = () => {
        this.setState({
            rejectOpen: true
        })
    }
    public handleRejectClose = () => {
        this.setState({
            rejectOpen: false
        })
    }
    public changeRejectReason = (e: any) => {
        this.setState({
            rejectReason: e.target.value
        })
    }
    public info = () => {
        message.warning("原因不能为空", 0.3)
    }

    public handleRejectSubmit = () => {
        const { record } = this.props;
        const { rejectReason } = this.state;
        if (rejectReason.length === 0) {
            this.info()
            return false
        }
        Ajax.post("/chnlApprove/qyChnlApprovePass", {
            callId: record.called,
            oldStatu: record.oldCallResult,
            newStatu: record.newCallResult,
            appl有Stats: "1",
            applyId: record.applyId,
            campaignId: record.campaignId,
            sampleId: record.sampleId,
            bizId: record.bizId,
            approlStaffId: record.approlStaffId,
            approlStaffName: record.approlStaffId,
            calledNmDisplay: record.calledNmDisplay,
            calledNmExtStr: record.calledNmExtStr,
            calledNm: record.calledNm
        }).then(({ data }) => {
            if (data.returnCode == 0) {
                this.handleRejectClose()
                this.setState({
                    isApprove: true
                })
                message.success("驳回成功", 0.3)
            } else {
                message.error("驳回失败", 0.3)
            }
        }).catch(() => {
            message.error("驳回失败", 0.3)
        })
        this.handleRejectClose()
    }
    render() {
        const { record } = this.props;
        const { isApprove, agreeOpen, isReject, rejectOpen, rejectReason } = this.state;
        let realyBtn;
        if (isApprove === true) {
            realyBtn = (
                <div className="approved-rejected">
                    <span>已审批</span>
                </div>
            );
        } else if (isReject === true) {
            realyBtn = (
                <div className="approved-rejected">
                    <span>已驳回</span>
                </div>
            );
        } else {
            realyBtn = (
                <div className="btn-wrapper">
                    <div>
                        <button className="agree-btn" onClick={this.handleAgreeOpen}>审批通过</button>
                        <Modal
                            visible={agreeOpen}
                            onCancel={this.handleAgreeClose}
                            onOk={this.handleAgreeSubmit}>
                            <h1>是否审批通过？</h1>
                        </Modal>
                    </div>
                    <div>
                        <Modal
                            style={{ width: "600px", height: "400px" }}
                            visible={rejectOpen}
                            onCancel={this.handleRejectClose}
                            onOk={this.handleRejectSubmit}
                            title="驳回原因">
                            <textarea
                                style={{ width: "100%", height: "95%" }}
                                placeholder="请输入驳回原因"
                                className="reject-reason"
                                value={rejectReason}
                                onChange={this.changeRejectReason}
                            >
                            </textarea>
                        </Modal>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div className="business-approve-detail-header">
                    <div className="msg-wrapper">
                        <div className="header">业务结果审批</div>
                        <ul className="msg">
                            <li>业务类型</li>
                            <li>原结果</li>
                            <li>现结果</li>
                            <li>提交时间</li>
                            <li>营销类</li>
                            <li>{record.oldCallResultMsg}</li>
                            <li>{record.newCallResultMsg}</li>
                            <li>{record.crtTime}</li>
                        </ul>
                    </div>
                    {realyBtn}
                </div>
            </div>
        )
    }
}