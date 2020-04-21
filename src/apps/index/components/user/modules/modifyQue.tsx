import React, { Component } from "react"
import { Pagination, Button, Table } from "antd"
import moment from "moment"
import Ajax from "../../../../../chushi/art-ajax"
import { DateRange } from "./datePicker"

export interface IProps {
    history: any,
}






export interface IState {
    searchParams: any,
    data: any[],
    total: any,
    page: number,
    resultType: any,
    changeStateOpen: boolean,
    changeStateId: string,
    storeManageOpen: boolean,
    storeManageInit: any
}

export default class ModifyLog extends Component<IProps, IState> {
    startValue: any;
    endValue: any;
    hallName: any;
    applicantName: string | undefined;
    applicantTel: any;
    callId: any
    constructor(props: IProps) {
        super(props)
        this.startValue = moment(moment().format("YYYY-MM-DD 00:00:00"))
        this.endValue = moment(moment().format("YYYY-MM-DD HH:mm:ss"))
        this.state = {
            data: [],
            total: 0,
            page: 1,
            resultType: [],
            searchParams: {
                startValue: this.startValue.format("YYYY-MM-DD 00:00:00"),
                endTime: this.endValue.format("YYYY-MM-DD HH:mm:ss"),
                resultType: "",
                otherValue: "常客维系",
                hallName: this.hallName,
                applicantTel: this.applicantTel,
                applicantName: this.applicantName,
                callID: this.callId,
                modfType: "3",
                page: 1,
                start: "0",
                limit: "10"
            },
            changeStateOpen: false,
            changeStateId: "",
            storeManageOpen: false,
            storeManageInit: {}
        }
    }
    public timeChange = (option: any) => {
        let timeChoose = { beginDate: "", endDate: "" }
        timeChoose.beginDate = option.startValue
        timeChoose.endDate = option.endValue
        this.setState({
            searchParams: { ...this.state.searchParams, ...timeChoose }
        }, () => {
            this.search()
        })
    }
    public changeResultType = (e: any) => {
        const resultType = String(e)
        this.setState({
            searchParams: {
                ...this.state.searchParams, resultType: resultType.replace(/\s*/g, "")
            }
        })
    }
    public storeNmChange = (e: any) => {
        const hallName = e.target.value
        this.setState({
            searchParams: {
                ...this.state.searchParams, hallName: hallName
            }
        })
    }
    public codeChange = (e: any) => {
        const callID = e.target.value
        this.setState({
            searchParams: {
                ...this.state.searchParams, callID: callID
            }
        })
    }
    public userChange = (e: any) => {
        const applicantName = e.target.value
        this.setState({
            searchParams: {
                ...this.state.searchParams, applicantName: applicantName
            }
        })
    }
    public projectChange = (e: any) => {
        const projectName = e.target.value
        this.setState({
            searchParams: {
                ...this.state.searchParams, projectName: projectName
            }
        })
    }
    public phoneChange = (e: any) => {
        const applicantTel = e.target.value
        this.setState({
            searchParams: {
                ...this.state.searchParams, applicantTel: applicantTel
            }
        })
    }

    private cloumns = [
        {
            title: "通话流水号",
            dataIndex: "callId",
            render: (text: any, record: any, index: any) => <a onClick={() => { this.handleClick(text, record, index) }}>{text}</a>
        },
        {
            title: "申请提交时间",
            dataIndex: "mktgRsltModfTime",
        }, {
            title: "申请类型",
            dataIndex: "modfType",
        }, {
            title: "申请人",
            dataIndex: "applStaffName",
        }, {
            title: "申请人手机号",
            dataIndex: "applTelphone",
        }, {
            title: "项目名称",
            dataIndex: "projectName",
        }, {
            title: "厅店名称",
            dataIndex: "hallName",
        }
    ]
    public search = () => {
        Ajax.post("/searchModifyLogs/selectLogsByParams", this.state.searchParams).then(({ data }: { data: any }) => {
            console.log(data);
            this.setState({
                data: data.beans,
                total: data.bean.total
            })
        }).catch(() => { })
    }
    public searchTerm = () => {
        this.setState({
            searchParams: { ...this.state.searchParams, start: 0 }
        }, () => {
            Ajax.post("/searchModifyLogs=selectLogsByParams", this.state.searchParams).then(({ data }: { data: any }) => {
                console.log(data);
                this.setState({
                    data: data.beans,
                    total: data.bean.total,
                    page: 1
                })
            }).catch(() => { })
        })
    }
    private handleClick = (text: any, record: any, indx: any) => {
        this.props.history.push({
            pathname: `/user/resultDetails/${record.callId}&modifyQue&admin`,
            state: {
                record
            }
        })
    }
    public pageSearch = (page: number) => {
        this.setState({
            searchParams: {
                ...this.state.searchParams,
                start: (page - 1) * this.state.searchParams.limit
            }
        }, () => { this.search() })
    }
    public componentDidMount = () => {
        this.search()
        Ajax.post('/markerResult/getmarketResult', { stateParametr: "BUSINESS_RESULT" }).then(({ data }) => {
            this.setState({
                resultType: data.beans
            })
        })
    }
    public render() {
        return (
            <div>
                <div>
                    <div className="qd-inner">
                        <div className="common-title">
                            <h3 className="data-center-h3">
                                <a href="#/user" className="iconfont icon-left"></a>
                                <span style={{ cursor: "pointer" }}>问卷修改</span>
                            </h3>
                        </div>
                        <div className="pd-20 modify_log-wrap pt-10">
                            <div className="tab-wrap">
                                <a href="#/user/modifyLog" >业务结果修改</a>
                                <a href="#/user/modifyQue" className="choose">问卷修改</a>
                                <a href="#/user/modifyDis" >免打扰修改</a>
                            </div>
                            <ul className="modify_log-search-wrap mt-20">
                                <DateRange
                                    startValue={this.startValue}
                                    endValue={this.endValue}
                                    timeChange={this.timeChange}
                                />

                                <li>
                                    <input placeholder="项目名称" onChange={this.projectChange} className="art-input" style={{ width: "200px", border: "1px solid #ccc", height: "0px" }} />
                                </li>
                                <li>
                                    <input placeholder="厅店名称" onChange={this.storeNmChange} className="art-input" style={{ width: "200px", border: "1px solid #ccc", height: "0px" }} />
                                </li>
                                <li>
                                    <input placeholder="申请人姓名" onChange={this.userChange} className="art-input" style={{ width: "200px", border: "1px solid #ccc", height: "0px" }} />
                                </li>
                                <li>
                                    <input placeholder="申请人手机号" onChange={this.phoneChange} className="art-input" style={{ width: "200px", border: "1px solid #ccc", height: "0px" }} />
                                </li>
                                <li>
                                    <input placeholder="通话流水号" onChange={this.codeChange} className="art-input" style={{ width: "200px", border: "1px solid #ccc", height: "0px" }} />
                                </li>
                                <li className="btn-li">
                                    <Button className="search" color="info" onClick={this.searchTerm}>查询</Button>
                                </li>
                            </ul>
                            <Table
                                dataSource={this.state.data}
                                columns={this.cloumns}
                                bordered={true}
                                pagination={false}>
                            </Table>
                            <div className="mt-10">
                                <Pagination
                                    current={this.state.page}
                                    total={this.state.total}
                                    onChange={this.pageSearch}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}