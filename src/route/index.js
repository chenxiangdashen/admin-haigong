import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../views/Layout';
import Login from '../views/Login';
import Register from '../views/Register';

import Home from '../views/Home';
import Form from '../views/Form';

export const childRoutes = [
  {
    'path':'/home',
    'component': Home,
    'exactly': true
  },
  {
    'path':'/form',
    'component': Form
  },

];

const routes = (
  <Switch>
    <Route path="/login" component={Login}/>
    <Route path="/register" component={Register}/>
    <Route path="/" component={Layout}/>
  </Switch>
);

export default routes
