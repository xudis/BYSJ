import React, { Component } from "react"
import { Modal } from "antd"
import IndexModelDetail from './indexModelDetail'
export interface IProps {
    handleClose: Function,
    handleOpen: boolean
}
export interface IState {
    headerOpen: boolean
}

export default class name extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            headerOpen: false
        }
    }
    public handleSubmit = () => {
        this.props.handleClose("play")
    }
    public inputName = (e: any) => {

    }
    public toSearch = () => {
        this.search()
    }
    public search = () => { }
    public handleHeaderOpen = () => {
        this.setState({
            headerOpen: !this.state.headerOpen
        })
    }
    public handleHeaderClose = () => {
        this.handleHeaderOpen()
    }
    public render() {
        return (
            <Modal
                // visible={this.state.visible}
                style={{ width: "550px", height: "650px" }}
                onCancel={this.handleHeaderClose}
                onOk={this.handleSubmit}
                keyboard={true}
                title="从模板中添加"
            >
                <div>
                    <div className="qd-popup-content" style={{ width: "500px", height: "370px", position: "relative" }}>
                        <span>
                            <em style={{ position: "absolute", top: "20px", left: "480px" }} className="iconfont icon-search" onClick={this.toSearch}></em>
                        </span>
                        <ul className="qd-popup-list bgblue clearfix ellipsis">
                            <li>
                                <a href="#nogo" onClick={this.handleHeaderOpen} title="">分省运营：汇总三<i className="iconfont icon-right"></i></a>
                            </li>
                            <li>
                                <a href="#nogo" onClick={this.handleHeaderOpen} title="">分省运营：汇总三<i className="iconfont icon-right"></i></a>
                            </li>
                            <li>
                                <a href="#nogo" onClick={this.handleHeaderOpen} title="">分省运营：汇总三<i className="iconfont icon-right"></i></a>
                            </li>
                        </ul>
                    </div>
                    {
                        <IndexModelDetail
                            handleOpen={this.state.headerOpen}
                            handleClose={this.handleHeaderClose}
                        />
                    }
                </div>
            </Modal>
        )
    }
}