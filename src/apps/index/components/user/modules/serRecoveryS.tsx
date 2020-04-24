import React, { Component } from "react"
import { Pagination, Button, Table, Select } from "antd"
import moment from "moment"
import { Moment } from "moment"
import Play from "../../project_detail/modules/play"
import Ajax from "../../../../../chushi/art-ajax"
import { DateRange } from "./datePicker"
import "../css/manage.scss"
export interface IProps {
    history: {
        push: Function
    }
}
export interface IState {
    data: any[],
    total: any,
    page: number,
    resultType: any,
    searchParams: {
        bngTime: any,
        endTime: any,
        start: number,
        limit: number,
        calloutStsCd: string,
        hallNm: string,
        actvNm: string,
        staffNm: string,
        hallStaffPhone: string,
        origSerialNum: string,
        approlReason: string,
        resultType: string

    },
    resetSearchParams: {
        bngTime: any,
        endTime: any,
        start: number,
        limit: number,
        calloutStsCd: string,
        hallNm: string,
        actvNm: string,
        staffNm: string,
        hallStaffPhone: string,
        origSerialNum: string,
        approlReason: string,
        resultType: string

    },
    playOpen: boolean,
    soundRecord: string,
    reasonBu: any,
    selectParams: any
}

export default class SerRecoveryS extends Component<IProps, IState> {
    startValue: any;
    endValue: any;
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
                bngTime: this.startValue.format("YYYY-MM-DD 00:00:00"),
                endTime: this.endValue.format("YYYY-MM-DD HH:mm:ss"),
                start: 0,
                limit: 10,
                calloutStsCd: "",
                hallNm: "",
                actvNm: "",
                staffNm: "",
                hallStaffPhone: "",
                origSerialNum: "",
                approlReason: "",
                resultType: ""

            },
            resetSearchParams: {
                bngTime: this.startValue.format("YYYY-MM-DD 00:00:00"),
                endTime: this.endValue.format("YYYY-MM-DD HH:mm:ss"),
                start: 0,
                limit: 10,
                calloutStsCd: "",
                hallNm: "",
                actvNm: "",
                staffNm: "",
                hallStaffPhone: "",
                origSerialNum: "",
                approlReason: "",
                resultType: ""
            },
            playOpen: false,
            soundRecord: "",
            selectParams: {
                resultType: "",
            },
            reasonBu: [],

        }
    }
    public timeChange = (option: any) => {
        let timeChoose = { bngTime: "", endTIme: "" }
        timeChoose.bngTime = option.startValue
        timeChoose.endTIme = option.endValue
        this.setState({
            searchParams: { ...this.state.searchParams, ...timeChoose }
        }, () => { this.search() })
    }
    public changeResultType = (e: any) => {
        const resultType = String(e)
        this.setState({
            searchParams: {
                ...this.state.searchParams, resultType: resultType.replace(/\s*/g, "")
            }
        })
    }
    public changeResultTypeSea = (e: any) => {
        const reasonBu = String(e)
        this.setState({
            searchParams: {
                ...this.state.searchParams, approlReason: reasonBu.replace(/\s*/g, "")
            }
        })
    }
    public userChange = (e: any) => {
        const staffNm = e.target.value
        this.setState({
            searchParams: {
                ...this.state.searchParams, staffNm: staffNm
            }
        })
    }
    public phoneChange = (e: any) => {
        const hallStaffPhone = e.target.value
        this.setState({
            searchParams: {
                ...this.state.searchParams, hallStaffPhone: hallStaffPhone
            }
        })
    }
    public storeNmChange = (e: any) => {
        const hallName = e.target.value
        this.setState({
            searchParams: {
                ...this.state.searchParams, hallNm: hallName
            }
        })
    }
    public codeChange = (e: any) => {
        const actvNm = e.target.value
        this.setState({
            searchParams: {
                ...this.state.searchParams, actvNm: actvNm
            }
        })
    }
    public telphoneChange = (e: any) => {
        const origSerialNum = e.target.value
        this.setState({
            searchParams: {
                ...this.state.searchParams, origSerialNum: origSerialNum
            }
        })
    }
    public playHandleOpen = (e: any, item: any) => {
        const operationType = e.currentTarget.getAttribute("operation-type")
        if (/^play$/.test(operationType)) {
            this.setState({
                playOpen: true,
                soundRecord: item.rcdngFilePath
            })
        }
        e.preventDefault()
    }
    public playHandleClose = (type: any) => {
        if (/^play$/.test(type)) {
            this.setState({
                playOpen: false
            })
        }
    }
    private columns = [
        {
            title: '通话流水号',
            dataIndex: ' serialNum',
            render: (text: any, record: any, index: any) =>
                <a onClick={() => { this.handleClick(text, record, index) }}>{text}</a>
        },
        {
            title: '服务补救时间',
            dataIndex: 'apptolTime'
        },
        {
            title: '项目名称',
            dataIndex: "actvNm",
        },
        {
            title: '厅店名称',
            dataIndex: 'hallNm'
        },
        {
            title: '厅店员工',
            dataIndex: 'staffNm'
        },
        {
            title: '厅店员工手机号',
            dataIndex: 'callNum'
        },
        {
            title: '服务补救',
            dataIndex: 'approlReason',
            render: (text: any, record: any, index: any) =>
                <span>{
                    (() => {
                        if (record.approlReason == "1") {
                            return "服务补救";
                        }
                        else if (record.approlReason == "2") {
                            return "质量补救";
                        }
                        else if (record.approlReason == "3") {
                            return "电话中断";
                        }
                        else if (record.approlReason == "4") {
                            return "营销办理失败";
                        }
                    })()}
                </span>
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
        Ajax.post("/marketResult/getMarketResult", this.state.selectParams).then(({ data }: { data: any }) => {
            console.log(data);
            this.setState({
                data: data.beans,
                total: data.bean.total
            })
        }).catch(() => { })
    }
    public resetSearch = () => {
        Ajax.post("/searchModifyLogs/selectLogsByParams", this.state.resetSearchParams).then(({ data }: { data: any }) => {
            console.log(data);
            this.setState({
                data: data.beans,
                total: data.bean.total
            })
        }).catch(() => { })
        Ajax.post("/marketResult/getMarketResult", this.state.selectParams).then(({ data }: { data: any }) => {
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
            Ajax.post("/searchModifyLogs/selectLogsByParams", this.state.searchParams).then(({ data }: { data: any }) => {
                console.log(data);
                this.setState({
                    data: data.beans,
                    total: data.bean.total,
                    page: 1
                })
            }).catch(() => { })
        })
        Ajax.post("/marketResult/getMarketResult", this.state.selectParams).then(({ data }: { data: any }) => {
            console.log(data);
            this.setState({
                data: data.beans,
                total: data.bean.total,
                page: 1
            })
        }).catch(() => { })
    }
    private handleClick = (text: any, record: any, indx: any) => {
        this.props.history.push({
            pathname: `/user/resultDetails/${record.serialNum}&serRecovery`,
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
    public componentDidCatch = () => {
        this.search()
        Ajax.post("/marketResult/getMarketResult", { stateParameter: "BUSINESS_RESULT" }).then(({ data }: { data: any }) => {
            console.log(data);
            this.setState({
                resultType: data.beans
            })
        }).catch(() => { })
        Ajax.post("/marketResult/getMarketResult", { stateParameter: "APPROL_REASON" }).then(({ data }: { data: any }) => {
            console.log(data);
            this.setState({
                reasonBu: data.beans
            })
        }).catch(() => { })
    }
    public render() {
        return (
            <div>
                <div>
                    <div className="qd-inner">
                        <div className="common-title">
                            <h3 className="data-center-h3">
                                <a href="#/user" className="iconfont icon-left"></a>
                                <span style={{ cursor: "pointer" }}>服务补救日志</span>
                            </h3>
                        </div>
                        <div className="pd-20 modify_log-wrap ">

                            <ul className="modify_log-search-wrap mt-20">
                                <DateRange
                                    startValue={this.startValue}
                                    endValue={this.endValue}
                                    timeChange={this.timeChange}
                                />
                                <li>
                                    <div className="ul-right-inner-hjf">
                                        <Select
                                            style={{ width: 200, marginRight: 15 }}
                                            onChange={this.changeResultType}
                                            placeholder="请选择'现结果'"
                                        >
                                            {
                                                this.state.resultType.map((value: any, index: any) => {
                                                    return (
                                                        <Select.Option>
                                                            {value.title}
                                                        </Select.Option>
                                                    )
                                                })
                                            }

                                        </Select>
                                    </div>
                                </li>
                                <li>
                                    <input placeholder="请输入项目名称" onChange={this.codeChange} className="art-input" style={{ width: "200px", border: "1px solid #ccc", height: "0px" }} />
                                </li>
                                <li>
                                    <input placeholder="请输入员工姓名" onChange={this.userChange} className="art-input" style={{ width: "200px", border: "1px solid #ccc", height: "0px" }} />
                                </li>
                                <li>
                                    <input placeholder="请输入厅店名称" onChange={this.storeNmChange} className="art-input" style={{ width: "200px", border: "1px solid #ccc", height: "0px" }} />
                                </li>

                                <li>
                                    <input placeholder="请输入员工手机号" onChange={this.phoneChange} className="art-input" style={{ width: "200px", border: "1px solid #ccc", height: "0px" }} />
                                </li>
                                <li>
                                    <input placeholder="请输入通话流水号" onChange={this.telphoneChange} className="art-input" style={{ width: "200px", border: "1px solid #ccc", height: "0px" }} />
                                </li>

                                <li>
                                    <div className="ul-right-inner-hjf">
                                        <Select
                                            style={{ width: 200, marginRight: 15 }}
                                            onChange={this.changeResultTypeSea}
                                            placeholder="请选择服务补救原因"
                                        >
                                            {
                                                this.state.reasonBu.map((value: any, index: any) => {
                                                    return (
                                                        <Select.Option>
                                                            {value.title}
                                                        </Select.Option>
                                                    )
                                                })
                                            }

                                        </Select>
                                    </div>
                                </li>
                                <li>
                                    <Button className="search" color="info" onClick={this.searchTerm}>查询</Button>
                                    <span style={{ marginLeft: "77px" }}>
                                        <Button className="search" color="primary" onClick={this.resetSearch}>重置</Button>
                                    </span>
                                </li>
                            </ul>
                            <Table
                                dataSource={this.state.data}
                                columns={this.columns}
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
                {
                    this.state.playOpen ?
                        <Play
                            soundRecord={this.state.soundRecord}
                            playOpen={this.state.playOpen}
                            handleClose={this.playHandleClose}
                        /> : ""
                }
            </div>
        )
    }
}