import reducer from 'store/reducer';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
