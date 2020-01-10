import React, { Component } from 'react'
import { getFileItem } from 'antd/lib/upload/utils'
export interface IProps {
    dataLists: Array<{}>,
    history: {
        push: Function
    }
}
export interface IState {
}
export class Project_List extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

    }

    /**
     * toDetail
     */
    public toDetail = (_e: any, item: any) => {
        this.props.history.push({
            pathname: `/home/detail/${item.campaignId}`,
            state: {
                itemDetails: item
            }
        })
    }

    public render() {
        let listItem = []
        const datalists = this.props.dataLists
        if (datalists.length && datalists.length !== 0) {
            listItem = datalists.map((item: any, index: any) => {
                switch (item.state) {
                    case "04":
                        item.state = "执行中"
                        break;
                    case "05":
                        item.state = "已暂停"
                }
                switch (item.identifyType) {
                    case "0":
                        item.identifyType = "无认证"
                        break;
                    case "2":
                        item.identifyType = "密码验证"
                        break;
                    case "3":
                        item.identifyType = "随机密码验证"
                        break;
                    case "4":
                        item.identifyType = "按一号键确认"
                        break;
                }
                return (
                    <div onClick={(e) => { this.toDetail(e, item) }} id={item.campaignId} key={item.campaignName} className="project-box qd-box clearfix mt-10 cursor">
                        <div className="box-left-inner">
                            <h3>
                                <b>{item.campaignName}</b>
                                <span className="qd-tag tag-blue">{item.state}</span>
                                <span className="qd-tag tag-blue">{item.identifyType}</span>

                            </h3>
                            <p className="project-time">{item.beginDate}至{item.endDate}</p>
                            <p className="project-des">
                                <span dangerouslySetInnerHTML={{ __html: String(item.actvIntroduce).replace(/(&lt;br&gt;|&lt;p&gt)+/g, '') }}></span>
                            </p>
                        </div>
                    </div>
                )
            })
        } else if (datalists.length && datalists.length == 0) {
            listItem.push(
                <div className="project-tip" key="0">
                    <p><span className="iconfont icon-gantanhao"></span>抱歉，没有匹配到您搜索到项目，以为您匹配相关项目：</p>
                </div>
            )
        }
        return (
            <div>
                {listItem}
            </div>
        )
    }
}