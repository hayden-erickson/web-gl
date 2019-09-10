import {MutationState, MutationAction, MutationActionType} from './types';

const initialState: MutationState = {
  rotation: [0, 0, 0],
  translation: [0, 0, 0],
  scale: [1, 1, 1],
};

export default function reducer(
  state = initialState,
  action: MutationAction,
): MutationState {
  if (action === undefined) return state;

  switch (action.type) {
    case MutationActionType.ROTATE:
      return {...state, rotation: action.payload};
    case MutationActionType.TRANSLATE:
      return {...state, translation: action.payload};
    case MutationActionType.SCALE:
      return {...state, scale: action.payload};
    default:
      return state;
  }
}
