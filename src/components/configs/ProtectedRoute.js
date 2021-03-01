import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute({ isAuth: isAuth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component {...props} />;
        } else {
          return <Redirect to='/' />;
        }
      }}
    />
  );
}

export default ProtectedRoute;
