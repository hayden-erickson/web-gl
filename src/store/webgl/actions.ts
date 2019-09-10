import {WebGLActionType, SetWebGLContextAction} from 'store/webgl/types'

export function setContext(gl: WebGLRenderingContext): SetWebGLContextAction {
    return {
        type: WebGLActionType.SET_CONTEXT,
        payload: gl,
    };
}