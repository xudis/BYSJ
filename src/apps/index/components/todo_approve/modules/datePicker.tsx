import React, { Component } from 'react'
import { DatePicker } from 'antd'
import Moment from "moment"
import moment from "moment"

export interface IProps {
    startValue: any,
    endValue: any,
    search: Function

}
export interface IState {
    startValue: any,
    endValue: any,
    endOpen: boolean
}
export class DateRange extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            startValue: this.props.startValue,
            endValue: this.props.endValue,
            endOpen: false
        }
    }
    /**
     * disabledStartDate=
    startValue:any */
    public disabledStartDate = (startValue: any) => {
        const endValue = this.state.endValue
        if (!startValue || !endValue) {
            return false
        }
        return startValue.valueOf() > endValue.valueOf()
    }
    public disabledEndtDate = (endValue: any) => {
        const startValue = this.state.startValue
        if (!startValue || !endValue) {
            return false
        }
        return endValue.valueOf() <= startValue.valueOf()
    }
    public onChange = (field: string | any | number | symbol, value: any) => {
        // this.setState({
        //     [field]: value
        // })
        console.log("aaa")
    }
    public onStartChange = (value: any) => {
        // if (value === null) {
        //     this.setState({
        //         startValue: value
        //     }, () => {
        //         this.props.timeChange({
        //             startValue: '',
        //             endValue: this.state.endValue ? this.state.endValue.format("YYYY-MM-DD HH:mm:ss") : ''
        //         })
        //     })
        // }
        this.onChange('startValue', value)
    }

    public handleStartOpenChange = (_open: boolean) => {
        return;
    }

    public onEndChange = (value: any) => {
        // if (value === null) {
        //     this.setState({
        //         startValue: value
        //     }, () => {
        //         this.props.timeChange({
        //             startValue: this.state.startValue ? this.state.startValue.format("YYYY-MM-DD HH:mm:ss") : '',
        //             endValue: ''
        //         })
        //     })
        // }
        this.onChange('endValue', value)

    }

    public handleEndOpenChange = (open: boolean) => {
        this.setState({ endOpen: open })
    }

    public render() {
        const { startValue, endValue, endOpen } = this.state
        return (
            <div>
                <li>
                    <label >开始时间：</label>
                    <span>
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            showToday={false}
                            placeholder="Start"
                            onChange={this.onStartChange}
                            onOpenChange={this.handleStartOpenChange}
                            onOk={() => {
                                this.props.search(
                                    {
                                        startValue: this.state.startValue,
                                        endValue: this.state.endValue
                                    }
                                )
                            }}
                        />
                    </span>
                </li>
                <li>
                    <label >结束时间：</label>
                    <span>
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            showToday={false}
                            placeholder="Start"
                            onChange={this.onEndChange}
                            onOpenChange={this.handleEndOpenChange}
                            onOk={() => {
                                this.props.search(
                                    {
                                        startValue: this.state.startValue,
                                        endValue: this.state.endValue
                                    }
                                )
                            }}
                        />
                    </span>
                </li>
            </div>
        )
    }
}