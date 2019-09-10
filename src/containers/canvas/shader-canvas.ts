import {connect} from 'react-redux';
import {ShaderCanvas} from 'components/canvas/canvas';
import {ReduxState} from 'store/reducer';
import {WebGLAction} from 'store/webgl/types';
import {scaleMat, transMat, rotateMat, multiplyAll} from 'linalg/matrix'


function mapStateToProps(state: ReduxState) {
  var scale = scaleMat(state.mutations.scale);
  var rotate = rotateMat(state.mutations.rotation);
  var translate = transMat(state.mutations.translation);

  return {
    u_matrix: multiplyAll(translate, scale, rotate),
  };
}

function mapDispatchToProps(dispatch: (action: WebGLAction) => void) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShaderCanvas);
