import {connect} from 'react-redux';

import {ReduxState, ReduxAction} from 'store/reducer';
import {setFilter} from 'store/radon/actions';
import Inverse from 'components/radon/inverse';

const mapState = (state: ReduxState) => ({
  bbox: state.beamBox,
  opacities: state.opacities,
  maxTheta: state.maxTheta,
  reconstruction: state.reconstruction,
  filter: state.filter,
});

const mapDispatch = (dispatch: (action: ReduxAction) => void) => ({
  setFilter: (v: boolean) => dispatch(setFilter(v)),
});

export default connect(mapState, mapDispatch)(Inverse);
