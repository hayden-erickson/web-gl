import {Matrix} from 'mathjs';

// action types

export const UPDATE_BOX = 'UPDATE_BOX';
export const UPDATE_BEAM_BOX = 'UPDATE_BEAM_BOX';
export const SET_RAY_COUNT = 'SET_RAY_COUNT';
export const INVERT_BEAMS = 'INVERT_BEAMS';
export const TOGGLE_RECORDING = 'TOGGLE_RECORDING';
export const TOGGLE_RECONSTRUCTING = 'TOGGLE_RECONSTRUCTING';
export const SAVE_OPACITY = 'SAVE_OPACITY';
export const CLEAR_OPACITIES = 'CLEAR_OPACITIES';

// action shapes

export interface rayAction {
  type: typeof SET_RAY_COUNT;
  payload: number;
}

export interface boxAction {
  type: typeof UPDATE_BOX | typeof UPDATE_BEAM_BOX;
  payload: Matrix;
}

export interface invertBeamsAction {
  type: typeof INVERT_BEAMS;
}

export interface toggleRecordingAction {
  type: typeof TOGGLE_RECORDING;
}

export interface toggleReconstructingAction {
  type: typeof TOGGLE_RECONSTRUCTING;
}

export interface saveOpacityAction {
  type: typeof SAVE_OPACITY;
  payload: number[];
}

export interface clearOpacitiesAction {
  type: typeof CLEAR_OPACITIES;
}

export type RadonAction =
  | boxAction
  | rayAction
  | invertBeamsAction
  | toggleRecordingAction
  | toggleReconstructingAction
  | saveOpacityAction
  | clearOpacitiesAction;

const boxUpdate = (t: typeof UPDATE_BOX | typeof UPDATE_BEAM_BOX) => (
  x: Matrix,
) => ({
  type: t,
  payload: x,
});

// action creators

export const updateBox = boxUpdate(UPDATE_BOX);
export const updateBeamBox = boxUpdate(UPDATE_BEAM_BOX);

export const setRayCount = (n: number): rayAction => ({
  type: SET_RAY_COUNT,
  payload: n,
});

export const invertBeams = (): invertBeamsAction => ({type: INVERT_BEAMS});

export const saveOpacity = (payload: number[]): saveOpacityAction => ({
  type: SAVE_OPACITY,
  payload,
});

export const clearOpacities = (): clearOpacitiesAction => ({
  type: CLEAR_OPACITIES,
});

export const toggleRecording = (): toggleRecordingAction => ({
  type: TOGGLE_RECORDING,
});

export const toggleReconstructing = (): toggleReconstructingAction => ({
  type: TOGGLE_RECONSTRUCTING,
});
