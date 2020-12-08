import React from 'react';

import {useAuth} from './authContext';

const UserContext = React.createContext({})

const UserProvider: React.FC = () => (
    <UserContext.Provider value={{test: "some data here"}} />
)


// and the useUser hook is basically this:
const useUser = () => React.useContext(UserContext)

export { UserProvider, useUser }