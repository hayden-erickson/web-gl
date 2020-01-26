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
  box: state.box,
  beamBox: state.beamBox,
  numRays: state.rays,
  inverted: state.inverted,
  recording: state.recording,
  opacities: state.opacities,
  theta: state.maxTheta / state.opacities.length,
  numAngles: state.opacities.length,
});

const mapDispatch = (dispatch: (action: RadonAction) => void) => ({
  rotateBox: (theta: number) => dispatch(updateBox(rotateZ(theta))),
  saveOpacity: (o: number[]) => dispatch(saveOpacity(o)),
  endRecording: () => {
    dispatch(toggleRecording());
  },
});

export default connect(mapState, mapDispatch)(RadonScene);
