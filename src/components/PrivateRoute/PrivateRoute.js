import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({children,...rest}) => {
  const {signedInUser, setSignedInUser} = useContext(UserContext);
  
    return (
        <Route
        {...rest}
        render={({ location }) =>
          (signedInUser  || sessionStorage.getItem('token')) ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/log-in",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
};

export default PrivateRoute;