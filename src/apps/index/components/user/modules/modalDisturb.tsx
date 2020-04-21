import React, { Component } from "react"
import { Modal } from "antd"

export interface IProps {
    modalDisturbOpen: boolean,
    handleClose: Function
}
export interface IState {
    open: boolean
}

export default class ModalDisturb extends Component<IProps, IState> {
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
                title='修改免打扰状态'
                onCancel={() => {
                    this.props.handleClose("modalDisturb")
                }}
                style={{ width: 800, height: 650 }}
                onOk={this.props.handleClose("modalDisturb")}
            >
                <div>
                    <ul className="qd-popup-list">
                        <li>服务补救
    <i className="iconfont icon-finish"></i>
                        </li>
                        <li>质量补救
    <i className=""></i>
                        </li>
                    </ul>
                </div>
            </Modal>
        )
    }
}