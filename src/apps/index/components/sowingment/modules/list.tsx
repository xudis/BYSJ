import React, { Component } from "react"
import Ajax from "../../../../../chushi/art-ajax"
import { Icon, Input, Table, Select } from "antd"
import ImgUpload from "./imgUpload"
import Example from "./popconfirm"
import SelectSearch from "./selectSearch"

export interface IProps {
    deletePlatform: Function,
    changePlatform: Function,
    contentTypeChange: Function,
    moveUp: Function,
    moveDown: Function,
    changeType: Function,
    changeMode: Function,
    handleSelectChange: Function,
    data: any[]
}
export interface IState {
    open: boolean,
    record: object
}

export default class List extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            open: false,
            record: {}
        }
    }
    public handleOpen = (record: object) => {
        this.setState({
            open: true,
            record
        })
    }
    public handleClose = () => {
        this.setState({
            open: true
        })
    }
    public getColumns = () => {
        return [{
            width: 200,
            title: "图片",
            dataIndex: "url",
            render: (text: any, record: any, index: number) => {
                return (
                    <div>{
                        record.imageAddress ? <img
                            src={record.imageAddress}
                            style={{ width: "192px", height: "30px" }}
                            onClick={() => { this.handleOpen(record) }}
                        /> : <a onClick={() => { this.handleOpen(record) }} style={{ paddingLeft: "45px" }}
                            href="">
                                点击上传图片
                        </a>
                    }</div>
                )
            }
        }, {
            title: "对接平台",
            dataIndex: "toPlatform",
            render: (text: any, record: any, index: any) => (
                <span>
                    <Select
                        style={{ width: 200 }}
                        value={record.toPlatform}
                        onChange={(valNow: any) => {
                            this.props.changePlatform(valNow, record, index)
                        }}
                    >
                        <Select.Option value="易培训平台">易培训平台</Select.Option>
                        <Select.Option value="其他平台">其他平台</Select.Option>
                    </Select>
                </span>
            )
        }, {
            title: "内容类型",
            dataIndex: "contentType",
            render: (text: any, record: any, index: any) => (
                <span>
                    <Select
                        style={{ width: 200 }}
                        value={record.toPlatform}
                        onChange={(valNow: any) => {
                            this.props.changeType(valNow, record, index)
                        }}
                    >
                        <Select.Option value="内部课程">内部课程</Select.Option>
                        <Select.Option value="外部链接">外部链接</Select.Option>
                    </Select>
                </span>
            )
        }, {
            title: "承载方式",
            dataIndex: "bearMode",
            render: (text: any, record: any, index: any) => (
                <span>
                    <Select
                        style={{ width: 200 }}
                        value={record.toPlatform}
                        onChange={(valNow: any) => {
                            this.props.changeMode(valNow, record, index)
                        }}
                    >
                        <Select.Option value="01">PC端</Select.Option>
                        <Select.Option value="02">小程序</Select.Option>
                    </Select>
                </span>
            )
        }, {
            title: "课程/链接名称",
            render: (text: any, record: any, index: any) => {
                if (record.contentTypr == "内部课程") {
                    return (
                        <span>
                            <SelectSearch
                                record={record}
                                value={record.courseName}
                                onChange={(value: any, courseId: string) => {
                                    this.props.handleSelectChange(value, courseId, index, record)
                                }}
                            />
                            <div style={{ position: "relative", display: "inline-block", height: "0px", width: "20px", marginLeft: "5px" }}>
                                <Icon type="UpOutlined" style={{ position: "absolute", bottom: "5px", left: 0, cursor: "pointer" }} onClick={() => { this.props.moveUp(index) }} />
                                <Icon type="DownOutlined" style={{ position: "absolute", bottom: "-5px", left: 0, cursor: "pointer" }} onClick={() => { this.props.moveDown(index) }} />
                            </div>
                            <Example title="" deletePlatform={() => { this.props.deletePlatform(record, index) }}></Example>
                        </span>
                    )
                } else {
                    return (
                        <span>
                            <Input
                                value={record.couseAddr}
                                onChange={(e: any) => { this.props.contentTypeChange(e, index, record) }}
                                placeholder="请输入外部链接"
                                style={{ width: 200, color: "#999", border: "1px solid,#d9d9d9", height: "32px" }}
                            />
                            <div style={{ position: "relative", display: "inline-block", height: "0px", width: "20px", marginLeft: "5px" }}>
                                <Icon type="UpOutlined" style={{ position: "absolute", bottom: "5px", left: 0, cursor: "pointer" }} onClick={() => { this.props.moveUp(index) }} />
                                <Icon type="DownOutlined" style={{ position: "absolute", bottom: "-5px", left: 0, cursor: "pointer" }} onClick={() => { this.props.moveDown(index) }} />
                            </div>
                            <Example title="" deletePlatform={() => { this.props.deletePlatform(record, index) }}></Example>
                        </span>
                    )
                }
            }
        }
        ]
    }
    public render() {
        return (
            <div>
                {
                    this.state.open ?
                        <ImgUpload
                            record={this.state.record}
                            open={this.state.open}
                            handleClose={this.handleClose}
                        /> : ""
                }
                <Table
                    dataSource={this.props.data}
                    columns={this.getColumns()}
                    bordered={true}
                    pagination={false}
                ></Table>
            </div>
        )
    }
}