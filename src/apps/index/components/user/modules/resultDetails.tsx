import React, { Component } from "react"
import Ajax from "../../../../../chushi/art-ajax"
import { Modal, Button, message } from "antd"
import ModalChan from "./modalChan"
import ModalQue from "./modalQue"
import ModalRea from "./modalRea"
import ModalSerive from "./modalSerive"
let sessionCampaignId: any = ""

export interface IProps {
    location: any,
    match: any,
    charactor: any
}
interface IStoreManageInits {
    customPhone: number,
    serialNum: number,
    campaignId: number,
    sampleId: number,
    acceptPhone: number,
    bizId: number,
    acceptPhoneDisplay: string,
    acceptPhoneExtStr: string,
    hallId: string
}
interface IBean {
    bean: object,
    qnrAddress: string,
    state: string,
    encryptAddr: string
}
interface IBeans {
    bean: object
}

// export interface location {
//     state: {
//         record: {
//             campaignId: string,
//             called: string,
//             sampleId: string,
//             serialNum: any,
//             callId: string,
//             actvId: string,
//             newAnswerId: string,
//             calledNm: string,
//             bizId: string,
//             acceptPhone: string
//         },
//         detailTitle: string
//     }
// }

// export interface SearchParamsInit {
//     campaignId: string,
//     serialNum: any,
//     sampleId: string,
// }
export interface IState {
    dataReturnCode: string,
    editContent: string,
    disturbingId: string
    heigh: string,
    display: string,
    rejectDesc: string,
    showValue: string,
    storeManageInits: IStoreManageInits,
    callResults: any,
    que: string,
    data: any,
    moreInfo: string,
    dataname: Array<{}>
    dataThree: any,
    moreInfoArr: any[],
    inforManyArr: any[],
    resultType: any[],
    userPortrait: any,
    questionDetailsParam: any,
    entryAddr: string,
    disState: string,
    temporary: string,
    ArrChanOpen: boolean,
    modalChanOpen: boolean,
    modalQueOpen: boolean,
    modalReaOpen: boolean,
    modalDisturbOpen: boolean
    yeresultOpen: boolean,
    serResultOpen: boolean,
    yeDisOpen: boolean,
    userPortraitOpen: boolean,
    codeResultType: string,
    result: string,
    addressUrl: string,
    queAddressUrl: string,
    imgUser: string,
    acceptphone: string,
    noDisturbing: any,
    oldnoDisturbing: any,
    searchParams: {
        campaignId: string,
        serialNum: string,
        sampleId: string,
        bizId: string,
        actvId: string,
        hallId: string
    }
    busResultModify: any,
    pipelineNmber: string,
    listContent: {
        campaignName: string,
        acceptPhone: string,
        acceptPhoneDisplay: string,
        acceptPhoneExtStr: string

    }
}

export default class ResultDetails extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)

        let busResultModify;
        if (this.props.location.state != undefined) {
            busResultModify = {
                match: this.props.match,
                record: this.props.location.state.record
            }
            sessionStorage.setItem('busResultModify', JSON.stringify(busResultModify));
        } else {
            busResultModify = JSON.parse(sessionStorage.getItem('busResultModify'))
        }
        this.state = {
            editContent: ' 修改',
            dataReturnCode: "",
            listContent: this.props.location.state != undefined ? this.props.location.state.record : '',
            disturbingId: '',
            oldnoDisturbing: "1",
            noDisturbing: "1",
            busResultModify: busResultModify,
            moreInfo: "",
            imgUser: "用户画像",
            heigh: "three",
            display: "block",
            rejectDesc: "",
            showValue: "",
            que: "",
            data: "",
            dataname: [],
            callResults: [],
            moreInfoArr: [],
            inforManyArr: [],
            entryAddr: "",
            resultType: [],
            userPortrait: "",
            questionDetailsParam: "",
            dataThree: [],
            disState: "",
            temporary: "",
            codeResultType: "",
            ArrChanOpen: false,
            modalChanOpen: false,
            modalQueOpen: false,
            modalReaOpen: false,
            modalDisturbOpen: false,
            yeresultOpen: false,
            serResultOpen: false,
            yeDisOpen: false,
            userPortraitOpen: false,
            result: "",
            addressUrl: "",
            acceptphone: "",
            queAddressUrl: "",
            storeManageInits: busResultModify != undefined ? busResultModify.record : "",
            pipelineNmber: busResultModify != undefined ? busResultModify.record.serialNum : "",
            searchParams: {//传参
                campaignId: busResultModify.record.campaignId ? busResultModify.record.campaignId : (this.props.location.state.record != undefined ? this.props.location.state.record.campaignId : sessionCampaignId),
                serialNum: busResultModify.record.serialNum ? busResultModify.record.serialNum : "",
                sampleId: busResultModify.record.sampleId ? busResultModify.record.sampleId : "",
                bizId: busResultModify.record.bizId,
                actvId: busResultModify.record.actvId,
                hallId: busResultModify.record.hal1Id != undefined ? busResultModify.record.hallId : ""
            }
        }
    }
    public moreDetails = (itemParams: any) => {
        let modalQueEdit: any = {}
        modalQueEdit.qnrId = itemParams.oldQnrId;
        modalQueEdit.oldAnswerId = itemParams.oldAnsId;
        modalQueEdit.newAnswerId = itemParams.newAnsId;
        Ajax.post<IBean, IBeans>("/questionSurvey/getQnrDetailsAddress", modalQueEdit).then(({ data }: { data: any }) => {
            if (data.returnCode == "0") {
                this.setState({
                    modalQueOpen: true,
                    queAddressUrl: data.bean.qnrAddress
                })
            } else {
                this.setState({
                    modalQueOpen: false,
                })
            }
        }).catch(() => {
            this.setState({
                modalQueOpen: false,
            })
        })
    }
    public handleMany = () => {
        this.setState({
            heigh: "all"
        })
    }
    public handleShort = () => {
        this.setState({
            heigh: "three"
        })
    }
    public handleService = () => {
        this.setState({
            serResultOpen: true
        })
    }
    public initQuestionnaire = () => {
        let modalQueEdit: any = {};
        modalQueEdit.qnrId
        this.state.callResults.qnrId;
        modalQueEdit.aswshetId = this.state.callResults.aswshetId;
        Ajax.post<IBean, IBeans>(" /questionSurvey/ getQnrAddress", modalQueEdit).then(({ data }: { data: any }) => {
            if (data.returnCode == "0") {
                this.setState({
                    queAddressUrl: data.bean.qnrAddress,
                    dataReturnCode: data.returnCode
                });
            } else if (data.returnCode == "-9999") {
                this.setState({
                    dataReturnCode: data.returnCode
                }, () => {
                    this.setState({
                        modalQueOpen: false,
                        dataReturnCode: data.returnCode
                    })
                })
            } else {
                this.setState({
                    dataReturnCode: data.returnCode
                }, () => {
                    this.setState({
                        modalQueOpen: false,
                        dataReturnCode: data.returnCode
                    })

                })
            }
        }).catch((data: any) => {
            if (data.returnCode == "-9999") {
                this.setState({
                    dataReturnCode: data.returnCode
                }, () => {
                    this.setState({
                        modalQueOpen: false,
                        dataReturnCode: data.returnCode
                    })
                })
            } else {
                this.setState({
                    dataReturnCode: data.returnCode
                }, () => {
                    this.setState({
                        modalQueOpen: false,
                        dataReturnCode: data.returnCode
                    })
                })
            }
            this.setState({
                modalQueOpen: false
            })
        })
    }

    public questionnaire() {
        let modalQueEdit: any = {};
        modalQueEdit.qnrId = this.state.callResults.qnrId;
        modalQueEdit.aswshetId = this.state.callResults.aswshetId;
        Ajax.post<IBean, IBeans>(" /questionSurvey/ getQnrAddress", modalQueEdit).then(({ data }: { data: any }) => {
            //重新修改
            if (data.returnCode == "0") {
                this.setState({
                    queAddressUrl: data.bean.qnrAddress
                }, () => {
                    this.setState({
                        modalQueOpen: true
                    });
                })
            } else if (data.returnCode == "9999") {
                this.setState({
                    dataReturnCode: data.returnCode
                }, () => {
                    this.setState({
                        modalQueOpen: false,
                        dataReturnCode: data.returnCode
                    })
                })
            } else {
                this.setState({
                    dataReturnCode: data.returnCode
                }, () => {
                    this.setState({
                        modalQueOpen: false,
                        dataReturnCode: data.returnCode
                    })
                })
            }
        }).catch(() => {
            this.setState({
                modalQueOpen: false
            })
        })
    }
    public handleOpen = (e: any, reason: string) => {
        e.preventDefault();
        this.setState({
            rejectDesc: reason
        })
        const oprationType = e.currentTarget.getAttribute("opration-type");
        if (/^modalChan$/.test(oprationType)) {
            let paramsEdit: any = {};
            paramsEdit.qnrId = this.state.callResults.qnrId;
            paramsEdit.aswshetId = this.state.callResults.aswshetId;
            Ajax.post<IBean, IBeans>("/questionSurvey/getLookQnrAddr", paramsEdit).then(({ data }: { data: any }) => {
                if (data.returnCode == "0") {
                    this.setState({
                        yeDisOpen: false,
                        addressUrl: data.bean.qnrAddress,
                        modalChanOpen: true
                    });
                } else
                    this.setState({
                        yeDisOpen: false
                    });
            }).catch((erc: Ajax.errInfo) => {
            });
        }
        else if (/^modalQue$/.test(oprationType)) { }
        else if (/^modalRea$/.test(oprationType)) {
            this.setState({ modalReaOpen: true })
        }
    }
    public handleClose = (type: any) => {
        if (/^modalChan$/.test(type)) {
            this.setState({ modalChanOpen: false })
        } else if (/^modalQue$/.test(type)) { this.setState({ modalQueOpen: false }) }
        else if (/^modalRea$/.test(type)) {
            this.setState({ modalReaOpen: false })
        } else if (/^modalService$/.test(type)) {
            this.setState({ serResultOpen: false })
        }
    }
    public resultFalse = () => {
        this.setState({
            noDisturbing: '1'
        })
    }
    public resultTrue = () => {
        this.setState({
            noDisturbing: '0'
        })
    }

    //控制业务查询页面弹窗
    public handleResult = (e: any) => {
        e.preventDefault();
        this.setState({
            yeresultOpen: true,
            showValue: this.state.callResults.resultType
        })
    }
    public handleyeresultClose = () => {
        this.setState({
            yeresultOpen: false,
            showValue: "",
            callResults: {
                ...this.state.callResults,
                resultType: this.state.userPortrait.resultType
            }
        })
    }
    //修改免打扰状态弹窗
    public handleDis = (e: any) => {
        e.preventDefault();
        this.setState({ yeDisOpen: true })
    }
    public handleCloseDIse = () => {
        this.setState({
            noDisturbing: this.state.oldnoDisturbing,
            yeDisOpen: false
        })
    }
    public handleyeDisSubmit = () => {
        if (this.state.oldnoDisturbing == "") {
            message.warning('网络开小差啦,请稍候再试', 1);
            return false;
        }
        let params: any = {};
        params.acceptPhone = this.state.storeManageInits.acceptPhone;
        params.serialNum = this.state.storeManageInits.serialNum;
        params.applicationType = this.state.noDisturbing;
        params.state = this.state.oldnoDisturbing;
        params.sampleId = this.state.storeManageInits.sampleId;
        params.actvId = this.state.storeManageInits.campaignId;
        params.bizId = this.state.storeManageInits.bizId;
        params.id = this.state.disturbingId;
        params.campaignName = this.state.listContent.campaignName;
        params.acceptPhoneDisplay = this.state.listContent.acceptPhoneDisplay;
        params.acceptPhoneExtStr = this.state.listContent.acceptPhoneExtStr;
        Ajax.post(" /noDisturbing/ applyNoDisturbing ", params).then(({ data }: { data: any }) => {
            if (data.returnCode == "0") {
                this.setState({
                    yeDisOpen: false
                });
                message.success(data.returnMessage, 1);
            } else {
                this.setState({
                    yeDisOpen: false
                });
                message.error(data.returnMessage, 1);
            }
        }).catch((err: Ajax.errInfo) => {
            this.setState({
                yeDisOpen: false
            });
        });
    }

    public handleyeresultSubmit() {
        let paramsMarke: any = {};
        paramsMarke.serialNum = this.state.storeManageInits.serialNum;
        paramsMarke.campaignId = this.state.storeManageInits.campaignId;
        paramsMarke.oldCal1Result = this.state.userPortrait.resultType;
        paramsMarke.newCallResult = this.state.codeResultType;
        paramsMarke.qnrId = this.state.callResults.qnrId;
        paramsMarke.bizId = this.state.storeManageInits.bizId;
        paramsMarke.calledNum = this.state.storeManageInits.acceptPhone;
        paramsMarke.sampleId = this.state.storeManageInits.sampleId;
        paramsMarke.campaignName = this.state.listContent.campaignName;
        paramsMarke.calledNumDisplay = this.state.listContent.acceptPhoneDisplay;
        paramsMarke.calledNumExtStr = this.state.listContent.acceptPhoneExtStr;
        paramsMarke.isApprol = 'e';
        Ajax.post(" /businessResult/saveBus inessResult", paramsMarke).then(({ data }: { data: any }) => {
            if (data.returnCode == "0") {
                this.setState({
                    yeresultOpen: false,
                })
                message.success(data.returnMessage, 1);
            }
            else {
                this.setState({ yeresultOpen: false })
                message.error(data.returnMessage, 1);
            }
        }).catch((err: Ajax.errInfo) => {
            this.setState({ yeresultOpen: false })
        });
    }
    public addMoreInfo = () => {
        this.setState({
            moreInfoArr: this.state.inforManyArr
        })
    }
    //取消
    public addMoreInfoNo = () => {
        this.setState({
            moreInfoArr: this.state.inforManyArr.slice(0)
        })
    }
    public search = () => {
        Ajax.post<IBean, IBeans>("/businessResultDetails/ getBusinessDetails", this.state.searchParams, {}).then(({ data }) => {
            this.setState({
                data: data.bean,
                callResults: data.bean,
                userPortrait: data.bean,
                inforManyArr: data.beans,
                questionDetailsParam: data.bean,
                entryAddr: data.bean.encryptAddr,
                moreInfoArr: data.beans.slice(0, 3)
            }, () => {
                this.initQuestionnaire();
            })
        })
        Ajax.post("/business/getBusiResLogList", {
            callId: this.state.pipelineNmber
        }).then(({ data }: { data: any }) => {
            this.setState({
                dataThree: data.beans,
            })
        })
        Ajax.post("/marketResult/ getmarketResult", { stateParameter: "BUSINESS RESULT" }).then(({ data }) => {
            let resultTypeArr: any[] = data.beans;
            for (var i = 0; i < resultTypeArr.length; i++) {
                if (resultTypeArr[i].value === '0402') {
                    resultTypeArr.splice(i, 1);
                }
            }
            this.setState({
                resultType: resultTypeArr
            });
        }).catch((err: Ajax.errInfo) => {
        });
        Ajax.post<IBean, IBeans>("/noDisturbing/ getNoDisturbing", {
            acceptPhone: this.state.storeManageInits.acceptPhone,
            acceptPhoneDisplay: this.state.storeManageInits.acceptPhoneDisplay,
            acceptPhoneExtStr: this.state.storeManageInits.acceptPhoneExtStr
        }).then(({ data }: { data: any }) => {
            if (data.returnCode == '0') {
                this.setState({
                    noDisturbing: data.bean.state != undefined ? data.bean.state : "1",
                    oldnoDisturbing: data.bean.state != undefined ? data.bean.state : "1",
                    disturbingId: data.bean.id
                })
            } else {
                this.setState({
                    noDisturbing: "1"
                })
            }
        }).catch((err: Ajax.errInfo) => {
            this.setState({
                noDisturbing: "1",
                oldnoDisturbing: "1"
            })
        });
    }
    public componentDidMount = () => {

        this.search();
        sessionCampaignId = sessionStorage.getItem('campaignId');
        if (!sessionCampaignId) {
            sessionStorage.setItem('campaignId', this.props.location.state.record.campaignId);
        } else {
            sessionStorage.setItem('campaignId', sessionCampaignId);
        }
    }
    public dataReturnCodeChange = () => {
        this.setState({
            dataReturnCode: "-1111"
        })
    }
    public closeModelQue = () => {
        this.setState({
            modalQueOpen: false
        })
    }
    render() {
        let noEditRecord;
        let defaultImage = '';
        if (this.state.dataThree.length == 0) {
            noEditRecord = <div style={{
                marginTop: '4px'
            }}>暂无修改记录</div>
            const { busResultModify } = this.state;
            const sty = { display: this.state.display }
            let que = busResultModify.match.url.includes(' admin');//判断不同身份展示的业务详情页面权限不同
            let { callingCountName, calledNum, staffName, callId, staffPhone,
                callingProvName, callingCityName, gridNm, hallName, imgUrl, actvName } = this.state.data;//第一个接口块
            let { beginDate, talkTime, submitTime, origSerialNum,
                identifyType, resultType, vldRsltFlag } = this.state.callResults;//第二个接口块
            let state = this.state.noDisturbing;
            let result: any = '';
            if (state == undefined || state == ' ') {
                return false;
            }
            let identifyTypeSpan;
            switch (identifyType) {
                case '0': identifyTypeSpan = <span>无认证</span>; break;
                case '2': identifyTypeSpan = <span> 密码验证</ span>; break;
                case '3': identifyTypeSpan = <span>随机码验证</ span>; break;
                case '4': identifyTypeSpan = <span>按一 号 键确认</span>; break;
            }
            let resultTypeSpan;
            let vldRsltFlagContent;
            switch (resultType) {
                case '0399': resultTypeSpan = "营销失败"; break;
                case '0700': resultTypeSpan = "营销成功"; break;
                case '0104': resultTypeSpan = "关机"; break;
                case '0102': resultTypeSpan = "忙音"; break;
                case '0105': resultTypeSpan = "无人接听"; break;
                case '0106': resultTypeSpan = "停机"; break;
                case '0402': resultTypeSpan = "指定业务代表预约"; break;
                case '0802':
                    resultTypeSpan = "无效";
                    break;
                case '0114':
                    resultTypeSpan = "用户拒接";
                    break;
                case '0005':
                    resultTypeSpan = "未提交";
                    break;
                case '0006':
                    resultTypeSpan = "未提交";
                    break;
                case '0000':
                    resultTypeSpan = "营销失败";
                    break;
            }
            switch (vldRsltFlag) {
                case '1': vldRsltFlagContent = <span>认证通过</span>;
                    break;
                case '2': vldRsltFlagContent = <span>认证不通过</span>; break;
                case "":
                    vldRsltFlagContent = <span>无</span>; break;
            }
            if (busResultModify.match.url.includes('modifyLog')) {
                result = (<a href="#/user/modifyLog" className="iconfont icon-left"></a>)
            } else if (busResultModify.match.url.includes('modifyQue ')) {
                result = (<a href="#/user/modifyQue" className=" iconfont icon-left"></a>)
            } else if (busResultModify.match.url.includes('modifyDis')) {
                result = (<a href="#/user/modifyDis" className=" iconfont icon-left"></a>)
            }
            else if (busResultModify.match.url.includes('serRecovery')) {
                result = (<a href="#/user/serRecovery" className=" iconfont icon- left" ></a>)
            }
            else if (busResultModify.match.url.includes('resultChan')) {
                result = (< a href="#/user/resultChan" className="iconfont icon-left" ></a >)
            }
            else if (busResultModify.match.url.includes('RecoveryS ')) {
                result = (<a href="#/user/serRecoveryS" className="iconfont icon-left"></a>)
            }
            return (
                <div>
                    <div>
                        <div className="qd-inner">
                            <div className="common-title">
                                <h3 className="data-center-h3">
                                    {result}
                                    <span style={{ cursor: "pointer" }}>业务结果详情</span>
                                </h3>
                            </div>
                            {/*业务结果详情begain */}
                            <div className="detail-result qd-box" >
                                {busResultModify.match.url.includes('RecoveryS') ?
                                    <Button color='info' className="reserveSave" size="large"
                                        onClick={this.handleService} opration-type="modalSerive" >服务补救</Button> : ""
                                }
                                <p className="order-title">
                                    {callId}&nbsp;&nbsp; &nbsp;
                                    <Button color='success' disabled={this.state.entryAddr == "00" ? true : false}
                                        onClick={() => { this.setState({ userPortraitOpen: true }) }}> 用户画像</Button>
                                </p>
                                <h3 className="resutle-num">
                                    <b>{calledNum}</b>
                                    <span> {resultTypeSpan}</span>
                                </h3>
                                <b>{actvName}</b>
                                {
                                    this.state.moreInfoArr.map((item, index) => {
                                        return (
                                            <li style={{ marginTop: "3px" }} key={index}>
                                                <label >{item.colmDesc}</label>
                                                <span >{item.colmValue}</span>
                                            </li>
                                        )
                                    })
                                }
                                <span onClick={() => { this.setState({ ArrChanOpen: !this.state.ArrChanOpen }) }}>
                                    {
                                        3 < this.state.inforManyArr.length
                                            ? (this.state.ArrChanOpen
                                                ? (<li className="width-all" style={{ cursor: " pointer" }}
                                                    onClick={this.addMoreInfoNo} >收起<i className="iconfont detail-icon-up" ></i></li>)
                                                : (<li className="width-all" style={{ cursor: "pointer" }}
                                                    onClick={this.addMoreInfo} >更多信息<i className="iconfont detail-icon-down"></i></li>))
                                            : ""
                                    }
                                </span>
                            </div>
                            <div className=" detail-result mt-20 qd-box">
                                <h3 className="resutle-num" ><b>外呼店员</b></h3>
                                <dl className="clearfix personalcenter" >
                                    <dt><img src={imgUrl ? imgUrl : defaultImage} /></dt>
                                    <dd>
                                        <p><b>{staffName}</b><span>{staffPhone}</span></p>
                                        <p>{callingProvName}{callingCityName}{callingCountName}{gridNm}{hallName}</p>
                                    </dd>
                                </dl>
                            </div>
                            <div className="detail-result mt-20 qd-box" >
                                <h3 className="resutle - num" ><b>通话信息</b></h3>
                                <ul className="resule-con clearfix">
                                    <li>
                                        <label>接通时间: </label>
                                        <span>{beginDate}</span>
                                    </li>
                                    <li>
                                        <label>通话时长: </label>
                                        <span>{talkTime != "" ? talkTime : 0}</span>
                                    </li>
                                    <li>
                                        <label >结果提交时间: </label>
                                        <span>{submitTime}</span>
                                    </li>
                                    <li>
                                        <label >验证类型: </label>
                                        {identifyTypeSpan}
                                    </li>
                                    <li>
                                        <label>IVR结果: </label>
                                        {vldRsltFlagContent}
                                    </li>
                                </ul>
                            </div>
                            <div className=" detail-result mt -20 qd- box" >
                                <h3 className=" resutle -num" ><b>通话结果</b></h3>
                                <ul className=" resule-con clearfix">
                                    <li><label>问卷详情: </label>
                                        {
                                            (() => {
                                                if (this.props.charactor == 3) {
                                                    que = true;
                                                } return (
                                                    que ? (<span><a className="look"
                                                        onClick={(e) => { this.handleOpen(e, '') }}
                                                        opration-type="modalChan" > 查看</a></span>)
                                                        : (this.state.dataReturnCode == "0"
                                                            ? (<span><a className="look" onClick={this.questionnaire} >修改</a></span>)
                                                            : (this.state.dataReturnCode == "-9999" ?
                                                                (<span><a href="javascript:;" >无问卷</a></span>)
                                                                : (<span><a href="javascript:;">问卷审批中</a></span>))
                                                        )
                                                )
                                            })()
                                        }
                                    </li >
                                    <li>
                                        <label>业务结果: </label>
                                        {
                                            !que ? (<span>
                                                {this.state.showValue ? this.state.showValue : resultTypeSpan}
                                                <a onClick={this.handleResult} >修改</a>
                                                <Modal
                                                    style={{ width: 450, height: 330 }}
                                                    title={"修改业务结果"}
                                                    visible={this.state.yeresultOpen}
                                                    onCancel={this.handleyeresultClose}
                                                    onOk={this.handleyeresultSubmit}>
                                                    <div>
                                                        <ul className="qd-popup- list">
                                                            {
                                                                this.state.resultType.map(item => {
                                                                    return (
                                                                        item.title !== "请选择" ?
                                                                            <li onClick={() => {
                                                                                this.setState({
                                                                                    showValue: item.title,
                                                                                    codeResultType: item.value
                                                                                })
                                                                            }}>
                                                                                {item.title}
                                                                                {this.state.showValue == item.value
                                                                                    ? <i className="iconfont icon- finish">
                                                                                    </i> : (this.state.showValue == item.title ?
                                                                                        <i className="iconfont icon- finish"></i> : "")
                                                                                }
                                                                            </li> : ""
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                </Modal>
                                            </span>) : (<span>{resultTypeSpan}</span>)
                                        }
                                    </li>
                                    <li>
                                        <label >免打扰状态：</label>
                                        {
                                            !que ? (
                                                <span>{state == "1" ? "否" : "是"}
                                                    <a onClick={this.handleDis}>修改</a>
                                                </span>
                                            ) : (<span>{state == "0" ? "是" : "否"}
                                            </span>)
                                        }
                                    </li>
                                </ul>
                            </div>
                            <div className="detail-result mt-20 qd-box" >
                                <h3 className="resutle-num" ><b>修改记录</b></h3>
                                <div>
                                    <table className="detail- table mt-20"
                                        style={{
                                            border: "0",
                                            width: "100%"
                                        }} >
                                        <tbody>{
                                            this.state.dataThree.map(
                                                (items: any, index: any) => {
                                                    const resultLas = () => {
                                                        if (items.modfType == 3) {
                                                            return (<tr key={index}>
                                                                <td>
                                                                    <div className="redit-div">
                                                                        <p>{items.mktgRsltModfTime}</p>
                                                                        <p>
                                                                            <span>免打扰</span>
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="state-div" >
                                                                        {
                                                                            items.mktgRsltStatus !== "0" ? items.mktgRsltStatus == "1" ?
                                                                                <p><span className="iconfont icon-exclamation-circle" ></span>已驳回
<a onClick={(e) => { this.handleOpen(e, items.rejectDesc) }} opration-type="modalRea" >原因</a></p> : (
                                                                                    () => {
                                                                                        return (<div>
                                                                                            <p><span className="iconfont icon-clock-circle"></span>审批中</p>
                                                                                            <p style={{ marginTop: "-37px" }}>{items.crtTime}</p>
                                                                                        </div>)
                                                                                    }
                                                                                )() :
                                                                                <p><span className="iconfont icon-heck-circle" ></span>已通过</p>
                                                                        }
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="redit-div" >
                                                                        <p><span>修改前状态</span></p>
                                                                        <p>{items.oldDnd}</p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="redit-div" >
                                                                        <p><span>修改后状态</span></p>
                                                                        <p>{items.newDnd}</p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="redit-div">
                                                                        <p><span>提交人</span></p>
                                                                        <p>{items.applStaffName}</p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className=" redit - div">
                                                                        <p><span>审批人</span></p>
                                                                        <p>{items.subStaffName}</p>
                                                                    </div>
                                                                </td>
                                                            </tr>)
                                                        } else if (items.modfType == 2) {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <div className=" redit-div">
                                                                            <p>{items.mktgRsltModfTime}</p>
                                                                            <p><span>问卷</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="state-div">
                                                                            {
                                                                                items.mktgRsltStatus !== "0" ? items.mktgRsltStatus == "1" ?
                                                                                    <p>
                                                                                        <span className="iconfont icon-exc1amation-circle"></span>已驳回<a onClick={(e) => { this.handleOpen(e, items.rejectDesc) }} opration-type="modalRea" >原因</a></p> :
                                                                                    (() => {
                                                                                        return (
                                                                                            <div>
                                                                                                <p>
                                                                                                    <span className=" iconfont icon-clock-circle" ></span>审批中
                                                                                                </p>
                                                                                                <p style={{ marginTop: "-37px" }}>
                                                                                                    {items.crtTime}
                                                                                                </p>
                                                                                            </div>)
                                                                                    })() :
                                                                                    <p>
                                                                                        <span className="iconfont icon-heck-circle">
                                                                                        </span>已通过
                                                                                    </p>
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="redit-div">
                                                                            <p>
                                                                                <span>问卷修改详情</span>
                                                                            </p>
                                                                            <p>
                                                                                <a onClick={() => { this.moreDetails(items) }}>查看</a>
                                                                            </p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="redit-div">
                                                                            <p><span>提交人</span></p>
                                                                            <p> {items.applStaffName}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className=" redit- div" >
                                                                            <p><span>审批人</span></p>
                                                                            <p>{items.subStaffName}</p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        } else if (items.modfType == 1) {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <div className="redit-div">
                                                                            <p>{items.mktgRsltModfTime}</p>
                                                                            <p><span>业务结果</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="state-div">{
                                                                            items.mktgRsltStatus !== "0" ? items.mktgRsltStatus == "1" ?
                                                                                <p><span className="iconfont icon-exclamation-circle" ></span>已驳回<a onClick={(e) => { this.handleOpen(e, items.rejectDesc) }} opration- type="modalRea">原因</a></p> :
                                                                                (() => {
                                                                                    return (<div>
                                                                                        <p>
                                                                                            <span className="iconfont icon-clock-circle" >
                                                                                            </span>
                                                                                                审批中
                                                                                        </p>
                                                                                        <p style={{ marginTop: "-37px" }}>{items.crtTime}</p>
                                                                                    </div>)
                                                                                })() :
                                                                                <p><span className=" iconfont icon-heck-circle" ></span>已通过</p>
                                                                        }
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="redit-div">
                                                                            <p><span>修改前状态</ span></p>
                                                                            <p>{items.oldMktgRslt}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="redit-div">
                                                                            <p><span>修改后状态</span></p>
                                                                            <p>{items.newMktgRslt}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="redit-div">
                                                                            <p><span>提交人</span></p>
                                                                            <p>{items.applStaffName}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="redit-div">
                                                                            <p><span>审批人</span></p>
                                                                            <p>{items.subStaffName}</p>
                                                                        </div>
                                                                    </td>
                                                                </tr>

                                                            )
                                                        }
                                                    }
                                                    if (index < 3) {
                                                        return (resultLas())
                                                    } else {
                                                        return this.state.heigh == "all" ? resultLas() : ""
                                                    }
                                                })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                {noEditRecord}
                                <div className="more-look">
                                    {
                                        this.state.dataThree.length > 3 ?
                                            (this.state.heigh == "three" ?
                                                <p style={sty}><a onClick={this.handleMany}>更多修改记录<em className="iconfont detail-icon-down"></em></a></p> :
                                                <p style={sty}><a onClick={this.handleShort}>收起<em className="iconfont detail-icon-up"></em></a></p>
                                            ) : ""
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.modalChanOpen ?
                            <ModalChan
                                modalChanOpen={this.state.modalChanOpen}
                                handleClose={this.handleClose}
                                modalHref={this.state.addressUrl}
                                title={"问卷详情"}
                            /> : ""
                    }
                    {
                        this.state.modalQueOpen ?
                            <ModalQue
                                modalQueOpen={this.state.modalQueOpen}
                                handleClose={this.handleClose}
                                modalHref={this.state.queAddressUrl}
                                title={"问卷修改详情"}
                                recordContent={this.state.questionDetailsParam}
                                dataReturnCodeChange={this.dataReturnCodeChange}
                                closeModalQue={this.closeModelQue}
                            /> : ""
                    }
                    {
                        this.state.userPortraitOpen ?
                            <ModalChan
                                modalChanOpen={this.state.modalChanOpen}
                                handleClose={() => { this.setState({ userPortraitOpen: false }) }}
                                modalHref={this.state.addressUrl}
                                title={"用户画像"}
                            /> : ""
                    }
                    {
                        this.state.serResultOpen ?
                            <ModalSerive
                                yeresultOpen={this.state.serResultOpen}
                                handleClose={this.handleClose}
                                compaigngIdparam={this.state.searchParams.campaignId}
                                simpleIdParam={this.state.searchParams.sampleId}
                            /> : ""
                    }
                    {
                        this.state.modalReaOpen ?
                            <ModalRea
                                modalReaOpen={this.state.modalReaOpen}
                                handleClose={this.handleClose}
                                rejectDesc={this.state.rejectDesc}
                            /> : ""
                    }
                    {
                        <Modal
                            title="修改免打扰状态"
                            visible={this.state.yeDisOpen}
                            onCancel={this.handleCloseDIse}
                            onOk={this.handleyeDisSubmit}
                            style={{ width: 450, height: 300 }}
                        >
                            <div>
                                <ul className="qd-popup-list">
                                    <li onClick={this.resultTrue}>是
                                                {
                                            state == "0" ? <i className="iconfont icon-finish"></i> : ""
                                        }
                                    </li>
                                    <li onClick={this.resultFalse}>否
                                                {
                                            state == "1" ? <i className="iconfont icon-finish"></i> : ""
                                        }
                                    </li>
                                </ul>
                            </div>
                        </Modal>
                    }
                </div>
            )
        }
    }
}