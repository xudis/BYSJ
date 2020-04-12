import React, { Component } from "react"
import Ajax from "../../../../../chushi/art-ajax"
import { Link } from "react-router-dom"
import RecordHeader from "./recordHeader"
import ListRecord from "./listRecord"
import momemt from "moment";
export interface IProps {
    history: any
}
export interface IState {
    listTitle: string,
    data: any[],
    url: string,
    current: number,
    applicationType: string,
    total: number,
    modeType: "1",
    searchParams: {
        modeType: "1",
        startDate: string,
        endDate: string,
        callId: string,
        applStaffName: string,
        start: number,
        limit: number
    }
}
export interface IBeans {

}
export interface IBean {

}
export default class ApproveRecord extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)
        this.state = {
            listTitle: "businessResult",
            data: [],
            url: "/business/getBusiResApprovedList",
            current: 1,
            applicationType: "业务结果修改",
            total: 0,
            modeType: "1",
            searchParams: {
                modeType: "1",
                startDate: momemt().format("YYYY-MM-DD 00:00:00"),
                endDate: momemt().format("YYYY-MM-DD HH:mm:ss"),
                callId: "",
                applStaffName: "",
                start: 0,
                limit: 10
            }
        }
    }

    public updateData = (listTitle: string) => {
        const { startDate, endDate } = this.state.searchParams
        let url = "", searchParams = {}, applicationType: any;
        switch (listTitle) {
            case "businessResult":
                url = "/business/getBusiResApprovedList"
                searchParams = {
                    modeType: "1",
                    startDate: momemt().format("YYYY-MM-DD 00:00:00"),
                    endDate: momemt().format("YYYY-MM-DD HH:mm:ss"),
                    callId: "",
                    applStaffName: "",
                    start: 0,
                    limit: 10
                }
                applicationType: "业务结果修改"
                break;
            case "noDisturbResult":
                url = "/business/getBusiResApprovedList"
                searchParams = {
                    modeType: "3",
                    startDate: momemt().format("YYYY-MM-DD 00:00:00"),
                    endDate: momemt().format("YYYY-MM-DD HH:mm:ss"),
                    callId: "",
                    applStaffName: "",
                    start: 0,
                    limit: 10
                }
                applicationType: "免打扰修改"
                break;
        }
        this.setState({
            data: [],
            total: 0,
            current: 1,
            url,
            applicationType,
            searchParams: {
                ...this.state.searchParams,
                ...searchParams
            }
        })
        Ajax.post<{ total: number }, any>(url, searchParams).then(({ data }) => {
            this.setState({
                data: data.beans.map(item => {
                    item.modfType = applicationType;
                    return item
                }),
                total: data.bean.total,
                current: data.bean.total > 0 ? 1 : 0
            })
        }).catch(() => {

        })
    }
    //点击分页器更新列表数据
    public pageSearch = (page: number) => {
        this.setState({
            current: page,
            searchParams: {
                ...this.state.searchParams,
                start: (page - 1) - this.state.searchParams.limit
            }
        }, () => {
            this.search()
        })
    }
    public search = () => {
        const { applicationType } = this.state
        Ajax.post<{ total: number }, any>(this.state.url, this.state.searchParams).then(({ data }) => {
            this.setState({
                data: data.beans.map(item => {
                    item.modfType = applicationType;
                    return item
                }),
                total: data.bean.total,
            })
        }).catch(() => {

        })
    }
    public searchData = (date: any) => {
        this.setState({
            searchParams: { ...this.state.searchParams, start: 0 }
        }, () => {
            const { applicationType, url, searchParams } = this.state
            let searchP = {
                ...searchParams,
                ...date
            }
            Ajax.post<{ total: number }, any>(url, searchP).then(({ data }) => {
                this.setState({
                    data: data.beans.map(item => {
                        item.modfType = applicationType;
                        return item
                    }),
                    total: data.bean.total,
                    current: 1,
                    searchParams: {
                        ...searchP
                    }
                })
            }).catch(() => {

            })
        })




    }
    public componentDidMount = () => {
        const { applicationType } = this.state
        Ajax.post<{ total: number }, any>(this.state.url, this.state.searchParams).then(({ data }) => {
            this.setState({
                data: data.beans.map(item => {
                    item.modfType = applicationType;
                    return item
                }),
                total: data.bean.total,
                current: 1
            })
        }).catch(() => {

        })
    }
    public changeTitle = (listTitle: string) => {
        this.setState({
            listTitle,
            data: [],
            total: 0,
            current: 1
        }, () => {
            this.updateData(listTitle)
        })
    }
    public changeDate = (startDate: string, endDate: string) => {
        this.setState({
            searchParams: {
                ...this.state.searchParams,
                startDate,
                endDate
            }
        })
    }
    render() {
        const { current, listTitle, data } = this.state
        return (
            <div>
                <div>
                    <div className="qd-inner">
                        <div className="common-title">
                            <h3 className="data-enter-h3">
                                <Link to="/todoApprove" className="iconfont icon-left"></Link>
                                <span style={{ cursor: "pointer" }}>已审批记录</span>
                            </h3>
                        </div>
                        <div className="pd-20 pt-10 modify_log-wrap">
                            <RecordHeader
                                changeTitle={this.changeTitle}
                                listTitle={listTitle}
                                searchDara={this.searchData}
                                updateDate={this.updateData}
                                changeDate={this.changeDate}
                            />
                        </div>
                        <div className="mt-10 main">
                            <ListRecord
                                history={this.props.history}
                                pageSearch={this.pageSearch}
                                data={data}
                                total={String(Number(this.state.total))}
                                listTitle={listTitle}
                                current={current}
                            />
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}