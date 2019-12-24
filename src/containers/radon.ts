import {connect} from 'react-redux';
import {matrix} from 'mathjs';
import {ReduxState} from 'store/reducer';
import {
  updateBox,
  updateBeamBox,
  setRayCount,
  RadonAction,
} from 'store/radon/actions';
import RadonScene from 'components/radon/scene';

const rotateX = (theta: number) =>
  matrix([[0, 0, 0], [0, 0, 0], [theta, 0, 0]]);

const mapState = (state: ReduxState) => ({
  box: state.radon.box,
  beamBox: state.radon.beamBox,
  numRays: state.radon.rays,
});

const mapDispatch = (dispatch: (action: RadonAction) => void) => ({
  rotateBox: (theta: number) => dispatch(updateBox(rotateX(theta))),
  rotateBeamBox: (theta: number) => dispatch(updateBeamBox(rotateX(theta))),
  setRayCount: (n: number) => dispatch(setRayCount(n)),
});

export default connect(
  mapState,
  mapDispatch,
)(RadonScene);
