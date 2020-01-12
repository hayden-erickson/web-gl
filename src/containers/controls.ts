import {connect} from 'react-redux';
import {ReduxState, ReduxAction} from 'store/reducer';
import Controls from 'components/radon/controls';
import {getRow} from 'components/radon/utils';

import {setRayCount, invertBeams, toggleRecording} from 'store/radon/actions';

const mapState = (state: ReduxState) => {
  const h = getRow(state.radon.beamBox, 1)[1];
  const maxRayCount = Math.ceil(Math.log2(h));

  return {
    numRays: state.radon.rays,
    inverted: state.radon.inverted,
    recording: state.radon.recording,
    rayCount: Math.pow(2, Math.floor(state.radon.rays)),
    maxRayCount,
    reconstructing: state.radon.reconstructing,
  };
};

const mapDispatch = (dispatch: (action: ReduxAction) => void) => ({
  setRayCount: (n: number) => dispatch(setRayCount(n)),
  invertBeams: () => dispatch(invertBeams()),
  toggleRecording: () => dispatch(toggleRecording()),
  invert: () => dispatch(invertBeams()),
});

export default connect(mapState, mapDispatch)(Controls);
