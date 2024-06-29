import { createContext, useState, useEffect } from 'react';
const serverURL = import.meta.env.VITE_APP_CODESPACE_NAME !== 'undefined' ? `https://${import.meta.env.VITE_APP_CODESPACE_NAME}-3001.app.github.dev/api` : 'http://127.0.0.1:3001/api';
export const AuthContext = createContext({
    isAuthenticated: false,
    logOut: () => {},
    validToken: () => {},
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error({'Error validating token': error});
            setIsAuthenticated(false);
        }
    };

    const logOut = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) validToken();
        logOut();

    }, []);
    return (
        <AuthContext.Provider value={{ isAuthenticated, logOut, validToken }}>
            {children}
        </AuthContext.Provider>
    );
};