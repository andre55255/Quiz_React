import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Login from '../pages/public/Login';
import Register from '../pages/public/Register';

import Home from '../pages/private/Home';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/register" component={Register}/>
            <PrivateRoute path="/home" component={Home}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;