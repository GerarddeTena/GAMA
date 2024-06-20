import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    validToken: () => {},
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const validToken = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_VALIDATE_TOKEN_URL}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error({'Error validating token': error});
            localStorage.removeItem('token');
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        validToken();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, validToken }}>
            {children}
        </AuthContext.Provider>
    );
};