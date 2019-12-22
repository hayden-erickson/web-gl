import webgl from 'store/webgl/reducers';
import {WebGLAction} from 'store/webgl/types';
import projections from 'store/projections/reducers';
import radon from 'store/radon/reducers';
import {RadonAction} from 'store/radon/actions';
import {MutationAction} from 'store/projections/types';
import {combineReducers} from 'redux';

const reducer = combineReducers({
  webgl,
  projections,
  radon,
});

export type ReduxState = ReturnType<typeof reducer>;
export type ReduxAction = WebGLAction | MutationAction | RadonAction;
export default reducer;
