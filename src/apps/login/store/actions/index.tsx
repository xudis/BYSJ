import * as constants from "../contants"
export function editorUserId(id: string) {
    return {
        type: constants.EDITORUSERID,
        id: id
    }
}