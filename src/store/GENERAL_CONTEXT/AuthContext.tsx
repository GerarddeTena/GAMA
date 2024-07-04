// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {createContext, useState, useEffect, ReactNode} from 'react';
const serverURL = 'https://gama-oyb3.onrender.com/api';
export const AuthContext = createContext({
    isAuthenticated: false,
    validToken: () => {},
    logOut: () => {}
});
interface AuthProviderProps {
    children: ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const logOut = () => setIsAuthenticated(false);
    const validToken = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${serverURL}/validate-token`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setIsAuthenticated(!isAuthenticated);
            } else {
                setIsAuthenticated(!isAuthenticated);
            }
        } catch (error) {
            console.error({'Error validating token': error});
            setIsAuthenticated(isAuthenticated);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) validToken();
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, logOut, validToken }}>
            {children}
        </AuthContext.Provider>
    );
};
