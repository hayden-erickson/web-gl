import {MutationActionType, MutationAction, Vec3} from 'store/projections/types';
import { add, subtract, divide, multiply } from 'mathjs'

interface mutationFunc {
  (v: Vec3 | null): MutationAction;
}

function mutation(t: MutationActionType): mutationFunc {
  return function(v: Vec3 | null): MutationAction {
    return {
      type: t,
      payload: v,
    };
  };
}

export const rotate = mutation(MutationActionType.ROTATE);
export const translate = mutation(MutationActionType.TRANSLATE);
export const scale = mutation(MutationActionType.SCALE);
export const modifyScale = mutation(MutationActionType.MODIFY_SCALE);
export const modifyRotation = mutation(MutationActionType.MODIFY_ROTATION);
export const setAnchor = mutation(MutationActionType.SET_ANCHOR)
export const setOriginalRotation = mutation(MutationActionType.SET_ORIGINAL_ROTATION)
export const setRotationDelta = mutation(MutationActionType.SET_ROTATION_DELTA)

export function beginDrag(anchor: Vec3, originalRotation: Vec3) {
  return (dispatch: (a: MutationAction) => {}) => {
    dispatch(setAnchor(anchor))
    dispatch(setOriginalRotation(originalRotation))
  }
}

export function endDrag(originalRotation: Vec3, rotationDelta: Vec3) {
  return (dispatch: (a: MutationAction) => {}) => {
    var rotation = add(originalRotation, rotationDelta).valueOf() as Vec3
    dispatch(rotate(rotation))
    dispatch(setAnchor(null))
    dispatch(setOriginalRotation(null))
  }
}

export function calculateRotation(anchor: Vec3, mouse: Vec3, originalRotation: Vec3) {
  return (dispatch: (a: MutationAction) => {}) => {
    const diff = subtract(anchor, mouse)
    const normal = divide(diff, 500)
    const dTheta = multiply(normal, Math.PI).valueOf() as Vec3
    const rotationDelta = [dTheta[1], dTheta[0], 0] as Vec3;
    dispatch(setRotationDelta(rotationDelta))
    const rotation = add(originalRotation, rotationDelta)
    dispatch(rotate(rotation.valueOf() as Vec3))
  }
}
