import { createContext, useContext, useState } from "react";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [userId, setUserId] = useState(0);

    const login = (userId) => {
        setUserId(userId);
    }

    const logout = () => {
        setUserId(0);
    }

    return (<AuthContext.Provider value={{ userId, login, logout }}>
        {children}
    </AuthContext.Provider>);
}

export const useAuth = () => {
    return useContext(AuthContext);
}