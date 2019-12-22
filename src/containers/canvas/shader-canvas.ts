import {connect} from 'react-redux';
import {ShaderCanvas} from 'components/canvas/canvas';
import {ReduxState} from 'store/reducer';
import {MutationAction} from 'store/projections/types';
import {Vec3} from 'store/types';
import {scaleMat, transMat, rotateMat, multiplyAll} from 'linalg/matrix';
import {
  modifyScale,
  beginDrag,
  endDrag,
  calculateRotation,
} from 'store/projections/actions';

function mapStateToProps(state: ReduxState) {
  var scale = scaleMat(state.projections.scale);
  var rotate = rotateMat(state.projections.rotation);
  var translate = transMat(state.projections.translation);

  return {
    u_matrix: multiplyAll(translate, scale, rotate),
    anchor: state.projections.anchor,
    originalRotation: state.projections.originalRotation,
    rotation: state.projections.rotation,
    rotationDelta: state.projections.rotationDelta,
  };
}

function mapDispatchToProps(dispatch: (a: MutationAction) => {}) {
  return {
    changeScale: (delta: number) => {
      const change = delta / 50;
      dispatch(modifyScale([change, change, change]));
    },
    beginDrag: (anchor: Vec3, rotation: Vec3) =>
      beginDrag(anchor, rotation)(dispatch),
    endDrag: (originalRotation: Vec3, rotationDelta: Vec3) =>
      endDrag(originalRotation, rotationDelta)(dispatch),
    calculateRotation: (anchor: Vec3, mouse: Vec3, originalRotation: Vec3) =>
      calculateRotation(anchor, mouse, originalRotation)(dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShaderCanvas);
