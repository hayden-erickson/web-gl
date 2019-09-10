export type Mat4 = [
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
];

export interface WebGLState {
    context: WebGLRenderingContext | undefined;
}

export enum WebGLActionType {
    SET_CONTEXT = 'SET_CONTEXT'
}

export interface SetWebGLContextAction {
    type: WebGLActionType;
    payload: WebGLRenderingContext;
}

export type WebGLAction = SetWebGLContextAction