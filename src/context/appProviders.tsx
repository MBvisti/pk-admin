import React from "react";

import AuthProvider  from './authContext';
import { UserProvider } from './userContext'

const AppProviders: React.FC<React.ReactChild> = ({children}) => {
    return (
        <AuthProvider>
            <UserProvider>
                children
            </UserProvider>
        </AuthProvider>
    )
}

export default AppProviders;