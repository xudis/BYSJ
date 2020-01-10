import React, { Component, Fragment } from "react"
// import Ajax from 'art-ajax'
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { actions } from "../store/combine"

export interface IProps {
    location: { pathname: string },
    charactor: string,
    changeCharactor: Function,
    proviceRoleCode: string
}
export interface IState {
    messageCount: string
}
export interface IBean {
    count: string
}
export interface IBeans {

}

class Header extends Component<IProps, IState> {
    private pathnameStr = "";
    constructor(props: IProps) {
        super(props)
        this.state = {
            messageCount: "0"
        }
        // this.messageQuery = this.messageQuery.bind(this)

    }
    // public messageQuery = () => {
    //     Ajax.post<IBean, IBeans>("jiekou").then(({ data }: any) => {
    //         this.setState({
    //             messageCount: data.bean.count
    //         })
    //     }).catch(() => { })
    // }
    public render() {
        const minHeight = (document.body.clientHeight - 150).toString() + "px"
        this.pathnameStr = this.props.location.pathname
        if (this.pathnameStr == null || this.pathnameStr == "") {
        }
        return (
            <Fragment>
                <div className="qd-header" >
                    <div className="qd-inner clearfix" >
                        <img className="head-logo" src="assets/img/logo.png" alt="" />
                        <h1 className="heat-text" > 常客维系平台 </h1>
                        < ul className="head-nav clearfix" >
                            <li className={/^\/home/.test(this.pathnameStr) ? "active" : ''}>
                                <Link to="/home" > 我的项目 </Link>
                            </li>

                            {
                                this.props.charactor == "2" ?//店长
                                    <div>
                                        <li className={/^\/todoApprovve/.test(this.pathnameStr) ? "active" : ''}>
                                            <Link to={{ pathname: "/todoApprovve" }}> 代办审批 </Link>
                                        </li>
                                    </div>
                                    : ""
                            }
                            {
                                this.props.charactor == "3" && this.props.proviceRoleCode == "1" ?//省级管理员
                                    <div>
                                        <li className={/^\/datacenter/.test(this.pathnameStr) ? "active" : ''}>
                                            <Link to={{ pathname: "/datacenter" }}> 数据中心 </Link>
                                        </li>
                                        < li className={/^\/sowingment/.test(this.pathnameStr) ? "active" : ''
                                        }>
                                            <Link to={{ pathname: "/sowingment" }}> 轮播管理 </Link>
                                        </li>
                                        < li className={/^\/organization/.test(this.pathnameStr) ? "active" : ''
                                        }>
                                            <Link to={{ pathname: "/organization" }}> 组织管理 </Link>
                                        </li>
                                    </div>
                                    : ""
                            }
                            {
                                this.props.charactor == "3" && this.props.proviceRoleCode == "2" ?//市级管理员
                                    <div>
                                        <li className={/^\/datacenter/.test(this.pathnameStr) ? "active" : ''}>
                                            <Link to={{ pathname: "/datacenter" }}> 数据中心 </Link>
                                        </li>
                                        < li className={/^\/organization/.test(this.pathnameStr) ? "active" : ''
                                        }>
                                            <Link to={{ pathname: "/organization" }}> 组织管理 </Link>
                                        </li>
                                    </div>
                                    : ""
                            }
                            {
                                this.props.charactor == "3" && this.props.proviceRoleCode == "3" ?//县级管理员
                                    <div>
                                        <li className={/^\/datacenter/.test(this.pathnameStr) ? "active" : ''}>
                                            <Link to={{ pathname: "/datacenter" }}> 数据中心 </Link>
                                        </li>
                                        < li className={/^\/organization/.test(this.pathnameStr) ? "active" : ''
                                        }>
                                            <Link to={{ pathname: "/organization" }}> 组织管理 </Link>
                                        </li>
                                    </div>
                                    : ""
                            }
                            <li className={/^\/user/.test(this.pathnameStr) ? "active" : ''}>
                                <Link to={{ pathname: "/user" }}> 个人中心 </Link>
                            </li>
                        </ul>
                        < ul className="head-user" >
                            <li>
                                <Link to={{ pathname: "/message" }}>
                                    <i className="iconfont icon-tishi" > </i>
                                    < span className="badge" > {this.state.messageCount} </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="qd-main" >
                    <div style={{ minHeight: minHeight }}>
                        {this.props.children}
                    </div>
                    < div className="qd-footer mt-10" >
                        <div className="qd-inner" > Copyright 2019 中国移动 版权所有 </div>
                    </div>
                </div>
            </Fragment >
        )
    }
}
const mapStateToProps = (state: { charactor: any, proviceRoleCode: any }) => {
    return ({
        charactor: state.charactor,
        proviceRoleCode: state.proviceRoleCode
    })
}
const mapDispatchToProps = (dispatch: Function) => {
    return {
        changeCharactor: (type: any) => dispatch(actions.changeCharactor(type))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)
