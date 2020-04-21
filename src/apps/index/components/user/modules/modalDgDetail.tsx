import React, { Component } from "react"
export interface IProps {
    modalHref: string
}
export interface IState {
    block: string,
    width: string
}

export default class EditDetail extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            block: "block",
            width: "50%"
        }
    }
    public render() {
        let modalHref = this.props.modalHref
        let urlAll = modalHref.split(",")
        let oldQuestionNaireUrl = urlAll[0]
        let newQuestionNaireUrl = urlAll[1]
        if (newQuestionNaireUrl == "") {
            this.setState({
                block: "none",
                width: "100%"
            })
        }
        return (

            <div>
                <div>
                    {
                        <iframe src={oldQuestionNaireUrl} style={{ width: this.state.width, height: "500px" }}></iframe>
                    }
                </div>
                <div style={{ display: this.state.block }}>
                    {
                        <iframe src={newQuestionNaireUrl} style={{ width: "50%", height: "500px" }}></iframe>
                    }
                </div>
            </div>
        )
    }
}