import React, { Component } from "react"
import { Popconfirm, Icon } from "antd"



export interface IProps {
    deletePlatform: Function,
    title: string
}
export interface IState {

}

export default class Example extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
        }
    }
    private confirm = () => {
        this.props.deletePlatform()
    }
    public render() {
        return (
            <div>
                <Popconfirm deletePlatform={this.props.deletePlatform} title="确定删除此项么？" onConfirm={this.confirm} onCancel={this.confirm} >
                    <Icon style={{ cursor: "pointer" }} type="close"></Icon>
                </Popconfirm>
            </div>
        )
    }
}