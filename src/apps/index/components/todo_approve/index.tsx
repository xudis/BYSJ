import React, { Component } from "react"
import { Link } from "react-router-dom"
import ListResult from "./modules/listResult"
export interface IProps {
    history: object
}
export interface IState {
    list: string
}

export default class ToDoApprove extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)
        this.state = {
            list: "businessResult"

        }
    }
    public changeList = (e: any) => {
        e.preventDefault()
        let key = e.target.innerHTML
        if (key == "业务结果审批") {
            this.setState({
                list: "businessResult"
            })
        } else {
            this.setState({
                list: "noDisturbResult"
            })
        }

    }
    render() {
        const { list } = this.state
        return (
            <div>
                <div>
                    <div className="qd-inner">
                        <div className="common-title modify_log-wrap pd-20 pd-10" style={{ marginTop: "20px" }} >
                            <div className="common-title">
                                <h3 style={{ textAlign: "center", fontSize: "28px", fontWeight: 500 }}>
                                    待办审批
                            </h3>
                            </div>
                            <div className="tab-wrap mb-10" style={{ position: "relative" }}>
                                <a href="/" onClick={this.changeList} className={list === "businessResult" ? "choose" : "noo"}>业务结果审批</a>
                                <a href="/" onClick={this.changeList} className={list === "noDisturbResult" ? "choose" : "noo"}>免打扰审批</a>
                                <Link to="/todoApprove/approveRecord" style={{ position: "absolute", right: "0px", textDecoration: "underline", cursor: "pointer" }}>查看已审批记录<i className="iconfont icon-right"></i></Link>
                            </div>
                            <div className="mt-10 main">
                                <ListResult history={this.props.history} listTitle={list} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}