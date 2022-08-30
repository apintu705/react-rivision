
import {createStore, combineReducers} from "redux"

import {signupreducer} from "../redux/signup/reducer"

export const rootreducer= combineReducers({
    signup:signupreducer
})

export const store = createStore(rootreducer)