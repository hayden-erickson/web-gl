import radon from 'store/radon/reducers';
import {RadonAction} from 'store/radon/actions';

const reducer = radon;
export type ReduxState = ReturnType<typeof reducer>;
export type ReduxAction = RadonAction;
export default reducer;
