import React, { Component, Fragment } from "react"
import Ajax from '../../../../chushi/art-ajax'
import { Carousel, Pagination, Modal } from "antd"
import { DateRange } from "./modules/datePicker"
import { Project_List } from "./modules/project_list"
export interface IState {
    saveData: Array<{}>,
    dataLists: Array<{}>,
    total: number,
    page: number,
    openFlag: boolean,
    searchData: {
        beginData: string,
        endData: string,
        campaignName: string,
        start: number,
        limit: number
    }
}
export interface IProps {
    dataLists: Array<{}>,
    history: any
}
export default class Data_center extends Component<IProps, IState>{
    startValue: null
    endValue: null
    constructor(props: IProps) {
        super(props)
        this.startValue = null
        this.endValue = null
        this.state = {
            saveData: [],
            dataLists: [],
            total: 0,
            page: 1,
            openFlag: false,
            searchData: {
                beginData: '',
                endData: "",
                campaignName: "",
                start: 0,
                limit: 10
            }
        }

    }
    public handleClose = () => {
        this.setState({
            openFlag: false
        })
    }
    /**
     * handleSunbmit
     */
    public handleSunbmit = () => {
        this.handleClose()
    }
    public search = () => {
        Ajax.post('./task/getTaskList', this.state.searchData).then(({ data }: { data: any }) => {
            this.setState({
                dataLists: data.beans,
                total: data.bean.total,
            })
        }).catch(() => { })
        const params = {
            bearMode: "01"
        }
        Ajax.post('/trainManager/selectBannerList', params, {}).then(({ data }: { data: any }) => {
            this.setState({
                saveData: data.beans
            })
        }).catch(() => { })
    }

    public searchTerm = () => {
        this.setState({
            searchData: { ...this.state.searchData, start: 0 }
        }, () => {
            Ajax.post('./task/getTaskList', this.state.searchData).then(({ data }: { data: any }) => {
                this.setState({
                    dataLists: data.beans,
                    total: data.bean.total,
                    page: 1
                })
            }).catch(() => { })
        })
    }
    public openCourse = (item: any) => {
        if (item.courseId == "10085") {
            this.setState({
                openFlag: true
            })
        } else {
            if (item.toPlatfrom == "易培训平台" && item.contentType == "内部课程") {
                Ajax.post("/trainYPX/toYPX", { id: item.courseId }).then(({ data }: { data: any }) => {
                    window.open(data.bean.courseUrl, "_blank")
                }).catch(() => { })
            } else {
                const url = item.courseAddr

                window.open(url, "_blank")
            }
        }
    }
    /**
     * timeChange 
    */
    public timeChange = (option: any) => {
        let timeChoose = { beginDate: "", endDate: "" }
        timeChoose.beginDate = option.startValue
        timeChoose.endDate = option.endValue
        this.setState({
            searchData: { ...this.state.searchData, ...timeChoose }
        }, () => {
            this.search()
        })
    }
    /**
     *  inputName
e:any     */
    public inputName = (e: any) => {
        const newName = e.currentTarget.value
        this.setState({
            searchData: { ...this.state.searchData, campaignName: newName }
        })
    }
    /**
     * pageSearch
     */
    public pageSearch = (page: number) => {
        this.setState({
            page: page,
            searchData: {
                ...this.state.searchData,
                start: (page - 1) * this.state.searchData.limit
            }
        }, () => {
            this.search()
        })
    }
    /**
     * componentD
     */
    public componentDidMount = () => {
        this.search()
    }
    render() {
        const btn: any = {
            location: "middle",
            content: "关闭",
            size: "large",
            onClick: () => { }
        }
        return (
            <div>
                <Carousel>
                    {
                        this.state.saveData.map((item: any, index: any) => {
                            if (item.imageAddress) {
                                return (
                                    <li key={index}><img src={item.imageAddress} style={{ width: "1920px", height: "300px" }} onClick={() => { this.openCourse(item) }} />></li>
                                )
                            }
                        })
                    }
                </Carousel>
                <div>
                    <div className="qd-inner">
                        <h2 className="my-project mt-10 clearfix"> 我的项目({this.state.total})</h2>
                        <ul className="clearfix margin-top_20">
                            <DateRange
                                startValue={this.startValue}
                                endValue={this.endValue}
                                timeChange={this.timeChange.bind(this)}
                            />
                            <li>
                                <span>
                                    <input className="search" type="text" onChange={this.inputName} />
                                    <em className='iconfont icon-search' onClick={this.searchTerm}></em>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <Project_List
                        dataLists={this.state.dataLists}
                        history={this.props.history}
                    />
                    <Pagination
                        total={this.state.total}
                        pageSize={10}
                        current={this.state.page}
                        onChange={this.pageSearch}
                    />
                </div>
                <Modal
                    width={850}
                    mask={this.state.openFlag}
                    onCancel={this.handleClose}
                    onOk={this.handleSunbmit}
                    title="介绍详情"
                >
                    <div>
                        在线公司的常客维系平台是为了进一步治理“野呼”，面向社会渠道开发的“常客外呼平台，系统整合数据管理，渠道管理，任务管理，质量管理，绩效考评五大模块，融合了在线公司互联网营销中台资源，是一套适用于实体渠道的常客维系营销工具。具体介绍如下：<br />
                        数据管理：结合省公司大数据筛选常、潜客户，并关联常客线上轨迹，分析线上行为数据，形成目标样本，并融入‘用户数据脱敏’‘外呼时段与频次管理’‘特殊名单’等一系列机制。<br />
                        渠道管理：可以实现多维度渠道信息管理，网格管理；提供厅店资质及员工素质接入审核。<br />
                        任务管理：采用任务定向指派机制，可以将任务指派至厅店、网格。兼具执行监控，动态调整机制<br />
                        质量管理：协同智能语音质检和人工质检实现健康度管理。<br />
                        绩效考评：继承在线直播能力，提升点元业务能力及考试测评。<br />
                        渠道常客维系平台配置标准化 的不熟流程，提供轻量化的H5和小程序应用：省移动统一管理并推荐渠道常客维系平台适配实体渠道厅店；<br />在线公司提供部署、培训、存储、维护、迭代等系统支撑；提供任务管理、质量管理、投诉管理、报表监控等服务支撑；闲下实体渠道在移动终端安装应用。整个过程上线快速、支撑强大、操作便捷。
                    </div>
                </Modal>
            </div>

        )
    }
}