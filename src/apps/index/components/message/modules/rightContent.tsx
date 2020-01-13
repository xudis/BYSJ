
import React, { Component, Fragment } from "react"
export interface IProps {
    details: any
}

export default class RightContent extends Component<IProps> {
    constructor(props: IProps) {
        super(props)

    }
    public render() {
        const itemContents = this.props.details
        //消息类型
        const messageType = this.props.details != undefined ? this.props.details.msgType : ''
        //审批类型：1业务结果 2 问卷 3免打扰
        let approvalType = this.props.details != undefined ? this.props.details.approvalType : ''
        //审批状态：0审批通过 1 审批驳回 2 审批中
        let approvalState = this.props.details != undefined ? this.props.details.approvalState : ''
        //项目状态变更类消息判断字段
        let taskChangeState = this.props.details != undefined ? this.props.details.taskChangeState : ''
        let approvalContent: any;
        let taskChangeContent: any;
        if ((JSON.stringify(itemContents) == "{}")) {
            approvalContent = <p>消息正在加载，请耐心等待哦</p>
        }
        return (
            <div>
                {
                    (() => {
                        if (messageType == "1") {
                            switch (approvalType) {
                                case "1":
                                    approvalType = "业务结果"
                                    break;
                                case "2":
                                    approvalType = "问卷"
                                    break;
                                case "3":
                                    approvalType = "免打扰"
                                    break;
                            }
                            switch (approvalState) {
                                case "0":
                                    approvalState = <p>您的{itemContents.crtTime}提交的{approvalType}修改申请已经审批通过，请及时查看。</p>
                                    break;
                                case "1":
                                    approvalState = <p>您的{itemContents.crtTime}提交的{approvalType}修改申请已经被驳回，请及时查看。</p>
                                    break;
                                case "2":
                                    approvalState = <p>您的{itemContents.crtTime}提交的{approvalType}修改申请已经审批通过，请及时查看。</p>
                                    break;
                            }
                            return <div className="content">
                                <h3>审批类消息</h3>
                                <span className="time2">
                                    {itemContents.crtTime}
                                </span>
                                {
                                    (() => {
                                        return approvalContent
                                    })()
                                }
                            </div>
                        } else if (messageType == "2") {
                            return <div className="content">
                                <h3>项目状态变更类消息</h3>
                                <span className="time2">{itemContents.crtTime}</span>
                                {
                                    (() => {
                                        switch (taskChangeState) {
                                            case "04":
                                                taskChangeContent = <p>项目编号为{itemContents.taskId}的{itemContents.taskName}已经开始执行，请在外呼时段中进行外呼。</p>
                                                break;
                                            case "05":
                                                taskChangeContent = <p>项目编号为{itemContents.taskId}的{itemContents.taskName}已经暂停。</p>
                                                break;
                                        }
                                        return taskChangeContent;
                                    })()
                                }
                            </div>
                        }
                        else if (messageType == "3") {
                            return <div className="content">
                                <h3>项目预警类消息</h3>
                                <span className="time2">
                                    {itemContents.crtTime}
                                </span>
                                <p>项目编号为{itemContents.taskId}的{itemContents.taskName}已经达到您所设定的预警阈值，请及时查看干预。</p>

                            </div>
                        }
                        else if (messageType == "4") {
                            return <div className="content">
                                <h3>培训提醒类消息</h3>
                                <span className="time2">
                                    {itemContents.crtTime}
                                </span>
                                <p>您关注的“业务话术培训”将于18：00开始，不要错过啦~</p>
                                <div>
                                    <img src="/src/asstes/img/5.jpg" alt="宣传配图" className="peitu" />
                                </div>
                                <p className="gray">#距离直播开始仅剩20分钟# 快来直播间集合哦</p>
                                <p>
                                    【课程主题】：让你的作品集替你沟通
                                        【课程大纲】：
                                        NO.1 作品即视界
                                        NO.2 排列节奏
                                        NO.3 用细节说话
                                        NO.4 要有自己的设计主张
                                        NO.5 个人简历
                                        NO.6 复盘验视
                            </p>
                                <p className="gray">进入直播间请戳：<a href="javascript:;">https://url.163.com/ABC</a></p>
                            </div>
                        } else if (messageType == "5") {
                            return <div className="content">
                                <h3>预约提醒类消息</h3>
                                <span className="time2">
                                    {itemContents.crtTime}
                                </span>
                                <p>您在项目编号为{itemContents.taskId}的{itemContents.taskName}预约的客户，已经到达预约时间，预约时间为{itemContents.appointTime},请展开外呼。</p>
                            </div>
                        } else if (messageType == "6") {
                            return <div className="content">
                                <h3>回拨提醒类消息</h3>
                                <span className="time2">
                                    {itemContents.crtTime}
                                </span>
                                <p>您在项目编号为{itemContents.taskId}、项目名称为{itemContents.taskName}有一条记录需要回拨，请及时查看回拨原因，并回拨客户。</p>
                            </div>
                        }
                    })()
                }
            </div>
        )
    }
}