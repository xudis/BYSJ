import React, { Component } from "react"
export interface IProps {
    modalHref: string
}
export interface IState {

}

export default class EditDetail extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
    }
    public render() {
        return (
            <div>
                {
                    <iframe src={this.props.modalHref} style={{ width: "100%", height: "500px" }}></iframe>
                }
            </div>
        )
    }
}