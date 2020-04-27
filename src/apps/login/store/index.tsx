import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import thunk from "redux-thunk"
import { reducers } from "./combine"

const reducer = combineReducers(reducers)
const storeFun = (initState: any) => {
    let store
    store = createStore(
        reducer,
        initState
    )
    return store
}
export default storeFun