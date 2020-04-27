import { editorUserId } from "./actions"
import { heheReducer } from "./reducer"
import { IUserStates } from "./types"

export let reducers = {
    hehe: heheReducer
}
export const actions = {
    User: { editorUserId }
}
export interface IStoreStates {
    User: IUserStates
}