import React, { Component } from "react"
import Ajax from "../../../../../chushi/art-ajax"
import { Upload, Modal, message } from "antd"



export interface IProps {
    record: any,
    open: boolean,
    handleClose: Function
}
export interface IState {

}

export default class ImgUpload extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {

        }
    }
    public beforeChoose = (record: { imageAddress: string }, list: [{ url: string }]) => {
        if (record.imageAddress || list[0].url) {
            message.warning("只能添加一张图片", 0.5)
            return false
        }
    }
    public uploadRemove = (record: { imageAddress: string }, list: [{ url: string }]) => {
        record.imageAddress = ""
        list[0].url = ""
    }
    public uploadSuccess = (record: any, list: [{ url: string }], json: any) => {
        if (json.bean.url) {
            message.success("上传成功")
            record.imageAddress = json.bean.url

            list[0].url = json.bean.url
        } else {
            message.error("上传失败")
            list[0].url = "error"
        }
    }
    public uploadError = (list: [{ url: string }]) => {
        message.error("上传失败")
        list[0].url = "error"
    }
    public beforeUpload = (file: any) => {
        if (!/.(|jpg|png|bmp)$/.test(file.name)) {
            message.warning("图片格式不正确", 0.5)
        }
    }
    public render() {
        const list: any = [{
            uid: this.props.record.id,
            name: this.props.record.imageAddress,
            status: 'done',
            size: 2048,
            url: this.props.record.imageAddress
        }]
        const option = {
            baseUrl: "/ngcfcmnet/api/trainManager/uploadImg",
            dataType: "json",
            succMark: { "returnCode": "0" },
            accept: ".jpg,.bmp,.png",
            param: {
                file: ""
            },
            beforeChoose: this.beforeChoose.bind(this, this.props.record, list),
            uploadRemove: this.uploadRemove.bind(this, this.props.record, list),
            uploadSuccess: (json: any) => { this.uploadSuccess(this.props.record, list, json) },
            uploadError: this.uploadError.bind(this, list),
            beforeUpload: (file: any) => { this.beforeUpload(file) }
        }
        return (
            <Modal
                mask={this.props.open}
                visible={this.props.open}
                style={{ width: 550, height: 250 }}
                onOk={this.props.handleClose()}
                onCancel={this.props.handleClose()}
                keyboard={true}
                title="修改图片"
            >
                <div style={{ width: 200 }}>
                    {/* <Upload option={option} defaultFileList={this.props.record.imageAddress ? list : []} /> */}
                    <Upload defaultFileList={this.props.record.imageAddress ? list : []} />

                </div>
            </Modal>
        )
    }
}