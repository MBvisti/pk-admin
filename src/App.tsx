import React, {Fragment, Suspense, lazy} from 'react';

const Login = lazy(() => import('./screens/login/index'));
const Admin = lazy(() => import('./screens/dashboard/index'));

function App() {
    // TODO: when api docs are ready adding in authentication setup
    const isAuthenticated = true;
  return (
      <Fragment>
          <Suspense fallback={Login}>
              {isAuthenticated ? <Admin /> : <Login />}
          </Suspense>
      </Fragment>
  );
}

export default App;
