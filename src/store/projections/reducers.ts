import {
  MutationState,
  MutationAction,
  MutationActionType,
} from 'store/projections/types';
import {Vec3} from 'store/types';
import {add} from 'mathjs';
import {combineReducers} from 'redux';

function payloadSetter(t: MutationActionType) {
  return function(state: Vec3 | undefined | null, action: MutationAction) {
    if (state === undefined) return null;
    if (action.type !== t) return state;
    return action.payload;
  };
}

const anchor = payloadSetter(MutationActionType.SET_ANCHOR);
const originalRotation = payloadSetter(
  MutationActionType.SET_ORIGINAL_ROTATION,
);
const rotationDelta = payloadSetter(MutationActionType.SET_ROTATION_DELTA);

function translation(
  translation: Vec3 = [0, 0, 0],
  action: MutationAction,
): Vec3 {
  if (action.type !== MutationActionType.TRANSLATE) return translation;

  if (action.payload === null) return translation;

  return action.payload;
}

function scale(scale: Vec3 = [1, 1, 1], action: MutationAction) {
  if (!action.payload) return scale;

  switch (action.type) {
    case MutationActionType.SCALE:
      return action.payload;
    case MutationActionType.MODIFY_SCALE:
      return add(scale, action.payload).valueOf() as Vec3;
    default:
      return scale;
  }
}

function rotation(rotation: Vec3 = [0, 0, 0], action: MutationAction) {
  if (!action.payload) return rotation;

  switch (action.type) {
    case MutationActionType.ROTATE:
      return action.payload;
    case MutationActionType.MODIFY_ROTATION:
      return add(rotation, action.payload).valueOf() as Vec3;
    default:
      return rotation;
  }
}

export default combineReducers<MutationState, MutationAction>({
  rotation,
  translation,
  scale,
  anchor,
  originalRotation,
  rotationDelta,
});
