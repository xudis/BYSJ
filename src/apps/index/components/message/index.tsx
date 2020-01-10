import React, { Component, Fragment } from "react"
import Ajax from '../../../../chushi/art-ajax'
import { Link } from 'react-router-dom'
import { Pagination } from "antd"

export interface IState {
    messagelists: Array<{}>,
    rightContent: string,
    clientHeight: number,
    details: {},
    hasMore: boolean,
    messageCount: string,
    total: number,
    searchParams: {
        start: number,
        limit: number
    }
}
export interface IProps {
    history: {
        go: Function
    }
}
export interface IBean {
    count: string
}
export interface IBeans {

}
export default class Data_center extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)
        this.state = {
            messagelists: [],
            rightContent: '',
            clientHeight: 0,
            details: {},
            hasMore: true,
            messageCount: "0",
            total: 0,
            searchParams: {
                start: 0,
                limit: 10
            }
        }
    }
    render() {
        return (
            <div>
                <div className="qd-inner">
                    <div className='common-title'>
                        <h3>
                            <Link to={{ pathname: "/home" }}>
                                <i className='iconfont icon-left'></i>
                                <span className="badge">消息中心</span>
                            </Link>
                        </h3>
                    </div>
                    <div className="qd-box messagecenter">
                        <p className="count">
                            共<span>{this.state.messageCount}</span>
                            <span className="ml-10">未读</span>
                        </p>
                        <div className="clearfix neirong">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}