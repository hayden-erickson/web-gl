import React from 'react';
import './App.css';
import ConfigPanel from 'containers/mutations/config-panel';
import reducer from 'store/reducer';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import ShaderCanvas from 'containers/canvas/shader-canvas'
import thunk from 'redux-thunk'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk),
))


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <ConfigPanel />
        <ShaderCanvas />
      </div>
    </Provider>
  );
};

export default App;
