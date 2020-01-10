import { changeCharactor } from './actions'
import { charactor, proviceRoleCode } from './reducers'
import { CharactorStates } from './types'

/**
 * 合并reducer
 * reducer对象的key值对应最终生成的state对象的key值
 */
export let reducers = {
    charactor: charactor,
    proviceRoleCode: proviceRoleCode
}
/**
 * action和reducer对应
 */
export const actions = {
    changeCharactor: changeCharactor
}
/**
 * 合并产生的state类型
 */
export interface IStoreStates {
    charactor: CharactorStates
}
