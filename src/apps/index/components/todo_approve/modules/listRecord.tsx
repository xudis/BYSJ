import React, { Component } from "react"
import { Table, Pagination } from "antd"

export interface IProps {
    history: {
        push: Function
    },
    listTitle: string,
    data: any,
    total: string,
    pageSearch: Function,
    current: any
}
export interface IState {

}
export interface IBeans {

}
export interface IBean {

}
export default class ListRecord extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)
        this.state = {
        }
    }
    private businessColumns = [
        {
            title: "通话流水号",
            dataIndex: "callId",
            render: (text: any, record: any, index: any) => {
                <span>
                    <a onClick={() => { this.handleBusiness(text, record, index) }}>{record.callId}</a>
                </span>
            }
        }, {
            title: "修改申请提交时间",
            dataIndex: "mktgRsltModfTime",
        }, {
            title: "申请类型",
            dataIndex: "modfType",
        }, {
            title: "申请人",
            dataIndex: "applStaffName",
        }, {
            title: "申请前结果",
            dataIndex: "oldMktgRslt",
        }, {
            title: "申请后结果",
            dataIndex: "newMktgRslt",
        }]
    private noDisturbColumns = [
        {
            title: "通话流水号",
            dataIndex: "callId",
            render: (text: any, record: any, index: any) => {
                <span>
                    <a onClick={() => { this.handleNoDisturb(text, record, index) }}>{record.callId}</a>
                </span>
            }
        }, {
            title: "修改申请提交时间",
            dataIndex: "mktgRsltModfTime",
        }, {
            title: "申请类型",
            dataIndex: "modfType",
        }, {
            title: "申请人",
            dataIndex: "applStaffName",
        }, {
            title: "申请前结果",
            dataIndex: "oldDnd",
        }, {
            title: "申请后结果",
            dataIndex: "newDnd",
        }]

    private handleBusiness = (text: any, record: any, index: any) => {
        this.props.history.push({
            pathname: `/todoApprove/approvedDetail/${record.callId}`,
            state: {
                record, detailTitle: this.props.listTitle
            }
        })
    }
    private handleNoDisturb = (text: any, record: any, index: any) => {
        this.props.history.push({
            pathname: `/todoApprove/approvedDetail/${record.callId}`,
            state: {
                record, detailTitle: this.props.listTitle
            }
        })
    }
    render() {
        const {
            listTitle,
            data,
            total,
            pageSearch,
            current
        } = this.props
        let column: any[]

        if (listTitle === "businessResult") {
            column = this.businessColumns
        } else {
            column = this.noDisturbColumns
        }
        return (
            <div>
                <Table
                    dataSource={data}
                    columns={column}
                    bordered={true}
                    pagination={false}
                >
                </Table>
                <div>
                    <Pagination
                        current={current}
                        total={Number(total)}
                        pageSize={10}
                        onChange={(page) => { pageSearch }}
                    />
                </div>
            </div>
        )
    }
}