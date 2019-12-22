import reducer from 'store/projections/reducers';
import {rotate, translate} from 'store/projections/actions';
import {MutationState} from 'store/projections/types';
import {Vec3} from 'store/types';

describe('mutationReducer', () => {
  var initialState: MutationState;

  beforeEach(() => {
    initialState = reducer({} as MutationState, undefined);
  });

  it('should set rotation when rotate action passed', () => {
    var newRotation: Vec3 = [1, 2, 3];
    var newState = reducer(initialState, rotate(newRotation));
    expect(newState).toHaveProperty('rotation', newRotation);
  });

  it('should set translation when translate action passed', () => {
    var newTranslation: Vec3 = [4, 5, 6];
    var newState = reducer(initialState, translate(newTranslation));
    expect(newState).toHaveProperty('translation', newTranslation);
  });
  it('should set scale when scale action passed', () => {});
});
