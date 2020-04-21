import React, { Component } from "react"
import { Modal } from "antd"

export interface IProps {
    modalReaOpen: boolean,
    handleClose: Function,
    rejectDesc: string
}
export interface IState {
    open: boolean
}

export default class ModalRea extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            open: false
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
    public render() {
        return (
            <Modal
                title='驳回原因'
                onCancel={() => {
                    this.props.handleClose("modalRea")
                }}
                style={{ width: 800, height: 650 }}
                onOk={this.handleSubmit}
            >
                {this.props.rejectDesc}
            </Modal>
        )
    }
}