import React, {lazy, Suspense} from 'react';
import {useAuth, UserData} from "./context/authContext";
import {LoadingScreen} from "./screens/loadingScreen";

const Admin = lazy(() => import('./screens/dashboard'))
const Login = lazy(() => import('./screens/login'))


const App: React.FC = () => {
    // TODO: when api docs are ready adding in authentication setup
    const userData = useAuth() as UserData;
  return (
      <Suspense fallback={<LoadingScreen />}>
          {userData.accessToken ? <Admin /> : <Login />}
      </Suspense>
  );
}

export default App;
