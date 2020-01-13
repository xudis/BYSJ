import React, { Component, Fragment } from "react"
import Ajax from '../../../../chushi/art-ajax'
import { Link } from 'react-router-dom'
import { Pagination } from "antd"
import MessageList from "./modules/messageList"
import RightContent from "./modules/rightContent"
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
    public componentDidMount = () => {
    }
    public backClick = () => {
        this.props.history.go(-1)
    }
    public showDetail = (item: {}) => {
        this.setState({
            details: item
        })
    }
    public listSearch = () => {
        Ajax.post("/message/getMsgList", this.state.searchParams).then(({ data }: { data: any }) => {
            this.setState({
                messagelists: data.beans,
                total: data.bean.total
            })
        }).catch(() => { })
    }
    public pageSearch = (page: number) => {
        this.setState({
            searchParams: {
                ...this.state.searchParams,
                start: (page - 1) * this.state.searchParams.limit
            }
        }, () => { this.listSearch() })
    }
    public messageQuery = () => {
        Ajax.post<IBean, IBeans>("/message/getUnReadMsgCount").then(({ data }: { data: any }) => {
            this.setState({
                messageCount: data.bean.count
            })
        }).catch(() => { })
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
                            <MessageList
                                history={this.props.history}
                                showDetail={this.showDetail}
                                listMessage={this.state.messagelists}
                                searchParamsParam={this.state.searchParams} >
                            </MessageList>
                            <RightContent details={this.state.details}></RightContent>
                        </div>
                        <Pagination
                            total={this.state.total}
                            onChange={this.pageSearch}
                        />
                    </div>
                </div>
            </div>
        )
    }
}