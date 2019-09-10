import {MutationActionType, MutationAction, Vec3} from './types';

interface mutationFunc {
  (v: Vec3): MutationAction;
}

function mutation(t: MutationActionType): mutationFunc {
  return function(v: Vec3): MutationAction {
    return {
      type: t,
      payload: v,
    };
  };
}

export const rotate = mutation(MutationActionType.ROTATE);
export const translate = mutation(MutationActionType.TRANSLATE);
export const scale = mutation(MutationActionType.SCALE);
