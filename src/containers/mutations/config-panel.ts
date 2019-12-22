import {connect} from 'react-redux';
import {ConfigPanels} from 'components/mutations/config-panels';
import {MutationAction} from 'store/projections/types';
import {Vec3} from 'store/types';
import {ReduxState} from 'store/reducer';
import {translate, rotate, scale} from 'store/projections/actions';

function mapStateToProps(state: ReduxState) {
  var {rotation, translation, scale} = state.projections;
  return {rotation, translation, scale};
}

function mapDispatchToProps(dispatch: (action: MutationAction) => void) {
  return {
    onTranslate: (v: Vec3) => dispatch(translate(v)),
    onRotate: (v: Vec3) => dispatch(rotate(v)),
    onScale: (v: Vec3) => dispatch(scale(v)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfigPanels);
