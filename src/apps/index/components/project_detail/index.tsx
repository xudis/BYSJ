import React, { Component } from "react"
import Ajax from "../../../../chushi/art-ajax"



export interface IProps {

}
export interface IState {

}

export default class Home extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {

        }
    }
    public render() {
        return (
            <div>开发者</div>
        )
    }
}