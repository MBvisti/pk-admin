import React, {lazy, Suspense, useEffect, useState} from 'react';
import {AuthPayload} from "./context/interfaces";
import {useAuth} from "./context/authContext";
import {LoadingScreen} from "./screens/loadingScreen";

const Admin = lazy(() => import('./screens/dashboard'))
const Login = lazy(() => import('./screens/login'))

const App: React.FC = () => {
    const [isAuth, setIsAuth] = useState(false)
    // TODO: when api docs are ready adding in authentication setup
    const data = useAuth() as AuthPayload;

    useEffect(() => {
        setIsAuth(data.userData.isAuthenticated)

    }, [data.userData.isAuthenticated])

  return (
      <Suspense fallback={<LoadingScreen />}>
          {isAuth ? <Admin userName={data.userData.name} /> : <Login />}
      </Suspense>
  );
}

export default App;
