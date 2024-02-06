import React, { createContext, useContext } from 'react';
import { UserType } from '../utils/types';
import { useState } from 'react';

const UserContext = createContext<UserType>({
    username: "default",
    pfp: "null"
});

const [user, setUser] = useState<UserType>({
    username: "default",
    pfp: "null"
});

export const useUser = () => {
    return useContext(UserContext);
}

export const changeUsername = (newUsername: string) => {
    setUser
}

export const UserProvider = ({ children }: {children: React.ReactNode}) => {
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};
