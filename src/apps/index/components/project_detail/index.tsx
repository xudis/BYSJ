import React, { Component } from "react"
import Ajax from "../../../../chushi/art-ajax"
import OperationButton from "./modules/operationButton"

let sessionStorageCampaignId = ""
let frequentUrl = ""

export interface IProps {
    charcator: string,
    location: any,
    history: any
}
export interface IState {
    status: string,
    projectData: {
        campaignName: string,
        state: String,
        verificationMode: string,
        beginDate: string,
        endDate: string,
        sampleDone: string,
        sampleCount: string,
        sampleNotDone: string,
        description: string,
        campaignId: string,
        gradualTypeOutBound: string
    },
    data: any[],
    itemDetails: any,
    qnrUrl: string
}

interface IBean {
    campaignId: any
}
interface IBeans { }
export default class Home extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            status: "",
            projectData: {
                campaignName: "",
                state: "",
                verificationMode: "",
                beginDate: "",
                endDate: "",
                sampleDone: "",
                sampleCount: "",
                sampleNotDone: "",
                description: "",
                campaignId: this.props.location.state ? this.props.location.state.itemDetails.campaignId : "",
                gradualTypeOutBound: ""
            },
            data: [],
            itemDetails: this.props.location.state ? this.props.location.state.itemDetails : "",
            qnrUrl: ""
        }
    }
    public changeState = () => {
        if (this.state.projectData.state == "04") {
            this.setState({
                projectData: {
                    ...this.state.projectData,
                    state: "05"
                }
            }, () => {
                Ajax.post("task/updateInfomation", {
                    campaignId: this.state.itemDetails.campaignId ? this.state.itemDetails.campaignId : sessionStorageCampaignId,
                    state: "05",
                    enablebsoption: this.state.projectData.campaignName
                }).then(() => { }).catch(() => { })
            })
        } else if (this.state.projectData.state == "05") {
            this.setState({
                projectData: {
                    ...this.state.projectData,
                    state: "04"
                }
            }, () => {
                Ajax.post("task/updateInfomation", {
                    campaignId: this.state.itemDetails.campaignId ? this.state.itemDetails.campaignId : sessionStorageCampaignId,
                    state: "04",
                    enablebsoption: this.state.projectData.campaignName
                }).then(() => { }).catch(() => { })
            })
        }
    }

    public render() {
        if (this.state.status === "3") {
            return (
                <div>
                    <div className="qd-inner">
                        {/**项目简介 */}
                        <div className="project-box qd-box clearfix mt-10">
                            <div className="project-box-left">
                                <div className="box-left-inner">
                                    <h3>
                                        <b>{this.state.projectData.campaignName}</b>
                                        {
                                            (() => {
                                                if (this.state.projectData.state === "04") {
                                                    return (<a href="javascript:;" className="qd-btn btn-primary" onClick={this.changeState}>暂停项目</a>)
                                                } else if (this.state.projectData.state === "05") {
                                                    return (<a href="javascript:;" className="qd-btn btn-primary" onClick={this.changeState}>启动项目</a>)

                                                }
                                            })()
                                        }
                                    </h3>
                                    <p className="project-time">
                                        {
                                            (() => {
                                                if (this.state.projectData.state === "04") {
                                                    return (
                                                        <span className="qd-tag tag-blue">执行中</span>
                                                    )
                                                } else if (this.state.projectData.state === "05") {
                                                    return (
                                                        <span className="qd-tag tag-blue" >已暂停</span>)
                                                }
                                            })()
                                        }
                                        {
                                            (() => {
                                                if (this.state.projectData.verificationMode === "0") {
                                                    return (
                                                        <span className="qd-tag " >无认证</span>
                                                    )
                                                } else if (this.state.projectData.verificationMode === "2") {
                                                    return (
                                                        <span className="qd-tag " >密码验证</span>)
                                                }
                                                else if (this.state.projectData.verificationMode === "3") {
                                                    return (
                                                        <span className="qd-tag " >随机码验证</span>)
                                                } else if (this.state.projectData.verificationMode === "4") {
                                                    return (
                                                        <span className="qd-tag " >按一号键确认</span>)
                                                }
                                            })()
                                        }
                                        {this.state.projectData.beginDate}至{this.state.projectData.endDate}
                                    </p>
                                </div>
                            </div>
                            <div className="project-box-right detail-box">
                                <p>{this.state.projectData.sampleDone}<span>/{this.state.projectData.sampleNotDone}+{this.state.projectData.sampleCount}</span></p>
                            </div>
                            <div className="project-descripption">
                                <p className="project-des">
                                    <span dangerouslySetInnerHTML={{ __html: this.state.projectData.description.replace(/(&lt;br&gt;|&lt;p&gt;)+/g, "<br/>") }}></span>
                                </p>
                            </div>
                        </div>
                        <OperationButton
                            campaignName={this.state.projectData.campaignName}
                            campaignId={this.state.projectData.campaignId}
                            charactor={this.state.status}
                            addressUrl={this.state.qnrUrl}
                            gradualTypeOutBound={this.state.itemDetails.gradualTypeOutBound}
                        />
                    </div>
                </div>
            )
        } else if (this.state.status == "1" || this.state.status === "2") {
            return (
                <div>
                    <div className="qd-inner">
                        {/**项目简介 */}
                        <div className="project-box qd-box clearfix mt-10">
                            <div className="project-box-left">
                                <div className="box-left-inner">
                                    <h3>
                                        <b>{this.state.projectData.campaignName}</b>
                                    </h3>
                                    <p className="project-time">
                                        {
                                            (() => {
                                                if (this.state.projectData.state === "04") {
                                                    return (
                                                        <span className="qd-tag tag-blue">执行中</span>
                                                    )
                                                } else if (this.state.projectData.state === "05") {
                                                    return (
                                                        <span className="qd-tag tag-blue" >已暂停</span>)
                                                }
                                            })()
                                        }
                                        {
                                            (() => {
                                                if (this.state.projectData.verificationMode === "0") {
                                                    return (
                                                        <span className="qd-tag " >无认证</span>
                                                    )
                                                } else if (this.state.projectData.verificationMode === "2") {
                                                    return (
                                                        <span className="qd-tag " >密码验证</span>)
                                                }
                                                else if (this.state.projectData.verificationMode === "3") {
                                                    return (
                                                        <span className="qd-tag " >随机码验证</span>)
                                                } else if (this.state.projectData.verificationMode === "4") {
                                                    return (
                                                        <span className="qd-tag " >按一号键确认</span>)
                                                }
                                            })()
                                        }
                                        {this.state.projectData.beginDate}至{this.state.projectData.endDate}
                                    </p>
                                </div>
                            </div>
                            <div className="project-box-right detail-box">
                                <p>{this.state.projectData.sampleDone}<span>/{this.state.projectData.sampleNotDone}+{this.state.projectData.sampleCount}</span></p>
                            </div>
                            <div className="project-descripption">
                                <p className="project-des">
                                    <span dangerouslySetInnerHTML={{ __html: this.state.projectData.description.replace(/(&lt;br&gt;|&lt;p&gt;)+/g, "<br/>") }}></span>
                                </p>
                            </div>
                        </div>
                        <OperationButton
                            campaignName={this.state.projectData.campaignName}
                            campaignId={this.state.projectData.campaignId ? this.state.itemDetails.campaignId : sessionStorageCampaignId}
                            charactor={this.state.status}
                            addressUrl={this.state.qnrUrl}
                            gradualTypeOutBound={this.state.itemDetails.gradualTypeOutBound}
                        />
                    </div>
                </div>
            )
        }
    }
}