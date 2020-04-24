import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { reducers } from './combine'
const reducer = combineReducers(reducers)

//存储初始化 默认为一个对象
const storeFun = (initState: any) => {
    let store;
    if (!window) {
        store = createStore(
            reducer, initState,
        )
    } else {
        store = createStore(
            reducer, initState,
            compose(applyMiddleware(thunk))
        );
    }
    return store;
}
export default storeFun