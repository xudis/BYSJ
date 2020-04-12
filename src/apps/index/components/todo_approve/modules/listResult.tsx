import React, { Component } from "react"
import Ajax from "../../../../../chushi/art-ajax"
import { Table, Pagination } from "antd"

export interface IProps {
    listTitle: string,
    history: any
}
export interface IState {
    data: any[],
    url: string,
    current: number,
    total: number,
    applicationType: string,
    searchParams: {
        limit: number,
        start: number,
        hallId: string
    }
}
export interface IBeans {

}
export interface IBean {
    total: any
}
export default class ListResult extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)
        this.state = {
            data: [],
            url: "",
            current: 0,
            total: 0,
            applicationType: "",
            searchParams: {
                limit: 10,
                start: 0,
                hallId: "56"
            }
        }
    }
    private businessColumns = [
        {
            title: "通话流水号",
            dataIndex: "called",
            render: (text: any, record: any, index: any) => {
                <span>{text}
                </span>
            }
        }, {
            title: "修改申请提交时间",
            dataIndex: "crtTime",
        }, {
            title: "客户手机号",
            dataIndex: "calledNm",
        }, {
            title: "申请类型",
            dataIndex: "applicationType",
        }, {
            title: "申请人",
            dataIndex: "applStaffName",
        }, {
            title: "原结果",
            dataIndex: "oldCallResultMsg",
        }, {
            title: "现结果",
            dataIndex: "newCallResultMsg",
        }, {
            title: "操作",
            render: (text: any, record: any, index: any) => {
                <span>
                    <a onClick={() => { this.handleBusiness(text, record, index) }}>{record.callId}</a>
                </span>
            }
        }]
    private noDisturbColumns = [
        {
            title: "通话流水号",
            dataIndex: "serialNum",
            render: (text: any, record: any, index: any) => {
                <span>
                    {text}
                    <a onClick={() => { this.handleNoDisturb(text, record, index) }}>{record.callId}</a>
                </span>
            }
        }, {
            title: "修改申请提交时间",
            dataIndex: "submitTime",
        }, , {
            title: "客户手机号",
            dataIndex: "acceptPhone",
        }, {
            title: "申请类型",
            dataIndex: "applicationType",
        }, {
            title: "申请人",
            dataIndex: "applStaffName",
        }, {
            title: "原结果",
            dataIndex: "currentState",
            render: (text: any, record: any, index: any) => {
                <span>
                    {record.currentState == "0" ? "已加入" : "未加入"}
                </span>
            }
        }, {
            title: "现结果",
            dataIndex: "applyState",
            render: (text: any, record: any, index: any) => {
                <span>
                    {record.applyState == "0" ? "已加入" : "未加入"}
                </span>
            }
        }, {
            title: "操作",
            render: (text: any, record: any, index: any) => {
                <span>
                    <a onClick={() => { this.handleNoDisturb(text, record, index) }}>{record.callId}</a>
                </span>
            }
        }]
    public componentDidMount = () => {
        let url = "chnlApprove/queryChnlApproveResultList",
            applicationType = "业务结果修改",
            searchParams = {
                campaignId: "",
                start: "0",
                limit: "10"
            }
        Ajax.post<IBean, IBeans>(url, searchParams).then(({ data }) => {
            this.setState({
                data: data.beans.map((item: any) => {
                    item.applicationType = applicationType;
                    return item
                }),
                total: data.bean.total,
                url,
                current: 1,
                applicationType,
                searchParams: { ...this.state.searchParams }
            })
        }).catch(() => { })

    }
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
        Ajax.post<{ total: number }, {}>(this.state.url, this.state.searchParams).then(({ data }) => {
            this.setState({
                data: data.beans.map((item: any) => {
                    item.applicationType = this.state.applicationType;
                    return item
                }),
                total: data.bean.total
            })
        }).catch(() => { })
    }

    public shouldComponentUpdate = (nextProps: any, nextState: any) => {
        const { listTitle } = nextProps
        let url = "/todoApprove",
            applicationType = "",
            searchParams = {}
        if (nextProps.listTitle !== this.props.listTitle) {
            switch (listTitle) {
                case "businessResult":
                    url = "/chnlApprove/queryChnlApproveResultList";
                    applicationType = "业务结果修改";
                    searchParams = {
                        campaignId: "",
                        start: 0,
                        limit: 10
                    }
                    break;
                case "noDisturbResult":
                    url = "/channlSpeciall/ChannlSpeciallList";
                    applicationType = "免打扰修改";
                    searchParams = {
                        start: 0,
                        limit: 10
                    }
                    break;
            }
            this.setState({
                applicationType, url, data: [],
                searchParams: { ...this.state.searchParams },
                current: 0,
                total: 0
            })
            Ajax.post<{ total: number }, {}>(url, searchParams).then(({ data }) => {
                let total = data.bean.total, resData
                if (listTitle === "noDisturbResult") {
                    resData = data.beans.map((item: any) => {
                        item.applicationType = applicationType;
                        return item
                    })
                } else {
                    resData = data.beans.map((item: any) => {
                        item.applicationType = applicationType;
                        return item
                    })
                }
                this.setState({
                    total, data: resData, current: 1
                })
            }).catch(() => { })
        }
        return true
    }
    private handleBusiness = (text: any, record: any, index: any) => {
        this.props.history.push({
            pathname: `/approveDetail/${record.called}`,
            state: {
                record, detailTitle: this.props.listTitle
            }
        })
    }
    private handleNoDisturb = (text: any, record: any, index: any) => {
        this.props.history.push({
            pathname: `/approvedDetail/${record.serialNum}`,
            state: {
                record, detailTitle: this.props.listTitle
            }
        })
    }

    render() {
        const { listTitle } = this.props
        let column: any[]
        if (listTitle === "businessResult") {
            column = this.businessColumns
        } else {
            column = this.noDisturbColumns
        }
        return (
            <div>
                <Table
                    dataSource={this.state.data}
                    columns={column}
                    bordered={true}
                    pagination={false}
                >
                </Table>
                <div>
                    <Pagination
                        current={this.state.current}
                        total={this.state.total}
                        pageSize={10}
                        onChange={this.pageSearch}
                    />
                </div>
            </div>
        )
    }
}