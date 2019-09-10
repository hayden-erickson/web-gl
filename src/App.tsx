import React from 'react';
import './App.css';
import ConfigPanel from 'containers/mutations/config-panel';
import reducer from 'store/reducer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import ShaderCanvas from 'containers/canvas/shader-canvas'

let store = createStore(reducer,
  ( window as any).__REDUX_DEVTOOLS_EXTENSION__ && ( window as any ).__REDUX_DEVTOOLS_EXTENSION__());

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div style={{display: 'flex'}}>
        <ConfigPanel />
        <ShaderCanvas />
      </div>
    </Provider>
  );
};

export default App;
