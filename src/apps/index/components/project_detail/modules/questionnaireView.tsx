import React, { Component } from "react"
export interface IProps {
    imgUrl: string
}
export interface IState {

}

export default class name extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {

        }
    }
    public render() {
        return (
            <div>
                {
                    <iframe src={this.props.imgUrl} style={{ width: "100%", height: "400px" }} ></iframe>
                }
            </div>
        )
    }
}