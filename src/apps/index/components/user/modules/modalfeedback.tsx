import React, { Component } from "react"
import { Radio } from "antd"
import Ajax from "../../../../../chushi/art-ajax"

export interface IProps {
}
export interface IState {
    checkedSelect: any,
    checkedSelectNum: any,
    textArea: any
}

export default class EditQuest extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            checkedSelect: "",
            checkedSelectNum: 0,
            textArea: ""
        }
    }
    public ajaxChecked = () => {
        Ajax.post("/radio", {}).then(({ data }: { data: any }) => {
            this.setState({
                checkedSelect: data.beans[0].checkOne,
                checkedSelectNum: data.beans[1].checkTwo,
                textArea: data.beans[2].content
            })
        }).catch(() => { })
    }
    componentDidMount = () => {
        this.ajaxChecked()
    }

    public render() {
        const { checkedSelectNum, checkedSelect, textArea } = this.state
        return (
            <div>
                <h2>1、单选题描述:</h2>
                <Radio name="radio1" checked={checkedSelectNum === "1"}>设计不合理</Radio>
                <Radio name="radio2" checked={checkedSelectNum === "2"}>客服没有回答准确</Radio>
                <Radio name="radio3" checked={checkedSelectNum === "3"} disabled={true}>客服态度不好</Radio>
                <h2>2、填空题描述:</h2>
                <Radio name="radio" checked={checkedSelect === "A"}>设计不合理</Radio>
                <Radio name="radio" checked={checkedSelect === "B"}>客服没有回答准确</Radio>
                <Radio name="radio" checked={checkedSelect === "C"} disabled={true}>客服态度不好</Radio>

                <h2>3、填空题描述:</h2>
                <textarea style={{
                    width: "100%",
                    outline: "none",
                    lineHeight: "40px",
                    border: "1px solid grey"
                }} value={textArea}></textarea>
            </div>
        )
    }
}