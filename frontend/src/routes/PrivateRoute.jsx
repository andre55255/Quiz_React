import React, { useContext } from 'react';
import { authContext } from '../providers/auth';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
    const { user } = useContext(authContext);

    return (
        <Route 
            {...rest}
            render={props => (
                (user.token && user.token.length > 15) ? (
                    <Component {...rest}/>
                ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location }}}/>
                )
            )}
        />
    );
}