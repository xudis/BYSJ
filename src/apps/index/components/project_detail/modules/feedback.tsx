import React, { Component } from "react"
import { Modal } from "antd"

export interface IProps {
    content: Object | any[] | string,
    handleClose: Function,
    feedbackOpen: boolean
}
export interface IState {
    data: Object | any[] | string
}

export default class Feedback extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            data: props.content
        }
    }
    public handleSubmit = () => {
        this.props.handleClose("feedback")
    }
    public render() {
        return (
            <Modal
                style={{ height: 550, width: 850 }}
                onOk={this.handleSubmit}
                onCancel={this.props.handleClose("feedback")}
                keyboard={true}
                title="查看反馈">
                <div>
                    <div className="qd-popup-content" style={{ "height": "360px", "margin": "0 0 25px 0" }}>
                        {this.state.data}
                    </div>
                </div>
            </Modal>
        )
    }
}