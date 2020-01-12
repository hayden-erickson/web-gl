import {add, Matrix, matrix} from 'mathjs';
import {combineReducers} from 'redux';
import {
  boxAction,
  rayAction,
  invertBeamsAction,
  toggleRecordingAction,
  toggleReconstructingAction,
  saveOpacityAction,
  UPDATE_BOX,
  UPDATE_BEAM_BOX,
  SET_RAY_COUNT,
  INVERT_BEAMS,
  TOGGLE_RECORDING,
  TOGGLE_RECONSTRUCTING,
  SAVE_OPACITY,
} from 'store/radon/actions';

const initialBoxState = matrix([
  [0, 0, 0],
  [32, 64, 8],
  [0, 0, 0],
]);

const box = (state: Matrix | undefined, action: boxAction) => {
  if (state === undefined) return initialBoxState;
  return action.type === UPDATE_BOX
    ? (add(action.payload, state) as Matrix)
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

const reconstructing = (
  state: boolean | undefined,
  action: toggleReconstructingAction,
) => {
  if (state === undefined) return false;

  return action.type === TOGGLE_RECONSTRUCTING ? !state : state;
};

const opacities = (
  state: number[][] | undefined,
  action: saveOpacityAction | toggleRecordingAction,
) => {
  // here we use * 4 b/c that's how many rotation values we want to capture
  // if we're starting a new recording, clear any past recordings
  if (state === undefined || action.type === TOGGLE_RECORDING) return Array(N);

  if (action.type === SAVE_OPACITY) {
    let out = Array.of(...state);
    out.unshift(action.payload);
    out.pop();
    return out;
  }

  return state;
};

const radon = combineReducers({
  beamBox,
  box,
  rays,
  inverted,
  recording,
  reconstructing,
  opacities,
  maxTheta: () => Math.PI,
  cyclesPerSec: () => 1 / 20,
});

export default radon;
export type radonState = ReturnType<typeof radon>;
