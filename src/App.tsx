import React, { lazy, Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

// context
import { AuthData } from "./context/interfaces";
import { useAuth } from "./context/authContext";

// screens
import { LoadingScreen } from "./screens/loadingScreen";
const Admin = lazy(() => import("./screens/dashboard"));
const Login = lazy(() => import("./screens/login"));

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  // TODO: when api docs are ready adding in authentication setup
  const data = useAuth() as AuthData;

  useEffect(() => {
    setIsAuth(data.userData.isAuthenticated);
  }, [data.userData.isAuthenticated]);

  console.log(data);

  return (
    <Suspense fallback={<LoadingScreen />}>
      {/* TODO: letting all through for now  */}
      {isAuth ? (
        <QueryClientProvider client={queryClient}>
          <Admin userName={data.userData.name} />
        </QueryClientProvider>
      ) : (
        <Login isLoading={data.loadingState} />
      )}
    </Suspense>
  );
};

export default App;
