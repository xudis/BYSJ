import React, { Component } from "react"
import { Modal } from "antd"
import Ajax from "../../../../../chushi/art-ajax"
import ModalDgDetail from "./modalDgDetail"
let newAnswerId = ""
let contentParam = {}
export interface IProps {
    modalQueOpen: boolean,
    handleClose: Function,
    modalHref: string,
    title: string,
    recordContent: any,
    dataReturnCodeChange: Function,
    closeModalQue: Function
}
export interface IState {
    modalHref: string,
    open: boolean,
    title: string,
    recordContent: {
        actvId: string,
        qnrId: string,
        oldAnswerId: string,
        aswshetId: string,
        calledNum: string,
        staffId: string,
        sampleId: string,
        callId: string,
        bizId: string,
        calledNumDisplay: string,
        calledNumExtStr: string,
        actvName: string
    },

}
let isListener = false

export default class ModalQue extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            modalHref: this.props.modalHref,
            open: false,
            title: this.props.title,
            recordContent: this.props.recordContent
        }
    }
    public handleClick = () => {
        console.info("遮罩层被点击时触发回调")
    }
    public handleEscClick = () => {
        console.info("Esc被按下时触发回调")
    }
    public handleSubmit = () => {
        this.setState({
            open: false
        })
        console.info("请求关闭")
    }
    public componentDidMount = () => {
        if (isListener === false) {
            if (window.addEventListener) {
                window.addEventListener("message", (e: any) => {
                    this.saveQnrSurvey(e, contentParam)
                })
            }
        }
        isListener = true
        contentParam = this.state.recordContent
    }
    public saveQnrSurvey = (e: any, contentParam: any) => {
        let dataMessage = JSON.parse(e.data)
        if (dataMessage.type == "answer") {
            newAnswerId = dataMessage.qnrRecId
            this.props.dataReturnCodeChange()
            let param = {
                serialNum: contentParam.callId,
                qnrId: contentParam.qnrId,
                oldAnswerId: contentParam.aswshetId,
                newAnswerId: newAnswerId,
                calledNum: contentParam.calledNum,
                staffId: contentParam.staffId,
                sampleId: contentParam.sampleId,
                bizId: contentParam.bizId,
                calledNumDisplay: contentParam.calledNumDisplay,
                calledNumExtStr: contentParam.calledNumExtStr,
                campaignName: contentParam.actvName
            }
            Ajax.post("/questionSurvey/insertQnrSurvey", param).then(({ data }) => {

            })
        }
    }
    public ModalQueOpen = () => {
        this.props.modalQueOpen == true
    }
    public render() {
        return (
            <Modal
                title='问卷修改详情'
                onCancel={() => {
                    this.props.handleClose("modalQue")
                }}
                style={{ width: 800, height: 650 }}
                onOk={this.props.handleClose("modalQue")}
            >
                <ModalDgDetail modalHref={this.state.modalHref} />
            </Modal>
        )
    }
}