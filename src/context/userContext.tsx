import React from 'react';

import {useAuth} from './authContext';

const UserContext = React.createContext({})

const UserProvider: React.FC = () => {
    const userData = useAuth();
    return (
            <UserContext.Provider value={userData} />
    )
}


// and the useUser hook is basically this:
const useUser = () => React.useContext(UserContext)

export { UserProvider, useUser }