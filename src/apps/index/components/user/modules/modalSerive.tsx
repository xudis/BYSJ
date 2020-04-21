import React, { Component } from "react"
import { Modal } from "antd"

export interface IProps {
    handleClose: Function,
    yeresultOpen: boolean
}
export interface IState {
    open: boolean,
    retur: string,
    yeresultOpen: boolean
}

export default class ModalSerive extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            open: false,
            retur: "0",
            yeresultOpen: false
        }
    }
    public resultOne = () => {
        this.setState({
            retur: "1"
        })
    }
    public resultTwo = () => {
        this.setState({
            retur: "2"
        })
    }
    public resultThree = () => {
        this.setState({
            retur: "3"
        })
    }
    public resultFour = () => {
        this.setState({
            retur: "4"
        })
    }
    public handleResult = (e: any) => {
        e.prtventDefault()
        this.setState({
            yeresultOpen: true
        })
    }
    public handleysresultSubmit = () => {
        this.setState({
            yeresultOpen: false
        })
    }
    public handleysresultClose = () => {
        this.setState({
            yeresultOpen: false
        })
    }
    public handleClick = () => {
        console.info("遮罩层被点击时触发回调")
    }
    public handleEscClick = () => {
        console.info("Esc被按下时触发回调")
    }
    public handleSubmit = () => {
        console.info("提交数据")
        this.props.handleClose("modalSerive")
    }
    public render() {
        return (
            <Modal
                title='请选择服务补救原因'
                onCancel={() => {
                    this.props.handleClose("modalSerive")
                }}
                style={{ width: 850, height: 550 }}
                onOk={this.handleSubmit}
            >
                <div>
                    <ul className="qd-popup-list">
                        <li onClick={this.resultOne}>
                            服务补救{
                                this.state.retur == "1" ? <i className="iconfont icon-finish"></i> : ""
                            }
                        </li>
                        <li onClick={this.resultTwo}>
                            质量补救{
                                this.state.retur == "2" ? <i className="iconfont icon-finish"></i> : ""
                            }
                        </li>
                        <li onClick={this.resultThree}>
                            电话中断{
                                this.state.retur == "3" ? <i className="iconfont icon-finish"></i> : ""
                            }
                        </li>
                        <li onClick={this.resultFour}>
                            营销办理失败{
                                this.state.retur == "4" ? <i className="iconfont icon-finish"></i> : ""
                            }
                        </li>
                    </ul>
                </div>
            </Modal>
        )
    }
}