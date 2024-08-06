import React, { useState, createContext, Children } from 'react'

export const UserContext = createContext();

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState({
        'id':null,
        'username':null,
    })

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;