import {add, Matrix, matrix} from 'mathjs';
import {combineReducers} from 'redux';
import {
  boxAction,
  rayAction,
  UPDATE_BOX,
  UPDATE_BEAM_BOX,
  SET_RAY_COUNT,
} from 'store/radon/actions';

const initialBoxState = matrix([[0, 0, 0], [32, 16, 8], [0, 0, 0]]);

const box = (state: Matrix | undefined, action: boxAction) => {
  if (state === undefined) return initialBoxState;
  return action.type === UPDATE_BOX
    ? (add(action.payload, state) as Matrix)
    : state;
};

const rays = (state: number | undefined, action: rayAction) => {
  if (state === undefined) return 7;
  return action.type === SET_RAY_COUNT ? action.payload : state;
};

const initialBeamBoxState = matrix([[-64, 0, 0], [128, 64, 4], [0, 0, 0]]);

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
