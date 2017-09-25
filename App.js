import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

import { composeWithDevTools } from 'remote-redux-devtools';

import params from './auth0-params.json';

class App extends Component {

  render() {

    process.env.NODE_ENV = params.node_env || 'development';

    console.log('NODE_ENV:', process.env.NODE_ENV)

    const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(ReduxThunk)));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
