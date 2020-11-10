import React from 'react';
import {
  Redirect,
  Route as ReactRouteDOM,
  RouteProps as ReactRouteDOMProps,
} from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

interface RouteProps extends ReactRouteDOMProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactRouteDOM
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              state: { from: location },
              pathname: isPrivate ? '/' : '/dashboard',
            }}
          />
        );
      }}
    />
  );
};

export default Route;
