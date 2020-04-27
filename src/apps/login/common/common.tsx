import React, { Component } from "react"
import { Link } from "react-router-dom"
import Ajax from "../../../chushi/art-ajax"

interface IProps {
    location: any
};

export default class Header extends Component<IProps> {
    constructor(props: IProps) {
        super(props)

    }

    public render() {
        const pathname = this.props.location
        return (
            <div>
                <div className=" qd -header">
                    <div className="qd- inner clearfix">
                        <img className="head-logo" src="" alt="" />
                        <h1 className="head-text" >常客维系平台</h1>
                        <ul className="head-nav clearfix">
                            <li className={/^\/home/.test(pathname) ? "active" : ' '}>
                                <Link to=' /home' >我的项目</Link>
                            </li>
                            <li className={/^\/data/.test(pathname) ? "active" : ""}>
                                <Link to={{ pathname: "/data" }}>数据中心</Link>
                            </li>
                            <li className={/^\/organization/.test(pathname) ? "active" : ' '}>                                < Link to={{ pathname: ' /organization' }}>组织管理</Link>
                            </li>
                            <li className={/^\/user/.test(pathname) ? "active" : ' '}>
                                < Link to={{ pathname: '/user' }}>个人中心</Link>
                            </li>
                        </ul >
                        <ul className="head-user">
                            <li>
                                <Link to={{ pathname: "/message" }}>
                                    <i className="iconfont ion-tishi"></i>
                                    <span className="badge">12</span>
                                </Link>
                            </li>
                        </ul>
                    </div >
                </div>
                {this.props.children}
                <div className="qd-foot mt-10">

                </div>
            </div>
        )
    }
}