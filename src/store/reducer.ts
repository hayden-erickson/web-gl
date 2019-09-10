import webgl from 'store/webgl/reducers'
import {WebGLAction} from 'store/webgl/types'
import mutations from 'store/mutations/reducers'
import {MutationAction} from 'store/mutations/types'
import { combineReducers } from 'redux';

const reducer = combineReducers({
    webgl,
    mutations,
})

export type ReduxState = ReturnType<typeof reducer>
export type ReduxAction = WebGLAction | MutationAction
export default reducer