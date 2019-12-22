import {Matrix} from 'mathjs';

export const UPDATE_BOX = 'UPDATE_BOX';
export const UPDATE_BEAM_BOX = 'UPDATE_BEAM_BOX';
export const INC_RAYS = 'INC_RAYS';
export const DEC_RAYS = 'DEC_RAYS';

export interface rayAction {
  type: typeof INC_RAYS | typeof DEC_RAYS;
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

export const incRays = (): rayAction => ({
  type: INC_RAYS,
});

export const decRays = (): rayAction => ({
  type: DEC_RAYS,
});
