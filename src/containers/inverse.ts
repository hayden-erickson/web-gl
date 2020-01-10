import {connect} from 'react-redux';

import {ReduxState} from 'store/reducer';
import Inverse from 'components/radon/inverse';

const mapState = (state: ReduxState) => ({
  bbox: state.radon.beamBox,
  opacities: state.radon.opacities,
  maxTheta: state.radon.maxTheta,
  recording: state.radon.recording,
});
const mapDispatch = () => ({});

export default connect(mapState, mapDispatch)(Inverse);
