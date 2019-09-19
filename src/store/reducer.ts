import webgl from 'store/webgl/reducers'
import {WebGLAction} from 'store/webgl/types'
import projections from 'store/projections/reducers'
import { MutationAction } from 'store/projections/types'
import { combineReducers } from 'redux';

const reducer = combineReducers({
    webgl,
    projections,
})

export type ReduxState = ReturnType<typeof reducer>
export type ReduxAction = WebGLAction | MutationAction
export default reducer