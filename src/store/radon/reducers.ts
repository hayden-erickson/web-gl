import {add, Matrix, matrix} from 'mathjs';
import {combineReducers} from 'redux';
import {
  boxAction,
  rayAction,
  UPDATE_BOX,
  UPDATE_BEAM_BOX,
  INC_RAYS,
  DEC_RAYS,
} from 'store/radon/actions';

const initialBoxState = matrix([[0, 0, 0], [20, 40, 10], [0, 0, 0]]);

const box = (state: Matrix | undefined, action: boxAction) => {
  if (state === undefined) return initialBoxState;
  return action.type === UPDATE_BOX
    ? (add(action.payload, state) as Matrix)
    : state;
};

const rays = (state: number | undefined, action: rayAction) => {
  if (state === undefined) return 1;

  switch (action.type) {
    case INC_RAYS:
      return state + 1;
    case DEC_RAYS:
      const dec = state - 1;
      return dec >= 0 ? dec : 0;
    default:
      return state;
  }
};

const initialBeamBoxState = matrix([
  [-100, 0, 0],
  [200, 200, 4],
  [0, Math.PI / 2, 0],
]);

const beamBox = (state: Matrix | undefined, action: boxAction) => {
  if (state === undefined) return initialBeamBoxState;
  return action.type === UPDATE_BEAM_BOX
    ? (add(action.payload, state) as Matrix)
    : state;
};

const radon = combineReducers({
  beamBox,
  box,
  rays,
});

export default radon;
export type radonState = ReturnType<typeof radon>;
