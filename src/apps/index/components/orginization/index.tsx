import React, { Component } from "react"
import Ajax from "../../../../chushi/art-ajax"
import { Button, Table, Select, Pagination, Input, Switch } from "antd"
import StoreManage from "./modules/storeManage"
export interface IProps {
    total: number,
    storeManageOpen: boolean,
    storeManageInit: {
        cmccolChnlId: string | number,
        provChnlId: string | number,
        physclStoreNm: string | number,
        areaName: string | number
    },
    toggleOpen?: Function
}
export interface IState {
    provinceValue: string,
    cityValue: string,
    distrtValue: string,
    saveData: object,
    Address: Array<{}>,
    data: Array<{}>,
    total: number,
    belgProvCode: Iselect[],
    belgCityCode: Iselect[],
    belgDistrtCode: Iselect[],
    page: number,
    searchParams: {
        belgProvCode: string,
        belgCityCode: string,
        belgDistrtCode: string,
        // girdNm: string,
        physclStoreNm: string,
        limit: number,
        start?: number
    },
    storeManageOpen: boolean,
    storeManageInit: {
        cmccolChnlId?: string | number,
        provChnlId?: string | number,
        physclStoreNm?: string | number,
        areaName?: string | number
    }
}
export interface Iselect {
    value: string,
    title: string
}
interface IBean {
    total: number
}
interface IBeans {
    provMap: Iselect[],
    cityMap: Iselect[],
    distrtMap: Iselect[]
}
const { Option } = Select;
export default class Organization extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            provinceValue: "请选择省份",
            cityValue: "请选择城市",
            distrtValue: "请选择区县",
            saveData: {},
            Address: [],
            data: [],
            total: 0,
            //省份初始数据
            belgProvCode: [],
            //市初始数据
            belgCityCode: [],
            //县区初始数据
            belgDistrtCode: [],
            page: 1,
            searchParams: {
                belgProvCode: "",//省份编码
                belgCityCode: "",//市区编码
                belgDistrtCode: "",//区县编码
                // girdNm: "",//网格名称
                physclStoreNm: "",//门店名称
                limit: 10,//每页显示条数
                start: 0//初始查询页码
            },
            storeManageOpen: false,
            storeManageInit: {}
        }
    }

    //-------------表格-----------
    private columns = [
        {
            title: "省渠道编号",
            dataIndex: "provChnlId"
        }, {
            title: "厅店名称",
            dataIndex: "physclStoreNm"
        }, {
            title: "厅店负责人姓名",
            dataIndex: "prsnName"
        }, {
            title: "厅店负责人手机号",
            dataIndex: "prsnPhone"
        }, {
            title: "店员数量",
            dataIndex: "staffNum"
        }, {
            title: "地址",
            dataIndex: "address",
            width: 160
        }, {
            title: "状态",
            dataIndex: "status",
            render: (text: any, record: any, index: any) => (
                <span>
                    {record.status == '1' ? "启用" : "禁用"}
                    <Switch checked={record.status == "1" ? true : false} onClick={() => { this.changeState(text, record, index) }} />
                    &nbsp;&nbsp;
                </span>
            )
        }, {
            title: "操作",
            render: (record: any) => {
                if (record.status == "2") {
                    return (
                        <span>
                            <a href="javascript:;" style={{ color: "gray" }}>门店管理</a>
                        </span>
                    )
                } else {
                    return (
                        <span>
                            <a href="javascript:;" onClick={() => { this.toggleOpen(record) }}>门店管理</a>
                        </span>
                    )
                }
            }
        }
    ]

    //置空操作
    public makeNull = () => {
        const { provinceValue, cityValue } = this.state
        if (provinceValue == "请选择省份") {
            this.setState({
                cityValue: "请选择城市",
                distrtValue: "请选择区县"
            })
        }
        if (cityValue == "请选择城市") {
            this.setState({
                distrtValue: "请选择区县"
            })
        }
    }

    //------------下拉选项--------------------
    //省份选择事件
    public changeProv = (address: any) => {
        if (address == undefined) {
            this.setState({
                provinceValue: "请选择省份",
                Address: [],
                belgCityCode: [],
                belgDistrtCode: [],
                searchParams: { ...this.state.searchParams, belgProvCode: "", belgCityCode: "", belgDistrtCode: "" }
            }, () => {
                this.makeNull()
            })
        } else {
            this.setState({
                provinceValue: address,
                searchParams: { ...this.state.searchParams, belgProvCode: address }
            }, () => {
                let superRegnCode = {
                    superRegnCode: this.state.searchParams.belgProvCode
                }
                //加载过省份
                Ajax.post<IBean, IBeans>("/area/queryInfoByPhone", this.state.searchParams, {}).then(({ data }) => {
                    //省级管理员初始未携带市县，通过点击省份，走一下步骤
                    if (data.beans[0].cityMap) {
                        Ajax.post<IBean, IBeans>("/area/queryInfoBySc", superRegnCode, {}).then(({ data }) => {
                            this.setState({
                                Address: data.beans,
                                belgCityCode: data.beans[0].cityMap
                            })
                        })
                    } else {
                        //市级管理员可以管辖多个市，故初始情况下返回数据包含省份与市区
                        this.setState({
                            Address: data.beans,
                            belgCityCode: data.beans[0].cityMap
                        })
                    }
                }).catch(() => { })
            })
        }
    }

    //市区选择事件
    public changeCity = (address: any) => {
        if (address == undefined) {
            this.setState({
                cityValue: "请选择城市",
                Address: [],
                belgDistrtCode: [],
                searchParams: { ...this.state.searchParams, belgCityCode: "", belgDistrtCode: "" }
            }, () => {
                this.makeNull()
            })
        } else {
            this.setState({
                cityValue: address,
                searchParams: { ...this.state.searchParams, belgCityCode: address, belgDistrtCode: "" }
            }, () => {
                let superRegnCode = {
                    superRegnCode: this.state.searchParams.belgCityCode
                }
                //加载过省份
                Ajax.post<IBean, IBeans>("/area/queryInfoByPhone", this.state.searchParams, {}).then(({ data }) => {
                    //省级管理员初始未携带市县，通过点击省份，走一下步骤
                    if (data.beans[0].distrtMap) {
                        Ajax.post<IBean, IBeans>("/area/queryInfoBySc", superRegnCode, {}).then(({ data }) => {
                            this.setState({
                                Address: data.beans,
                                belgDistrtCode: data.beans[0].distrtMap
                            })
                        })
                    } else {
                        //市级管理员可以管辖多个市，故初始情况下返回数据包含省份与市区
                        this.setState({
                            Address: data.beans,
                            belgDistrtCode: data.beans[0].distrtMap
                        })
                    }
                }).catch(() => { })
            })
        }
    }

    //县区选择事件
    public changeDistrt = (address: any) => {
        this.setState({
            distrtValue: address,
            searchParams: { ...this.state.searchParams, belgDistrtCode: address }
        })
    }

    //获取输入框中厅店名称
    public storeNmChange = (e: any) => {
        const physclStoreNm = e.currentTarget.value
        this.setState({
            searchParams: { ...this.state.searchParams, physclStoreNm: physclStoreNm }
        })
    }

    //门店管理弹窗操作
    public toggleOpen = (record: any) => {
        this.setState({
            storeManageOpen: !this.state.storeManageOpen,
            storeManageInit: {
                ...record,
                ...{
                    belgProvCode: this.state.belgProvCode,
                    belgCityCode: this.state.searchParams.belgCityCode,
                    belgDistrtCod: this.state.searchParams.belgDistrtCode
                }
            },
            saveData: record
        })
    }

    //状态变更操作
    public changeState = (_text: any, record: any, _index: any) => {
        const status = record.status == "2" ? "1" : "2"
        let statusData = {
            validStsCd: status,
            cmccolChnlId: record.cmccolChnlId
        }
        Ajax.post<IBean, IBeans>("/storeStsCd/update", statusData, {}).then(() => {
            this.search()
        }).catch(() => { })
    }

    //------------列表更新查询----------------
    //接口查询列表数据
    public search = () => {
        Ajax.post<IBean, IBeans>("/storeList/queryStore", this.state.searchParams, {}).then(({ data }) => {
            return this.setState({
                data: data.beans,
                total: data.bean.total
            })
        })
    }

    //条件查询
    public searchTerm = () => {
        this.setState({
            searchParams: { ...this.state.searchParams, start: 0 }
        }, () => {
            Ajax.post<IBean, IBeans>("/storeList/queryStore", this.state.searchParams, {}).then(({ data }) => {
                return this.setState({
                    data: data.beans,
                    total: data.bean.total,
                    page: 1
                })
            })
        })
    }

    //点击分页器更新列表数据
    public pageSearch = (page: number) => {
        this.setState({
            page: page,
            searchParams: {
                ...this.state.searchParams,
                start: (page - 1) - this.state.searchParams.limit
            }
        }, () => {
            this.search()
        })
    }
    //初始加载省份
    public province = () => {
        Ajax.post<IBean, IBeans>("/area/queryInfoByPhone", this.state.searchParams, {}).then(({ data }) => {
            this.setState({
                Address: data.beans,
                belgProvCode: data.beans[0].provMap
            })
        })
    }
    //生命周期初始加载
    public componentDidMount = () => {
        this.search()
        this.province()
    }

    public render() {
        return (
            <div> <div className="organization-wrap">
                <div className="qd-inner">
                    <div className="common-title">
                        <h3 className="data-center-h3">
                            <span>组织管理</span>
                        </h3>
                    </div>
                    <div className="organziation-search-wrap">
                        <Select
                            allowClear
                            dropdownStyle={{ width: 200, marginRight: 60 }}
                            onChange={this.changeProv}
                            value={this.state.provinceValue}
                        >
                            {
                                this.state.belgProvCode.map((prov, index) => {
                                    return (
                                        <Option>{prov.value}</Option>
                                    )
                                })
                            }
                        </Select>
                        <Select
                            allowClear
                            dropdownStyle={{ width: 200, marginRight: 60 }}
                            notFoundContent="请先选择上一级"
                            onChange={this.changeCity}
                            value={this.state.cityValue}
                        >
                            {
                                this.state.belgCityCode.map((city, index) => {
                                    return (
                                        <Option>{city.value}</Option>
                                    )
                                })
                            }
                        </Select>
                        <Select
                            allowClear
                            dropdownStyle={{ width: 200, marginRight: 60 }}
                            notFoundContent="请先选择上一级"
                            onChange={this.changeDistrt}
                            value={this.state.distrtValue}
                        >
                            {
                                this.state.belgDistrtCode.map((distrt, index) => {
                                    return (
                                        <Option>{distrt.value}</Option>
                                    )
                                })
                            }
                        </Select>
                        {/* <Input className="art-input" onChange={this.gridNmChange} style={{ width: "200px", border: "1px solid #ccc ", height: "30px", marginRight: 15, display: "none" }} placeholder="请输入网格名称" /> */}
                        <Input className="art-input" onChange={this.storeNmChange} style={{ width: "200px", border: "1px solid #ccc ", height: "30px", marginRight: 15 }} placeholder="请输入厅店名称" />
                        <Button type="primary" onClick={this.searchTerm}>查询</Button>
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
                            current={this.state.page}
                            total={this.state.total}
                            onChange={this.pageSearch}
                        />
                    </div>
                </div>
            </div>
                {/*   门店管理弹窗组件配置 */}
                {
                    this.state.storeManageOpen ?
                        <StoreManage
                            storeManageOpen={this.state.storeManageOpen}
                            storeManageInit={this.state.storeManageInit}
                            toggleOpen={this.toggleOpen}
                        /> : null
                }
            </div >
        )
    }
}

// rowKey={record => record.cmccolChnlId}