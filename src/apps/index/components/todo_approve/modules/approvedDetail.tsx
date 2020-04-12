import React, { Component } from "react"
import Ajax from "../../../../../chushi/art-ajax"
import { Link } from "react-router-dom"
import { Modal, message } from "antd"

export interface IProps {
    location: any
}

export interface IState {
    noDisturbing: string,
    open: boolean,
    reasonOpen: boolean,
    detailTitle: string,
    searchParams: SearchParamsInit,
    userPortrait: any,
    userInfo: any,
    dataThree: any[],
    dataLogArr: any[],
    moreInfoArr: any[],
    callResult: any,
    addressUrl: string,
    reasonData: string,
    moreLook: boolean,
    record: any
}

export interface SearchParamsInit {
    campaignId: string,
    serialNum: number,
    sampleId: string,
    customPhone: string,
    bizId: string
}

export interface IBeans {
    returnCode: any
}

export interface IBean {
    bean: object,
    qnrAddress: string
}

export default class ApprovedDetail extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)
        const { record, detailTitlt } = this.props.location.state || JSON.parse(sessionStorage.getItem("approvedDetail"))
        sessionStorage.setItem("approvedDetail", JSON.stringify(
            record, detailTitlt
        ))
        this.state = {
            noDisturbing: "",
            open: false,
            reasonOpen: false,
            detailTitle: detailTitlt,
            searchParams: {
                campaignId: record.campaignId,
                serialNum: record.callId,
                sampleId: record.sampleId,
                customPhone: record.calledNum,
                bizId: record.bizId
            },
            userPortrait: {},
            userInfo: [],
            moreInfoArr: [],
            dataThree: [],
            dataLogArr: [],
            callResult: {},
            addressUrl: "",
            reasonData: "",
            moreLook: true,
            record
        }
    }



    public handleMany = (type: any) => {
        let dataLogArr, moreLook;
        if (type == 0) {
            dataLogArr = this.state.dataThree;
            moreLook = false
        } else {
            dataLogArr = this.state.dataThree.slice(0, 3)
            moreLook = true
        }
        this.setState({
            dataLogArr,
            moreLook
        })
    }

    public moreDetails = (itemParams: any) => {
        let modalQueEdit: any = {}
        modalQueEdit.qnrId = itemParams.oldQnrId;
        modalQueEdit.oldAnswerId = itemParams.oldAnsId;
        modalQueEdit.newAnswerId = itemParams.newAnsId;
        Ajax.post<IBean, IBeans>("/questionSurvey/getQnrDetailsAddress", modalQueEdit).then(({ data }: { data: any }) => {
            if (data.returnCode == "0") {
                this.setState({
                    open: true,
                    addressUrl: data.bean.qnrAddress
                })
            } else {
                this.setState({
                    open: false
                })
            }
        }).catch(() => {
            this.setState({
                open: false
            })
        })
    }



    public handleOpen = () => {
        let paramsEdit = { qnrId: "", oldAnswerId: "", newAnswerId: "" }
        paramsEdit.qnrId = this.state.userPortrait.qnrId ? this.state.userPortrait.qnrId : ""
        paramsEdit.oldAnswerId = this.state.userPortrait.aswshetId ? this.state.userPortrait.aswshetId : ""
        Ajax.post<IBean, IBeans>("/questionSurvey/getQnrApprovalAddress", paramsEdit).then(({ data }: { data: any }) => {
            if (data.returnCode == "0") {
                this.setState({
                    open: true,
                    addressUrl: data.bean.qnrAddress
                })
            } else {
                message.warn(data.returnMessage, 0.7)
            }
        }).catch(() => {

        })
    }

    public handleReasonOpen = (reason: any) => {
        this.setState({
            reasonData: reason,
            reasonOpen: true
        })
    }

    public handleClose = () => {
        this.setState({
            reasonOpen: false,
            open: false
        })
    }


    public componentDidMount = () => {
        this.search()
    }

    public addMoreInfo = (type: any) => {
        if (type == 0) {
            this.setState({
                moreInfoArr: this.state.userInfo
            })
        } else {
            this.setState({
                moreInfoArr: []
            })
        }
    }

    public search = () => {
        Ajax.post<IBean, IBeans>("/businessResultDetails/getBusinessDetails", this.state.searchParams).then(({ data }: { data: any }) => {
            if (data.returnCode == "0") {
                this.setState({
                    userInfo: data.beans,
                    userPortrait: data.bean,
                    callResult: data.bean
                })
            }
        })
        Ajax.post("/business/getBusiResLogList", {
            callId: this.state.searchParams.serialNum
        }).then(({ data }: { data: any }) => {
            if (data.returnCode == "0") {
                this.setState({
                    dataThree: data.beans,
                    dataLogArr: data.beans.slice(0, 3)
                })
            }
        })
        let objParam = {
            acceptPhone: this.state.record.calledNum,
            acceptPhoneDisplay: "",
            acceptPhoneExtstr: ""
        }
        Ajax.post("/business/getBusiResLogList", objParam).then(({ data }: { data: any }) => {
            this.setState({
                noDisturbing: data.bean.state,
            })
        }).catch(() => {
        })
    }
    render() {
        let defauleImg = "";
        let noEditRecord;
        if (this.state.dataLogArr.length == 0) {
            noEditRecord = <div style={{ marginTop: "4px" }}>暂无修改记录</div>
        }
        const { detailTitle, moreLook, moreInfoArr } = this.state
        let callQueDetail, title, idTypeSpan;
        let { callId, calledNum, staffPhone, actvName, staffName, } = this.state.userInfo
        let { beginDate, submitTime, vldRsltFlag, talkTime, idType, resultType } = this.state.callResult, callingProvName, callingCityName, callingCountName, girdNm, hallName, state, qnrId, aswshetId, imgUrl
        let resultTypeSpan = ""
        let vldRsltFlagContent
        switch (resultType) {
            case "0399":
                resultTypeSpan = "营销失败"
                break;
            case "0700":
                resultTypeSpan = "营销成功"
                break;
            case "0104":
                resultTypeSpan = "关机"
                break;
            case "0102":
                resultTypeSpan = "忙音"
                break;
            case "0105":
                resultTypeSpan = "无人接听"
                break;
            case "0106":
                resultTypeSpan = "停机"
                break;
            case "0402":
                resultTypeSpan = "指定业务代表预约"
                break;
            case "0802":
                resultTypeSpan = "无效"
                break;
            case "0114":
                resultTypeSpan = "用户拒接"
                break;
            case "0005":
                resultTypeSpan = "未提交"
                break;
            case "0006":
                resultTypeSpan = "未提交"
                break;
            case "0000":
                resultTypeSpan = "营销失败"
                break;
        }
        switch (idType) {
            case "0":
                idTypeSpan = <span>无认证</span>
                break;
            case "2":
                idTypeSpan = <span>密码验证</span>
                break;
            case "3":
                idTypeSpan = <span>随机码认证</span>
                break;
            case "4":
                idTypeSpan = <span>按一号键确认</span>
                break;
        }
        switch (vldRsltFlag) {
            case "1":
                vldRsltFlagContent = <span>认证通过</span>
                break;
            case "2":
                vldRsltFlagContent = <span>认证不通过</span>
                break;
            case "":
                vldRsltFlagContent = <span>无</span>
                break;
        }
        switch (detailTitle) {
            case "businessResult":
                title = "业务结果详情"
                callQueDetail = <span><a href="" className="look" onClick={this.handleOpen}>查看</a></span>
                break;

            case "noDisturbResult":
                title = "免打扰结果详情"
                callQueDetail = <span><a href="" className="look" onClick={this.handleOpen}>查看</a></span>
                break;
        }
        const MoreLook = (<div className="more-look">
            <p>
                {
                    moreLook == true ?
                        <a onClick={() => { this.handleMany(0) }} style={{ cursor: "pointer" }}>更多修改记录&nbsp;<i className="iconfont detail-icon-down"></i></a> :
                        <a onClick={() => { this.handleMany(1) }} style={{ cursor: "pointer" }}>收起&nbsp;<i className="iconfont detail-icon-up"></i></a>
                }
            </p>
        </div>)
        return (
            <div>
                <div>
                    <div className="qd-inner">
                        <div className="common-title">
                            <h3>
                                <Link to="./todoApprove/approveRecord" className="iconfont icon-left"> </Link>
                                <span>{title}</span>
                            </h3>
                        </div>
                        <div className="detail-result qd-box">
                            <p className="order-title">{callId}</p>
                            <h3 className="resutle-num">
                                <b>{calledNum}</b>
                                <span>{resultTypeSpan}</span>
                            </h3>
                            <b>{actvName}</b>
                            <ul className="resule-con clearfix">
                                {
                                    moreInfoArr.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <label>{Object.keys(item)[0]}</label>
                                                {/* <span>{Object.values(item)[0]}</span> */}
                                            </li>
                                        )
                                    })
                                }
                                {
                                    this.state.userInfo.length > 3 ? (moreInfoArr.length > 0 ?
                                        (<li className="width-all" style={{ cursor: "pointer" }}><a className="more" onClick={() => { this.addMoreInfo(1) }}>收起&nbsp;<i className="iconfont detail-icon-up"></i></a></li>) :
                                        (<li className="width-all" style={{ cursor: "pointer" }}><a className="more" onClick={() => { this.addMoreInfo(0) }}>更多信息&nbsp;<i className="iconfont detail-icon-down"></i></a></li>)
                                    ) : null
                                }
                                <div className="detail-result mt-20 qd-box">
                                    <h3 className="resutle-num"><b>外呼店员</b></h3>
                                    <dl>
                                        <dt><img src={imgUrl ? imgUrl : defauleImg} alt="" /></dt>
                                        <dd>
                                            <p><b>{staffName}</b><span>{staffPhone}</span></p>
                                            <p>{callingProvName}{callingCityName}{callingCountName}{girdNm}{hallName}</p>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="detail-result mt-20 qd-box">
                                    <h3 className="resutle-num"><b>通话信息</b></h3>
                                    <ul className="resule-con clearfix">
                                        <li>
                                            <label>接通时间：</label>
                                            <span>{beginDate}</span>
                                        </li>
                                        <li>
                                            <label>通话时长：</label>
                                            <span>{talkTime}</span>
                                        </li>
                                        <li>
                                            <label>结果提交时间：</label>
                                            <span>{submitTime}</span>
                                        </li>
                                        <li>
                                            <label>验证类型：</label>
                                            <span>{idTypeSpan}</span>
                                        </li>
                                        <li>
                                            <label>IVR结果：</label>
                                            <span>{vldRsltFlagContent}</span>
                                        </li>
                                    </ul>
                                </div>
                            </ul>
                        </div>
                        <div className="detail-result mt-20 qd-box">
                            <h3 className="resutle-num"><b>通话结果</b></h3>
                            <ul className="resule-con clearfix">
                                <li>
                                    <label>问卷详情：</label>
                                    <span>{callQueDetail}</span>
                                </li>
                                <li>
                                    <label>业务结果：</label>
                                    <span>{resultTypeSpan}</span>
                                </li>
                                <li>
                                    <label>免打扰状态：</label>
                                    <span>{this.state.noDisturbing == "0" ? "是" : "否"}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="detail-result mt-20 qd-box">
                            <h3 className="resutle-num"><b>修改记录</b></h3>
                            <table style={{ border: "0", width: "100%" }} className="detail-table mt-20">
                                <tbody>
                                    {
                                        this.state.dataLogArr.map(
                                            (item: any, index: any) => {
                                                if (item.modfType == 3) {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className="redit-div">
                                                                    <p>{item.mktgRsltModTime}</p>
                                                                    <p><span>免打扰</span></p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="state-div">
                                                                    {
                                                                        item.mktgRsltStatus !== "0" ? item.mktgRsltStatus == "1" ?
                                                                            <p><span className="iconfont icon-exclamation-circle" ></span>已驳回<a onClick={() => { this.handleReasonOpen(item.rejectDesc) }} opration-type="modalRea">原因</a></p> :
                                                                            (() => {
                                                                                return (
                                                                                    <div>
                                                                                        <p><span className="iconfont iocn-clock-circle"></span>修改审批提出时间</p>
                                                                                        <p style={{ marginTop: "-37px" }}>{item.rtTime}</p>
                                                                                    </div>
                                                                                )
                                                                            })() :
                                                                            <p><span className="iconfont iocn-heck-ircle"></span>已通过</p>
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="redit-div">
                                                                    <p><span>修改前状态</span></p>
                                                                    <p>{item.oldDnd}</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="redit-div">
                                                                    <p><span>修改后状态</span></p>
                                                                    <p>{item.newDnd}</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="redit-div">
                                                                    <p><span>提交人</span></p>
                                                                    <p>{item.applStaffName}</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="redit-div">
                                                                    <p><span>审批人</span></p>
                                                                    <p>{item.subStaffName}</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                } else if (item.modfType == 2) {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className="redit-div">
                                                                    <p>{item.mktgRsltModfTime}</p>
                                                                    <p><span>问卷</span></p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="state-div">
                                                                    {
                                                                        item.mktgRsltStatus !== "0" ? item.mktgRsltStatus == "1" ?
                                                                            <p><span className="iconfont icon-exclamation-circle" ></span>已驳回<a onClick={() => { this.handleReasonOpen(item.rejectDesc) }} opration-type="modalRea">原因</a></p> :
                                                                            (() => {
                                                                                return (
                                                                                    <div>
                                                                                        <p><span className="iconfont iocn-clock-circle"></span>修改审批提出时间</p>
                                                                                        <p style={{ marginTop: "-37px" }}>{item.rtTime}</p>
                                                                                    </div>
                                                                                )
                                                                            })() :
                                                                            <p><span className="iconfont iocn-heck-ircle"></span>已通过</p>
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="redit-div">
                                                                    <p><span>问卷修改详情</span></p>
                                                                    <a onClick={() => { this.moreDetails(item) }}>查看</a>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="redit-div">
                                                                    <p><span>提交人</span></p>
                                                                    <p>{item.applStaffName}</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="redit-div">
                                                                    <p><span>审批人</span></p>
                                                                    <p>{item.subStaffName}</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                } else if (item.modfType == 1) {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className="redit-div">
                                                                    <p>{item.mktgRsltModfTime}</p>
                                                                    <p><span>业务结果</span></p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="state-div">
                                                                    {
                                                                        item.mktgRsltStatus !== "0" ? item.mktgRsltStatus == "1" ?
                                                                            <p><span className="iconfont icon-exclamation-circle" ></span>已驳回<a onClick={() => { this.handleReasonOpen(item.rejectDesc) }} opration-type="modalRea">原因</a></p> :
                                                                            (() => {
                                                                                return (
                                                                                    <div>
                                                                                        <p><span className="iconfont iocn-clock-circle"></span>修改审批提出时间</p>
                                                                                        <p style={{ marginTop: "-37px" }}>{item.rtTime}</p>
                                                                                    </div>
                                                                                )
                                                                            })() :
                                                                            <p><span className="iconfont iocn-heck-ircle"></span>已通过</p>
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="redit-div">
                                                                    <p><span>修改前状态</span></p>
                                                                    <p>{item.oldMktgRslt}</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="redit-div">
                                                                    <p><span>修改后状态</span></p>
                                                                    <p>{item.newMktgRslt}</p>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div className="redit-div">
                                                                    <p><span>提交人</span></p>
                                                                    <p>{item.applStaffName}</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="redit-div">
                                                                    <p><span>审批人</span></p>
                                                                    <p>{item.subStaffName}</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            }
                                        )
                                    }
                                </tbody>
                            </table>
                            {noEditRecord}
                            {this.state.dataThree.length > 3 ? MoreLook : null}
                        </div>
                    </div>
                </div>
                <Modal
                    style={{ width: "800px", height: "550" }}
                    visible={this.state.open}
                    onCancel={this.handleClose}
                    title="问卷修改详情"
                >
                    <QuestionnairePopup imgUrl={this.state.addressUrl} />
                </Modal>
                <Modal
                    style={{ width: "650px", height: "500" }}
                    visible={this.state.reasonOpen}
                    onCancel={this.handleClose}
                    title="驳回原因"
                >
                    <h1>{this.state.reasonData}</h1>
                </Modal>
            </div>
        )
    }
}