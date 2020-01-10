import {connect} from 'react-redux';
import {matrix} from 'mathjs';
import {ReduxState} from 'store/reducer';
import {
  updateBox,
  updateBeamBox,
  setRayCount,
  RadonAction,
  invertBeams,
  saveOpacity,
  toggleRecording,
} from 'store/radon/actions';
import RadonScene from 'components/radon/scene';

const rotateZ = (theta: number) =>
  matrix([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, theta],
  ]);

const mapState = (state: ReduxState) => ({
  box: state.radon.box,
  beamBox: state.radon.beamBox,
  numRays: state.radon.rays,
  inverted: state.radon.inverted,
  recording: state.radon.recording,
  opacities: state.radon.opacities,
  theta: state.radon.maxTheta / state.radon.opacities.length,
  numAngles: state.radon.opacities.length,
  cyclesPerSec: state.radon.cyclesPerSec,
});

const mapDispatch = (dispatch: (action: RadonAction) => void) => ({
  rotateBox: (theta: number) => dispatch(updateBox(rotateZ(theta))),
  rotateBeamBox: (theta: number) => dispatch(updateBeamBox(rotateZ(theta))),
  setRayCount: (n: number) => dispatch(setRayCount(n)),
  invertBeams: () => dispatch(invertBeams()),
  saveOpacity: (o: number[]) => dispatch(saveOpacity(o)),
  toggleRecording: () => dispatch(toggleRecording()),
});

export default connect(mapState, mapDispatch)(RadonScene);
