import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Login from '../pages/public/Login';
import Register from '../pages/public/Register';

import Home from '../pages/private/Home';
import Category from '../pages/private/Category/Category';
import Quiz from '../pages/private/Quiz/Quiz';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/register" component={Register}/>
            <PrivateRoute path="/home" component={Home}/>
            <PrivateRoute path="/category" component={Category}/>
            <PrivateRoute path="/quiz" component={Quiz}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;