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
    page: number,
    total: number,
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
    render() {
        return (
            <Modal >

            </Modal>
        )
    }
}
