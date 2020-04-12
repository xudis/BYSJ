import React, { Component } from "react"
import { Button } from "antd"
import moment from "moment"
import { Moment } from "moment"
import { DateRange } from "./datePicker"
export interface IProps {
    listTitle: string,
    changeTitle: Function,
    changeDate: Function,
    searchData: Function,
    updateData: Function,
}
export interface IState {
    startValue: Moment,
    endValue: Moment,
    searchParams: {
        startDate?: string,
        endDate?: string,
        callId: string,
        applStaffName: string
    }
}
export interface IBeans {

}
export interface IBean {

}
export default class RecordHeader extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)
        this.state = {
            startValue: moment(moment().format("YYYY-MM-DD 00:00:00")),
            endValue: moment(moment().format("YYYY-MM-DD HH:mm:ss")),
            searchParams: {
                startDate: moment().format("YYYY-MM-DD 00:00:00"),
                endDate: moment().format("YYYY-MM-DD HH:mm:ss"),
                callId: "",
                applStaffName: ""
            }
        }
    }
    public search = (option: {
        startValue: string,
        endValue: string
    }) => {
        this.setState({
            searchParams: {
                ...this.state.searchParams,
                startDate: option.startValue,
                endDate: option.endValue
            }
        })

        this.props.changeDate(option.startValue, option.endValue)
    }
    public changeList = (e: any) => {
        e.preventDefault()
        let key = e.target.innerHTML
        if (key == "业务结果审批") {
            this.props.changeTitle("businessResult")
        } else {
            this.props.changeTitle("noDisturbResult")
        }
        this.setState({
            searchParams: {
                callId: "",
                applStaffName: ""
            }
        })
    }
    public changeInput = (e: any) => {
        let target = e.target
        if (target.placeholder == "请输入流水号") {
            this.setState({
                searchParams: {
                    ...this.state.searchParams,
                    callId: target.value
                }
            })
        } else {
            this.setState({
                searchParams: {
                    ...this.state.searchParams,
                    applStaffName: target.value
                }
            })
        }
    }
    render() {
        const { listTitle } = this.props
        const { callId, applStaffName } = this.state.searchParams
        let { startValue, endValue } = this.state
        return (
            <div>
                <div className="common-title">
                    <div className="tab-wrap">
                        <a href="/" onClick={this.changeList} className={listTitle === "businessResult" ? "choose" : "noo"}>业务结果审批</a>
                        <a href="/" onClick={this.changeList} className={listTitle === "noDisturbResult" ? "choose" : "noo"}>免打扰审批</a>
                    </div>
                    <div>
                        <ul className="modify_log-search-wrap mb-10 mt-20">
                            <DateRange
                                startValue={startValue}
                                endValue={endValue}
                                search={this.search}
                            />
                            <input type="text" onChange={this.changeInput} value={callId} placeholder="请输入流水号" className="art-input pl-15" style={{ width: "200px", border: "1px solid #d9d9d9", height: "32px" }} />
                            <input type="text" onChange={this.changeInput} value={applStaffName} placeholder="请输入申请人姓名" className="art-input pl-15" style={{ width: "200px", border: "1px solid #d9d9d9", height: "32px" }} />
                            <Button className="pl-15" color="info" onClick={() => { this.props.searchData(this.state.searchParams) }}>查询</Button>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}