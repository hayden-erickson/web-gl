import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import RadonScene from 'containers/radon';
import store from 'store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RadonScene />
    </Provider>
  );
};

export default App;
