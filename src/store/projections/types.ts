import {Vec3} from 'store/types';
export interface MutationState {
  rotation: Vec3;
  translation: Vec3;
  scale: Vec3;
  rotationDelta: Vec3 | null;
  originalRotation: Vec3 | null;
  anchor: Vec3 | null;
}

export enum MutationActionType {
  ROTATE = 'ROTATE',
  TRANSLATE = 'TRANSLATE',
  SCALE = 'SCALE',
  MODIFY_SCALE = 'MODIFY_SCALE',
  MODIFY_ROTATION = 'MODIFY_ROTATION',
  SET_ANCHOR = 'SET_ANCHOR',
  SET_ORIGINAL_ROTATION = 'SET_ORIGINAL_ROTATION',
  SET_ROTATION_DELTA = 'SET_ROTATION_DELTA',
  CALC_ROT = 'CALC_ROT',
}

export interface MutationAction {
  type: MutationActionType;
  payload: Vec3 | null;
}
