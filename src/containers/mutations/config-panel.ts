import {connect} from 'react-redux';
import {ConfigPanels} from 'components/mutations/config-panels';
import {MutationAction, Vec3} from 'store/mutations/types';
import {ReduxState} from 'store/reducer'
import {translate, rotate, scale} from 'store/mutations/actions'

function mapStateToProps(state: ReduxState) {
  return state.mutations;
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
  mapDispatchToProps
)(ConfigPanels);
