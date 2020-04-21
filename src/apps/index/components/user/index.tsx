import React, { Component } from "react"
import Ajax from "../../../../chushi/art-ajax"
import "antd/dist/antd.scss"
import { Select, Upload, message, Modal } from "antd"
import { Link } from "react-router-dom"
const { Option } = Select;
export interface IProps {
    record: object,
    changeCharactor: any,
    charcator: any,
    history: any
}
export interface IState {
    num: any[],
    data: any,
    Juris: any[],
    storeManageOpen: boolean,
    propleModalOpen: boolean,
    searchParams: any,
    imgInfo: string,
    option: any,
    date: string,
    connectNum: number,
    callNum: number
}
export interface IBeans {

}
export interface IBean {

}
export default class Personal extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)
        this.state = {
            num: [],
            data: [],
            Juris: [],
            storeManageOpen: false,
            propleModalOpen: false,
            searchParams: {
                phone: 15332321312
            },
            imgInfo: "",
            option: {
                baseUrl: "/ngcfcmnet/api/OSSFile/insertUserImage/uploadImg",
                dataType: "json",
                succMark: { "returnCode": "0" },
                accept: ".jpg,.bmp,.png",
                param: {
                    file: "",
                    phone: 1123457
                },
                beforeChoose: (json: any) => {
                    if (this.state.imgInfo) {
                        message.warning("只能添加一张图片", 0.5)
                        return false
                    }
                },
                uploadRemove: (json: any) => {
                    this.setState({
                        imgInfo: ""
                    })
                },
                uploadSuccess: (json: any) => {
                    if (json.bean.url) {
                        message.success("上传成功")
                    } else {
                        message.error("上传失败")
                    }
                },
                uploadError: (json: any) => {
                    if (json.returnCode = "-9999") {
                        this.setState({
                            imgInfo: "error"
                        })
                        message.error("上传失败")
                        return false
                    }
                },
                beforeUpload: (file: any) => {
                    if (!/.(|jpg|png|bmp)$/.test(file.name)) {
                        message.warning("图片格式不正确", 0.5)
                    }
                }
            },
            date: "",
            connectNum: 5,
            callNum: 0
        }
    }
    public search = () => {
        Ajax.post("/staddAdminInfo/getStaffAdminInfo").then(({ data }: { data: any }) => {
            this.setState({
                data: data.beans[0],
                imgInfo: data.bean.imgUrl,
                Juris: data.bean.userRole,
                option: {
                    ...this.state.option,
                    param: {
                        file: "",
                        phone: data.beans[0].prsnTelnums
                    }
                }
            })
        }).catch(() => { })
    }

    public toggleCharactor = (val: any) => {
        Ajax.post("/login/updateRoleCode", { roleCode: val }).then(() => {
            this.props.changeCharactor(val);
            this.search()
        }).catch(() => { })
        this.forceUpdate()
    }

    public toggleOpen = () => {
        this.setState({
            propleModalOpen: true
        })
    }
    public propleModalClose = () => {
        this.setState({
            propleModalOpen: false
        })
    }
    public propleModalSubmit = () => {
        this.setState({
            propleModalOpen: false
        })
    }
    render() {
        let defaultImg = ""
        let { prsnName, hallName, provName, prsnTelNum, cityName, distrtName, gridName } = this.state.data
        let Juris: any = {
            1: "厅店店员",
            2: "厅店店长",
            3: "项目管理员"
        }
        const list = [{
            uid: this.state.imgInfo,
            name: this.state.imgInfo,
            status: "done",
            size: 2048,
            url: this.state.imgInfo
        }]
        const options = [
            {
                value: "雨花店",
                title: "雨花店"
            }, {
                value: "雨花客厅店",
                title: "雨花客厅店"
            }
        ]
        return (
            <div>
                <div>
                    <div className="qd-inner">
                        <div className="project-box qd-box clearfix mt-10 personal">
                            <dl className="clearfix personalcenter fn-left">
                                <dt className="fnleft">
                                    <img src={this.state.imgInfo ? this.state.imgInfo : defaultImg} onClick={this.toggleOpen} />
                                </dt>
                                <dd>
                                    <p><b>{prsnName}</b><span>{prsnTelNum}</span></p>
                                    <p>{provName}{cityName}{distrtName}{gridName}{hallName}</p>
                                </dd>
                            </dl>
                            <div className="fn-right personal-btnjuese">
                                <Select
                                    style={{ width: 300 }}
                                    disabled={true}
                                    defaultValue={Juris[this.props.charcator]}
                                    onChange={this.toggleCharactor}
                                >
                                    {
                                        this.state.Juris.map((hall, index) => {
                                            return (
                                                <Option>{hall.value}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                        </div>
                        {
                            (() => {
                                if (this.props.charcator == 1 || this.props.charcator == 2) {
                                    return (
                                        <div className="personaltubiao">
                                            <ul className="clearfix">
                                                <li>
                                                    <Link to={{ pathname: "/user/resultChan" }}>
                                                        <p>
                                                            <label className="fuwu fn-left"></label>
                                                            <span>业务结果修改</span>
                                                        </p>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={{ pathname: "/user/serRecoveryS" }}>
                                                        <p>
                                                            <label className="fuwu fn-left"></label>
                                                            <span>服务补救</span>
                                                        </p>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                } else if (this.props.charcator === 3) {
                                    return (
                                        <div className="personaltubiao">
                                            <ul className="clearfix">
                                                <li>
                                                    <Link to={{ pathname: "/user/modifyLog" }}>
                                                        <p>
                                                            <label className="fuwu fn-left"></label>
                                                            <span style={{ cursor: "pointer" }}>业务结果修改日志</span>
                                                        </p>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={{ pathname: "/user/serRecovery" }}>
                                                        <p>
                                                            <label className="fuwu fn-left"></label>
                                                            <span style={{ cursor: "pointer" }}>服务补救</span>
                                                        </p>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }
                            })()
                        }

                        {
                            this.state.propleModalOpen ?
                                <Modal
                                    title="头像修改"
                                    style={{ width: "550px", height: "300" }}
                                    visible={this.state.propleModalOpen}
                                    onCancel={this.propleModalClose}
                                    onOk={this.propleModalSubmit}
                                >
                                    <div>
                                        <span style={{ color: "#f8525f", margin: "30px" }}>支持jpg、png、bmp格式的图片，文件不可超过2M。</span><br />
                                        <Upload
                                            action={this.state.option.baseUrl}
                                            accept={this.state.option.accept}
                                            beforeUpload={this.state.option.beforeUpload}
                                            data={this.state.option}
                                            style={{ margin: "30px" }}
                                            defaultFileList={this.state.imgInfo ? list : []}
                                        ></Upload>
                                    </div>
                                </Modal> : ""
                        }
                    </div>
                </div>
            </div>
        )
    }
}