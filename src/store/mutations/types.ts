export type Vec3 = [number, number, number];
export type Mat3 = [Vec3, Vec3, Vec3]

export interface MutationState {
  rotation: Vec3;
  translation: Vec3;
  scale: Vec3;
}

export enum MutationActionType {
  ROTATE = 'ROTATE',
  TRANSLATE = 'TRANSLATE',
  SCALE = 'SCALE',
}

export interface MutationAction {
  type: MutationActionType;
  payload: Vec3;
}
