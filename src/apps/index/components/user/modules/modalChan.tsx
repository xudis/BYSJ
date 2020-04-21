import React, { Component } from "react"
import { Modal } from "antd"
import ModalFeedBack from "./modalbackedit"
export interface IProps {
    handleClose: Function,
    modalHref: string,
    modalChanOpen: boolean,
    title: string
}
export interface IState {
    open: boolean,
    modalHref: string,
    title: string
}

export default class ModalChan extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            open: false,
            modalHref: props.modalHref,
            title: props.title
        }
    }
    public handleClick = () => {
        console.info("遮罩层被点击时触发回调")
    }
    public handleEscClick = () => {
        console.info("Esc被按下时触发回调")
    }
    public handleClose = () => {
        this.setState({
            open: false
        })
        console.info("请求关闭")
    }
    public render() {
        return (
            <Modal
                title={this.state.title}
                onCancel={() => {
                    this.props.handleClose("modalChan")
                }}
                style={{ width: 600, height: 450 }}
                onOk={this.props.handleClose("modalChan")}
            >
                <ModalFeedBack modalHref={this.state.modalHref} />
            </Modal>
        )
    }
}