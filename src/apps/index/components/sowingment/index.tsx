import React, { Component } from "react"
import Ajax from "../../../../chushi/art-ajax"
import { Button, message } from "antd"
import List from "./modules/list"


export interface IProps {

}
export interface IState {
    saveData: any[]
}

export default class Sowingment extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            saveData: [],
        }
    }
    public changePlatform = (valNow: any, record: object, index: number) => {
        let dataIndex = index;
        let oldObj = { ...this.state.saveData[dataIndex] };
        oldObj.toPlatform = valNow;
        let originSaceData = [...this.state.saveData]
        originSaceData.splice(dataIndex, 1, oldObj)
        this.setState({
            saveData: originSaceData
        })
    }
    public changeType = (valNow: any, record: object, index: number) => {
        let dataIndex = index;
        let oldObj = { ...this.state.saveData[dataIndex] };
        oldObj.contentType = valNow;
        let originSaceData = [...this.state.saveData]
        originSaceData.splice(dataIndex, 1, oldObj)
        this.setState({
            saveData: originSaceData
        })
    }
    public changeMode = (valNow: any, record: object, index: number) => {
        let dataIndex = index;
        let oldObj = { ...this.state.saveData[dataIndex] };
        oldObj.bearMode = valNow;
        let originSaceData = [...this.state.saveData]
        originSaceData.splice(dataIndex, 1, oldObj)
        this.setState({
            saveData: originSaceData
        })
    }

    private handleSelectChange = (value: any, courseId: string, dataIndex: number, record: any) => {
        if (value === "") {
            return
        }
        this.setState({
            saveData: this.state.saveData.map((v: any, index: any) => {
                if (index == dataIndex) {
                    return Object.assign({}, v, { courseName: value })
                }
                return v
            })
        })
        record.courseName = value
        record.courseId = courseId
    }
    public contentTypeChange = (e: any, dataIndex: number, record: any) => {
        let oldObj = { ...this.state.saveData[dataIndex] };
        oldObj.bearMode = e.target.value;
        let originSaceData = [...this.state.saveData]
        originSaceData.splice(dataIndex, 1, oldObj)
        this.setState({
            saveData: originSaceData
        })
        record.courseName = e.target.value
    }
    public save = () => {
        let a;
        this.state.saveData.map((v: any, i: any) => {
            if (v.contnetType == "内部课程") {
                if (!v.toPlatfron || !v.contentTypr || !v.imageAddress || !v.bearMode || !v.courseName) {
                    a = 1;
                }
            } else {
                if (!v.toPlatfron || !v.contentTypr || !v.imageAddress || !v.bearMode || !v.courseAddr) {
                    a = 1
                }
            }
        })
        if (a !== 1) {
            let saveDataParamDaraString = JSON.stringify(this.state.saveData)
            Ajax.post("/trainManager/updataCourseDetail", { resultList: saveDataParamDaraString }, {}).then(({ data }) => {
                if (data.returnCode == 0) {
                    message.success("保存成功", 0.3)
                    this.search()
                } else {
                    message.error("保存失败", 0.3)
                }
            }).catch(() => {
                message.error("保存失败", 0.3)
            })
        } else {
            message.warning("请填写完整信息！", 0.3)
        }
    }
    public addSowingment = () => {
        const arr = [...this.state.saveData]
        if (arr.length < 5) {
            arr.push({
                avalFlag: "",
                bearMode: "",
                contenType: "内部课程",
                courseAddr: "",
                courseId: "",
                courseName: "",
                crtAppSysId: "",
                crtTime: "",
                crtUserId: "",
                imageAddress: "",
                id: "",
                modfTime: "",
                modfUserId: "",
                orderno: "",
                toPlatform: "培训平台"
            })
            this.setState({
                saveData: arr
            })
        } else {
            message.warning("最多只能添加五条", 0.3)
        }
    }
    public moveUp = (index: number) => {
        const newArr = [...this.state.saveData]
        let orderno = newArr[index].orderno
        let temp = newArr[index]
        if (index !== 0) {
            newArr[index].orderno = newArr[index - 1].orderno
            newArr[index - 1].orderno = orderno
            newArr[index] = newArr[index - 1]
            newArr[index - 1] = temp
            this.setState({
                saveData: newArr
            })
        } else {
            message.warning("已经是第一条", 0.3)
        }
    }
    public moveDown = (index: number) => {
        const newArr = [...this.state.saveData]
        let orderno = newArr[index].orderno
        let temp = newArr[index]
        if (index !== newArr.length - 1) {
            newArr[index].orderno = newArr[index + 1].orderno
            newArr[index + 1].orderno = orderno
            newArr[index] = newArr[index + 1]
            newArr[index + 1] = temp
            this.setState({
                saveData: newArr
            })
        } else {
            message.warning("已经是最后一条", 0.3)
        }
    }
    public deletePlatform = (record: { id: string }, index: number) => {
        const newArr = [...this.state.saveData]
        let id = record.id.toString()
        let param = { "id": id }
        if (id) {
            Ajax.post("/trainManager/deleteCourseById", param).then(({ }) => {
                newArr.splice(index, 1)
                this.setState({
                    saveData: newArr
                }, () => {
                    message.success("删除成功！", 0.3)
                })
            }).catch(() => {
                message.error("删除失败！", 0.3)

            })
        } else {
            newArr.splice(index, 1)
            this.setState({
                saveData: newArr
            }, () => {
                message.success("删除成功！", 0.3)
            })
        }
    }
    public search = () => {
        Ajax.post("/trainManager/selectBannerList", {}).then(({ data }) => {
            this.setState({
                saveData: data.beans
            })
        }).catch(() => { })
    }
    public componentDidMount = () => {
        this.search()
    }
    public render() {
        return (
            <div>
                <div className="qd-inner pt-10">
                    <div className="organization-search-wrap">
                        <span style={{ color: "#f8525f" }}>
                            说明：
                        </span>
                        <span style={{ color: "#f8525f" }}>
                            PC端图片规格：1920*480像素的高清图片，支持jpg、png、bmp格式的图片，文件不可超过2M。
                        </span>
                    </div>
                    <div style={{ background: "#fff" }}>
                        <List
                            data={this.state.saveData}
                            changePlatform={this.changePlatform}
                            changeMode={this.changeMode}
                            changeType={this.changeType}
                            deletePlatform={this.deletePlatform}
                            handleSelectChange={this.handleSelectChange}
                            contentTypeChange={this.contentTypeChange}
                            moveDown={this.moveDown}
                            moveUp={this.moveUp}
                        />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <Button type="primary" onClick={this.addSowingment}>添加</Button>
                        <Button type="primary" onClick={this.save}>保存</Button>
                    </div>
                </div>
            </div>
        )
    }
}