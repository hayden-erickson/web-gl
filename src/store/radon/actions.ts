import {Matrix} from 'mathjs';

export const UPDATE_BOX = 'UPDATE_BOX';
export const UPDATE_BEAM_BOX = 'UPDATE_BEAM_BOX';
export const SET_RAY_COUNT = 'SET_RAY_COUNT';

export interface rayAction {
  type: typeof SET_RAY_COUNT;
  payload: number;
}

export interface boxAction {
  type: typeof UPDATE_BOX | typeof UPDATE_BEAM_BOX;
  payload: Matrix;
}

export type RadonAction = boxAction | rayAction;

const boxUpdate = (t: typeof UPDATE_BOX | typeof UPDATE_BEAM_BOX) => (
  x: Matrix,
) => ({
  type: t,
  payload: x,
});

export const updateBox = boxUpdate(UPDATE_BOX);
export const updateBeamBox = boxUpdate(UPDATE_BEAM_BOX);

export const setRayCount = (n: number): rayAction => ({
  type: SET_RAY_COUNT,
  payload: n,
});
