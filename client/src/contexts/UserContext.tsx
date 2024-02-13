import React, { createContext, useContext } from 'react';
import { UserType } from '../utils/types';
import { useState, useEffect } from 'react';
import { generateName } from '../utils/scripts';

const UserContext = createContext<UserType>({
    userID: "something",
    displayName: "default",
    pfp: "picture"
});

export const useUser = () => {
    return useContext(UserContext);
}

/*
export const changeUsername = (newUsername: string) => {
    setUser
}
*/
const user = useUser();

export const UserProvider = ({ children }: {children: React.ReactNode}) => {
    // const [userID, setUserID] = useState<string>();
    // const [displayName, setDisplayName] = useState<string>();
    // const [pfp, setPfp] = useState<string>();

    const [user, setUser] = useState<UserType>({
        userID: "something",
        displayName: "default",
        pfp: "picture"
    })

    useEffect(() => {
        user.displayName = generateName();
    }, []);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};
