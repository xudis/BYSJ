import React, { Component } from "react"
import { Modal } from "antd"

export interface IProps {
    modalQueOpen: boolean,
    handleClose: Function
}
export interface IState {
    open: boolean
}

export default class name extends Component<IProps, IState> {
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
                title='问卷修改详情'
                onCancel={() => {
                    this.props.handleClose("modalChan")
                }}
                style={{ width: 800, height: 650 }}
                onOk={this.props.handleClose("modalChan")}
            >
                <h1>我是弹窗内容</h1>
            </Modal>
        )
    }
}