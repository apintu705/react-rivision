import {createStore,applyMiddleware,compose,combineReducers} from "redux";
import thunk from 'redux-thunk';
import {adminreducer} from "./reducer"

const rootreducer= combineReducers({
    admin:adminreducer,
 })


export const store = createStore(rootreducer,compose(applyMiddleware(thunk)))


