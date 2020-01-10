import * as constants from '../constans'

export function editorUserId(id: string) {
    return {
        type: constants.EDITORUSERID,
        id: id
    };
}
export function changeCharactor(type: any) {
    localStorage.setItem("USER_TYPE", type)
    return {
        type: type,
        charactor: type
    }
}