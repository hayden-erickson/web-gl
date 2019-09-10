import {WebGLState, WebGLAction, WebGLActionType} from 'store/webgl/types'

var initialState: WebGLState = {
    context: undefined,
};

export default function reducer(
    state = initialState,
    action: WebGLAction
): WebGLState {
    if (action === undefined ) {
        return state;
    }

    switch(action.type) {
        case WebGLActionType.SET_CONTEXT:
            return {context: action.payload};
        default:
            return state;
    }
}