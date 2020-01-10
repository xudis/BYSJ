import { IComponent } from "../../../typing/interfaces"
import React, { Component } from 'react'
export default function asyncComponent(importComponent: IComponent) {
    return class AsyncComponent extends Component<any, any>{
        constructor(props: any) {
            super(props)
            this.state = {
                component: null
            }
        }
        public componentDidMount() {
            importComponent().then(({ default: component }) => {
                this.setState({
                    component: component
                })
            }).catch((err) => {

            })
        }
        public render() {
            const C = this.state.component
            return C ? <C{...this.props} /> : null
        }
    }
}