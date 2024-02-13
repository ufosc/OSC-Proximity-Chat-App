import React, { createContext, useContext } from 'react';
import { UserType } from '../utils/types';
import { useState, useEffect } from 'react';
import { generateName } from '../utils/scripts';

const UserContext = createContext<UserType>({
    userID: "something",
    displayName: "default",
    pfp: "null"
});

const [user, setUser] = useState<UserType>({
    userID: "something",
    displayName: "default",
    pfp: "null"
});

useEffect(() => {
    user.displayName = generateName();
}, []);

export const useUser = () => {
    return useContext(UserContext);
}

/*
export const changeUsername = (newUsername: string) => {
    setUser
}
*/

export const UserProvider = ({ children }: {children: React.ReactNode}) => {
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};
