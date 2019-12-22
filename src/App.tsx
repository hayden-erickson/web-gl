import React from 'react';
import './App.css';
import reducer from 'store/reducer';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import RadonScene from 'containers/radon';
// import ConfigPanel from 'containers/mutations/config-panel';
// import ShaderCanvas from 'containers/canvas/shader-canvas'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk),
))

/* <ConfigPanel />
<ShaderCanvas /> */

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RadonScene />
    </Provider>
  );
};

export default App;
