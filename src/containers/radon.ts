import {connect} from 'react-redux';
import {matrix} from 'mathjs';
import {ReduxState} from 'store/reducer';
import {
  updateBox,
  RadonAction,
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
});

const mapDispatch = (dispatch: (action: RadonAction) => void) => ({
  rotateBox: (theta: number) => dispatch(updateBox(rotateZ(theta))),
  saveOpacity: (o: number[]) => dispatch(saveOpacity(o)),
  toggleRecording: () => dispatch(toggleRecording()),
});

export default connect(mapState, mapDispatch)(RadonScene);
