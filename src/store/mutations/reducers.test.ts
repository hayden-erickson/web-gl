import reducer from 'store/mutations/reducers';
import {rotate, translate} from 'store/mutations/actions';
import {MutationState, Vec3} from 'store/mutations/types';

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
