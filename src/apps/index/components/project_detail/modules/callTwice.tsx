import React, { Component } from "react"
import Ajax from "../../../../../chushi/art-ajax"
import { Modal } from "antd"

export interface IProps {
    callTwiceOpen: boolean,
    handleClose: Function,
    campaignId: string
}
export interface IState {
    projectData: any[],
    tingjiStatus: number | string,
    guanjiStatus: number | string,
    guaduanStatus: number | string,
    zhanxianStatus: number | string,
    mangyinStatus: number | string,
    params: {
        campaignId: string,
        provinceId: string
    }
}
export interface IBean {
    total: string
}
export interface IBeans {
    bsoptionID: string | number
}
export default class CallTwice extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            projectData: [],
            tingjiStatus: 0,
            guanjiStatus: 0,
            guaduanStatus: 0,
            zhanxianStatus: 0,
            mangyinStatus: 0,
            params: {
                campaignId: this.props.campaignId,
                provinceId: "03112"
            }
        }
    }
    public handleSubmit = () => {
        this.props.handleClose("callTwice")
        this.getListContent()
    }
    public getListContent = () => {
        const newArr = [...this.state.projectData]
        const newStr = newArr.join(",")
        let searchParams = {
            campaignId: this.props.campaignId,
            provinceId: "03112",
            enablebsoption: newStr
        }
        Ajax.post("/task/getTwoCallManagement", searchParams)
            .then(() => { })
            .catch(() => { })
    }
    public componentDidMount = () => {
        const newArr = [...this.state.projectData]
        Ajax.post<IBean, IBeans>("/task/getSelectTwoCallManagement", this.state.params).then(({ data }) => {
            data.beans.map((item) => {
                if (item.bsoptionID === "0104") {
                    this.setState({
                        guanjiStatus: 1
                    })
                    newArr.push("0104")
                } else if (item.bsoptionID === "0102") {
                    this.setState({
                        guanjiStatus: 1
                    })
                    newArr.push("0102")
                } else if (item.bsoptionID === "0105") {
                    this.setState({
                        guanjiStatus: 1
                    })
                    newArr.push("0105")
                } else if (item.bsoptionID === "0106") {
                    this.setState({
                        guanjiStatus: 1
                    })
                    newArr.push("0106")
                } else if (item.bsoptionID === "0114") {
                    this.setState({
                        guanjiStatus: 1
                    })
                    newArr.push("0114")
                }
            })
            this.setState({
                projectData: newArr
            })
        }).catch(() => { })
    }
    //停机勾选
    public tingjiCHeck = () => {
        const newArr = [...this.state.projectData]
        if (this.state.tingjiStatus === 0) {
            newArr.push("0106")
            this.setState({
                tingjiStatus: 1,
                projectData: newArr
            })
        } else {
            const num = newArr.indexOf("0106")
            newArr.splice(num, 1)
            this.setState({
                tingjiStatus: 0,
                projectData: newArr
            })
        }
    }
    //停机勾选
    public tingjiCheck = () => {
        const newArr = [...this.state.projectData]
        if (this.state.tingjiStatus === 0) {
            newArr.push("0106")
            this.setState({
                tingjiStatus: 1,
                projectData: newArr
            })
        } else {
            const num = newArr.indexOf("0106")
            newArr.splice(num, 1)
            this.setState({
                tingjiStatus: 0,
                projectData: newArr
            })
        }
    }
    //关机勾选
    public guanjiCheck = () => {
        const newArr = [...this.state.projectData]
        if (this.state.guanjiStatus === 0) {
            newArr.push("0104")
            this.setState({
                guanjiStatus: 1,
                projectData: newArr
            })
        } else {
            const num = newArr.indexOf("0104")
            newArr.splice(num, 1)
            this.setState({
                guanjiStatus: 0,
                projectData: newArr
            })
        }
    }
    //挂断勾选
    public guaduanCheck = () => {
        const newArr = [...this.state.projectData]
        if (this.state.guaduanStatus === 0) {
            newArr.push("0114")
            this.setState({
                guaduanStatus: 1,
                projectData: newArr
            })
        } else {
            const num = newArr.indexOf("0114")
            newArr.splice(num, 1)
            this.setState({
                guaduanStatus: 0,
                projectData: newArr
            })
        }
    }
    //占线勾选
    public zhanxianCheck = () => {
        const newArr = [...this.state.projectData]
        if (this.state.zhanxianStatus === 0) {
            newArr.push("0105")
            this.setState({
                zhanxianStatus: 1,
                projectData: newArr
            })
        } else {
            const num = newArr.indexOf("0105")
            newArr.splice(num, 1)
            this.setState({
                zhanxianStatus: 0,
                projectData: newArr
            })
        }
    }
    //忙音勾选
    public mangyinCheck = () => {
        const newArr = [...this.state.projectData]
        if (this.state.mangyinStatus === 0) {
            newArr.push("0102")
            this.setState({
                zhanxianStatus: 1,
                projectData: newArr
            })
        } else {
            const num = newArr.indexOf("0102")
            newArr.splice(num, 1)
            this.setState({
                mangyinStatus: 0,
                projectData: newArr
            })
        }
    }
    public render() {
        return (
            <Modal
                style={{ height: 550, width: 850 }}
                onOk={this.handleSubmit}
                onCancel={this.props.handleClose("callTwice")}
                keyboard={true}
                title="二呼管理"
            >
                <div>
                    <ul className="qd-popup-list">
                        <li>二呼外呼<span className="fn-right pr-20">是</span></li>
                    </ul>
                    <ul className="qd-popup-list pb-20">
                        <li className="dsc">二呼任务状态</li>
                        <li onClick={() => { this.tingjiCHeck() }}>停机
                        {
                                this.state.tingjiStatus === 1 ?
                                    <i className="iconfont icon-finish"></i> : ""
                            }
                        </li>
                        <li onClick={() => { this.guanjiCheck() }}>关机
                         {
                                this.state.guanjiStatus === 1 ?
                                    <i className="iconfont icon-finish"></i> : ""
                            }
                        </li>
                        <li onClick={() => { this.guaduanCheck() }}>用户拒接
                         {
                                this.state.guaduanStatus === 1 ?
                                    <i className="iconfont icon-finish"></i> : ""
                            }
                        </li>
                        <li onClick={() => { this.zhanxianCheck() }}>无人接听
                         {
                                this.state.zhanxianStatus === 1 ?
                                    <i className="iconfont icon-finish"></i> : ""
                            }
                        </li>
                        <li onClick={() => { this.mangyinCheck() }}>忙音
                         {
                                this.state.mangyinStatus === 1 ?
                                    <i className="iconfont icon-finish"></i> : ""
                            }
                        </li>
                    </ul>
                </div>
            </Modal>
        )
    }
}