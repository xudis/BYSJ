import React, { Component } from "react"
import Ajax from "../../../../../chushi/art-ajax"
import { Select } from "antd"
import { IBean } from "../../../common/common"



export interface IProps {
    onChange: Function,
    value: string,
    record: any
}
export interface IState {
    dataSourse: IData[],
    data: any,
    courseId: string
}
export interface IData {
    title: string,
    value: string
}


export default class SelectSearch extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            dataSourse: [],
            data: [],
            courseId: ''
        }
        this.onSearch = debounce(this.onSearch, 300).bind(this)
    }
    static defaultProps = {
        onChange: () => { },
        value: ""
    }

    private filterFn = (input: any, option: any) => {
        return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    private onSearch = (value: string) => {
        if (value) {
            Ajax.get<IBean, IData>(`/trainManager/queryCourseDetailByName`, { courseName: value }, {}).then(({ data }) => {
                // this.setState({
                //     dataSourse: [].concat([],
                //         data.beans.map((item: any) => {
                //             return {
                //                 title: item.courseNm,
                //                 value: item.courseNm
                //             }
                //         })),
                //     data: data.beans
                // })
            }).catch(() => { })
        } else {
            this.setState({
                dataSourse: []
            })
        }
    }
    public handleChange = (value: string) => {
        this.state.data.map((v: any) => {
            if (v.courseNm == value) {
                this.props.record.courseId = v.courseId;
            }
        })
        this.props.onChange(value, this.state.courseId)
    }
    public render() {
        return (
            <Select
                notFoundContent=""
                showSearch
                style={{ width: 200 }}
                showArrow={false}
                placeholder="请输入关键字"
                value={this.props.value}
                onSearch={this.onSearch}
                onChange={this.handleChange}
                filterOption={this.filterFn}
            >
                {
                    this.state.dataSourse.map((value: any) => {
                        return (
                            <Select.Option value={value}>{value}</Select.Option>
                        )
                    })
                }
            </Select>
        )
    }
}

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate  true为立即执行，false为非立即执行
 * 
 */
function debounce(func: Function, wait: number) {
    let timeout: any | null
    return function (...args: any[]) {
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            // func.apply(this, args)
        }, wait)
    }
}