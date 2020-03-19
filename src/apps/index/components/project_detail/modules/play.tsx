import React, { Component } from "react"
import { Modal } from "antd"

export interface IProps {
    handleClose: Function,
    playOpen: boolean,
    soundRecord: string
}
export interface IState {
    url: string
}

export default class Play extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            url: this.props.soundRecord
        }
    }
    public handleSubmit = () => {
        this.props.handleClose("play")
    }
    public render() {
        return (
            <Modal
                style={{ width: 650, height: 165 }}
                onOk={this.handleSubmit}
                onCancel={this.props.handleClose("play")}
                keyboard={true}
                title="播放录音"
            >
                <audio src={this.state.url} controls controlsList="nodownload" style={{ width: "250px", height: "20px" }}></audio>
            </Modal>
        )
    }
}