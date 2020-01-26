import {connect} from 'react-redux';

import {ReduxState, ReduxAction} from 'store/reducer';
import {toggleReconstructing} from 'store/radon/actions';
import Inverse from 'components/radon/inverse';

const mapState = (state: ReduxState) => ({
  bbox: state.beamBox,
  opacities: state.opacities,
  maxTheta: state.maxTheta,
  reconstructing: state.reconstructing,
});

const mapDispatch = (dispatch: (action: ReduxAction) => void) => ({
  toggleReconstructing: () => dispatch(toggleReconstructing()),
});

export default connect(mapState, mapDispatch)(Inverse);
