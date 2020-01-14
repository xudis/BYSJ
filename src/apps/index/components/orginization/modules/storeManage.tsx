import React, { Component } from "react"
import Ajax from "../../../../../chushi/art-ajax"
import { Button, Table, Pagination, Switch, Modal } from "antd"
export interface IProps {
    storeManageOpen: boolean,
    storeManageInit: {
        cmccolChnlId?: string | number,
        provChnlId?: string | number,
        physclStoreNm?: string | number,
        areaName?: string | number
    },
    toggleOpen: Function
}
export interface IState {
    storeParam: {
        cmccolChnlId?: string | number,
        limit: number,
        start: number
    },
    visible: boolean,
    page: number,
    total?: number,
    data: Array<{}>,
    searchParams: Object
}
interface IBean {
    total?: number
}
interface IBeans {
}
export default class StoreManage extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)
        this.state = {
            data: [],
            total: 0,
            visible: false,
            searchParams: props.storeManageInit,
            page: 1,
            storeParam: {
                cmccolChnlId: props.storeManageInit.cmccolChnlId,
                limit: 10,
                start: 0
            }
        }
    }
    private columns = [
        {
            title: "头像",
            datdaIndex: "headAddress",
            render: (text: any, record: any) => {
                if (record.headAddress) {
                    return <img src={text} />
                } else {
                    return <img src={text} />
                }
            }
        }, {
            title: "厅店员工姓名",
            dataIndex: "prsnName"
        }, {
            title: "手机号",
            dataIndex: "prsnTelnum"
        }, {
            title: "状态",
            dataIndex: "stsCd",
            render: (text: any) => { return text == "1" ? "启用" : "禁用" }

        }, {
            title: "操作（更改状态）",
            dataIndex: "operate",
            render: (_text: any, record: any, index: any) => (
                <span>
                    <Switch checked={record.staCd == "1" ? true : false} onClick={() => { this.changeState(record, index) }} />
                </span>
            )
        }
    ]
    public changeState = (record: any, _index: any) => {
        const status = record.stsCd == "0" ? "1" : "0"
        let statusData = {
            stsCd: status,
            id: record.id
        }
        Ajax.post<IBean, IBeans>("/storeStsCd/update", statusData, {}).then(() => {
            this.getListContent()
        }).catch(() => { })
    }
    public handleClose = () => {
        this.props.toggleOpen()
    }
    public handleSubmit = () => {
        this.props.toggleOpen()

    }
    public pageSearch = (page: number) => {
        this.setState({
            storeParam: {
                ...this.state.storeParam,
                start: (page - 1) * this.state.storeParam.limit
            },
            page: page
        }, () => {
            this.getListContent()
        })
    }
    public getListContent = () => {
        const { storeParam } = this.state
        Ajax.post<IBean, IBeans>("/staffList/query", storeParam).then(({ data }) => {
            this.setState({
                data: data.beans,
                total: data.bean.total
            })
        }).catch(() => { })
    }
    public componentDidMount = () => {
        this.getListContent()
    }
    render() {
        return (
            <Modal
                visible={this.state.visible}
                style={{ width: "1100px", height: "550px" }}
                onCancel={this.handleClose}
                onOk={this.handleSubmit}
                title="门店管理"
            >
                <div>
                    <div className="organization-wrap store-manage-wrap">
                        <div className="qd-inner">
                            <div className="common-title">
                                <p className="code">{this.props.storeManageInit.provChnlId}</p>
                                <h3 className="storeNm">{this.props.storeManageInit.physclStoreNm}</h3>
                                <p className="address">
                                    {this.props.storeManageInit.areaName}
                                </p>
                            </div>
                            <Table
                                dataSource={this.state.data}
                                columns={this.columns}
                                bordered={true}
                                pagination={false}
                            >
                            </Table>

                            <div className="mt-10">
                                <Pagination
                                    total={this.state.total}
                                    onChange={this.pageSearch}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}
