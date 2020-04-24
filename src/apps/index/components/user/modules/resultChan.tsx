import React, { Component } from "react"
import { Pagination, Button, Radio, Table, message, Select, Modal } from "antd"
import moment from "moment"
import { Moment } from "moment"
import Ajax from "../../../../../chushi/art-ajax"
import { DateRange } from "./datePicker"
import "../css/manage.scss"
export interface IProps {
    history: any,
}
interface IState {
    page: number,
    startValue: Moment,
    endValue: any,
    data: any[],
    total: any,
    resultType: any,
    changeStateOpen: boolean,
    changeStateId: string,
    storeManageOpen: boolean;
    storeManageInit: any,
    searchParams: any,
    selectParams: any,
    resetSearchparams: any,
    selectedRowName: string,
}


export default class resultChan extends Component<IProps, IState> {
    startValue: any;
    endValue: any;

    constructor(props: IProps) {
        super(props)
        this.startValue = moment(moment().format("YYYY-MM-DD 00:00:00"))
        this.endValue = moment(moment().format("YYYY-MM-DD HH:mm:ss"))
        this.state = {
            selectedRowName: "请点击选择",
            endValue: this.endValue.format("YYYY-MM-DD HH:mm:ss"),
            startValue: this.startValue.format("YYYY-MM-DD 00:00:00"),
            data: [],
            total: 0,
            page: 1,
            resultType: [],
            selectParams: {
                resultType: "",
            },
            searchParams: {
                endDate: this.endValue.format("YYYY-MM-DD HH:mm:ss"),
                beginDate: this.startValue.format("YYYY-MM-DD 00:00:00"),
                start: "0",
                limit: "10",
                total: "",
                campaignId: "",
                callResult: "",

            },
            resetSearchparams: {
                endDate: this.endValue.format("YYYY-MM-DD HH:mm:ss"),
                beginDate: this.startValue.format("YYYY-MM-DD 00:00:00"),
                start: "0",
                limit: "10",
                total: "",
                campaignId: "",
                callResult: "",
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
    public codeChange = (e: any) => {
        const code = e.currentTarget.value
        this.setState({
            searchParams: {
                ...this.state.searchParams, campaignName: code
            }
        })

    }
    private cloumns = [
        {
            title: "通话流水号",
            dataIndex: "serialNum",
        },
        {
            title: "结果提交时间",
            dataIndex: "submitTime",
        }, {
            title: "客户手机号",
            dataIndex: "acceptPhone",
        }, {
            title: "项目名称",
            dataIndex: "campaignName",
        }, {
            title: "通话时长",
            dataIndex: "talkTime",
        }, {
            title: "业务结果",
            dataIndex: "callResult",
            render: (text: any, record: any, index: any) => {
                let value;
                switch (text) {
                    case "0399":
                        value = "营销失败"
                        break;
                    case "0700":
                        value = "营销成功"
                        break;
                    case "0104":
                        value = "关机"
                        break;
                    case "0102":
                        value = "忙音"
                        break;
                    case "0105":
                        value = "无人接听"
                        break;
                    case "0106":
                        value = "停机"
                        break;
                    case "0402":
                        value = "指定业务代表预约"
                        break;
                    case "0802":
                        value = "无效"
                        break;
                    case "0114":
                        value = "用户拒接"
                        break;
                    case "0005":
                        value = "未提交"
                        break;
                    case "0006":
                        value = "未提交"
                        break;
                    case "0000":
                        value = "营销失败"
                        break;
                };
                return (<span>
                    {value}
                </span>)
            }

        }, {
            title: "操作",
            render: (text: any, record: any, index: any) => <a onClick={() => { this.handleClick(text, record, index) }}>修改</a>
        }
    ]
    public search = () => {
        Ajax.post("/business/getMarketResultList", this.state.searchParams).then(({ data }: { data: any }) => {
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
                total: data.bean.total,

            })
        }).catch(() => { })
    }
    public reserSearch = () => {
        Ajax.post("/business/getMarketResultList", this.state.searchParams).then(({ data }: { data: any }) => {
            console.log(data);
            this.setState({
                data: data.beans,
                total: data.bean.total,
                selectedRowName: "请点击选择",
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
            Ajax.post("/business/getMarketResultList", this.state.searchParams).then(({ data }: { data: any }) => {
                console.log(data);
                this.setState({
                    data: data.beans,
                    total: data.bean.total,
                    page: 1
                })
            }).catch(() => { })
        })
    }
    public toSearch = () => {
        this.searchTerm()
    }
    private handleClick = (text: any, record: any, indx: any) => {
        this.props.history.push({
            pathname: `/user/resultDetails/${record.serialNum}&resultChan`,
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
                                <span >业务结果</span>
                            </h3>
                        </div>
                        <div className="pd-20 modify_log-wrap ">
                            {/* <div className="tab-wrap">
                                <a href="#/user/modifyLog" >业务结果修改</a>
                                <a href="#/user/modifyQue" className="choose">问卷修改</a>
                                <a href="#/user/modifyDis" >免打扰修改</a>
                            </div> */}
                            <ul className="modify_log-search-wrap mb-10">
                                <DateRange
                                    startValue={this.startValue}
                                    endValue={this.endValue}
                                    timeChange={this.timeChange}
                                />
                                <li>
                                    <Select
                                        style={{ width: 200, marginRight: 15 }}
                                        onChange={this.changeResultType}
                                        placeholder="请选择营销结果"
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
                                </li>
                                <li>
                                    <input placeholder="请输入项目名称" onChange={this.codeChange} className="art-input" style={{ width: "200px", border: "1px solid #ccc", height: "0px" }} />
                                </li>
                                <li className="btn-li">
                                    <Button className="a" color="info" onClick={this.toSearch}>查询</Button>
                                    <span style={{ marginLeft: "37px" }}>
                                        <Button className="search" color="primary" onClick={this.reserSearch}>重置</Button>

                                    </span>
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