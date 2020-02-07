import {connect} from 'react-redux';
import {ReduxState, ReduxAction} from 'store/reducer';
import Controls from 'components/radon/controls';
import {getRow} from 'components/radon/utils';

import {
  setRayCount,
  invertBeams,
  toggleRecording,
  clearOpacities,
} from 'store/radon/actions';

const mapState = (state: ReduxState) => {
  const h = getRow(state.beamBox, 1)[1];
  const maxRayCount = Math.ceil(Math.log2(h));

  return {
    numRays: state.rays,
    inverted: state.inverted,
    recording: state.recording,
    rayCount: Math.pow(2, Math.floor(state.rays)),
    maxRayCount,
    opacities: state.opacities,
  };
};

const mapDispatch = (dispatch: (action: ReduxAction) => void) => ({
  setRayCount: (n: number) => dispatch(setRayCount(n)),
  invertBeams: () => dispatch(invertBeams()),
  toggleRecording: () => {
    // first clear the old recordings then save the new ones
    dispatch(clearOpacities());
    dispatch(toggleRecording());
  },
  invert: () => dispatch(invertBeams()),
});

export default connect(mapState, mapDispatch)(Controls);
