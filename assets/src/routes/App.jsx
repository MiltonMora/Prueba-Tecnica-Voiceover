import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SignIn from '../containers/SignIn';
import Home from '../components/home';
import Layout from '../containers/Layout'

import AppContext from '../context/AppContext';
import useInitialState from '../hooks/useInitialState';

const App = () => {
  const initialState = useInitialState();
  return (
    <AppContext.Provider value={initialState}>
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Layout>
            <Route exact path="/home" component={Home} />
          </Layout>
        </Switch>
    </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
