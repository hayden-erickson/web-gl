import {add, Matrix, matrix, index} from 'mathjs';
import {combineReducers} from 'redux';
import {
  boxAction,
  rayAction,
  invertBeamsAction,
  toggleRecordingAction,
  setReconstructionAction,
  setFilterAction,
  setDeltaVAction,
  RadonAction,
  UPDATE_BOX,
  UPDATE_BEAM_BOX,
  SET_RAY_COUNT,
  INVERT_BEAMS,
  TOGGLE_RECORDING,
  SAVE_OPACITY,
  CLEAR_OPACITIES,
  SET_RECONSTRUCTION,
  SET_FILTER,
  SET_DELTA_V,
} from 'store/radon/actions';
import {send} from 'store/radon/socket';
import {getRow} from 'components/radon/utils';

const initialBoxState = matrix([
  [0, 0, 0],
  [32, 64, 8],
  [0, 0, 0],
]);

const modAngles = (m: Matrix) => {
  const anglesIdx = index(2, [0, 1, 2]);
  let angles = m.subset(anglesIdx).map(a => a % (2 * Math.PI));
  m.subset(anglesIdx, angles);
  return m;
};

const box = (state: Matrix | undefined, action: boxAction) => {
  if (state === undefined) return initialBoxState;
  return action.type === UPDATE_BOX
    ? (modAngles(add(action.payload, state) as Matrix) as Matrix)
    : state;
};

const rays = (state: number | undefined, action: rayAction) => {
  if (state === undefined) return 0;
  return action.type === SET_RAY_COUNT ? action.payload : state;
};

// N the number of angles to measure
const N = 128;
const BB_WIDTH = 128;
const BB_HEIGHT = 128;
const initialBeamBoxState = matrix([
  [0, 0, 0],
  [BB_WIDTH, BB_HEIGHT, 4],
  [0, 0, 0],
]);

const beamBox = (state: Matrix | undefined, action: boxAction) => {
  if (state === undefined) return initialBeamBoxState;
  return action.type === UPDATE_BEAM_BOX
    ? (add(action.payload, state) as Matrix)
    : state;
};

const inverted = (state: boolean | undefined, action: invertBeamsAction) => {
  return action.type === INVERT_BEAMS ? !state : !!state;
};

const recording = (
  state: boolean | undefined,
  action: toggleRecordingAction,
) => {
  if (state === undefined) return false;

  return action.type === TOGGLE_RECORDING ? !state : state;
};

const opacities = (state: number[][] | undefined, action: RadonAction) => {
  if (state === undefined) return Array(N);

  switch (action.type) {
    case SAVE_OPACITY:
      let out = Array.of(...state);
      out.unshift(action.payload);
      out.pop();
      return out;
    case CLEAR_OPACITIES:
      return new Array(N);
    default:
      return state;
  }
};

const reconstruction = (
  state: Uint8ClampedArray[] | undefined,
  action: setReconstructionAction,
): Uint8ClampedArray[] => {
  if (state === undefined) return [];

  return action.type === SET_RECONSTRUCTION ? action.payload : state;
};

const filter = (
  state: boolean | undefined,
  action: setFilterAction,
): boolean => {
  return action.type === SET_FILTER ? action.payload : !!state;
};

const deltaV = (state: number | undefined, action: setDeltaVAction): number => {
  if (state === undefined) {
    return 0.01;
  }

  return action.type === SET_DELTA_V ? action.payload : state;
};

const radon = combineReducers({
  beamBox,
  box,
  deltaV,
  rays,
  inverted,
  recording,
  reconstruction,
  opacities,
  filter,
  maxTheta: () => Math.PI,
  cyclesPerSec: () => 1 / 20,
});

export type radonState = ReturnType<typeof radon>;

export default (state: radonState | undefined, action: RadonAction) => {
  if (state !== undefined && action.type === SAVE_OPACITY) {
    send({
      theta: getRow(state.box, 2)[2],
      total: state.opacities.length,
      sino_row: action.payload,
      filter: state.filter,
    });
  }

  return radon(state, action);
};
