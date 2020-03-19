import React, { Component } from "react"
import { Modal, Switch } from "antd"

export interface IProps {
    handleClose: Function,
    handleOpen: boolean,
    myMonitorItems: {
        numbervalue: string,
        jielou: string,
    }
}
export interface IState {
    open: boolean
}

export default class myMonitoring extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            open: true
        }
    }
    public handleClose = () => {
        this.setState({
            open: false
        })
    }
    public handleSubmit = () => {
        this.props.handleClose()
    }
    public render() {
        return (
            <Modal
                style={{ width: 850, height: 550 }}
                onOk={this.handleSubmit}
                onCancel={this.props.handleClose()}
                keyboard={true}
                title="5元1000M流量项目监控模型"
            >
                <div>
                    <div>
                        <div className="qd-popup-contnet" style={{ height: "370px" }}>
                            <div className="describe">
                                <span>分省汇总：汇总3</span>
                                <div className="fn-right">
                                    <a href="" title="删除">
                                        <i className="iconfont icon-iconfont-shanchu"></i>
                                    </a>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <table className="t-table t-table-striped">
                                <thead>
                                    <tr>
                                        <th>监控指标</th>
                                        <th>判断符号</th>
                                        <th>阈值</th>
                                        <th>当前值</th>
                                        <th>显示监控图标</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>漏接率</td>
                                        <td><span>></span></td>
                                        <td>3</td>
                                        <td>{this.props.myMonitorItems.jielou}</td>
                                        <td> <Switch defaultChecked /></td>
                                    </tr>
                                    <tr>
                                        <td>接通率</td>
                                        <td><span>></span></td>
                                        <td>20%</td>
                                        <td>{this.props.myMonitorItems.numbervalue}</td>
                                        <td> <Switch /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}