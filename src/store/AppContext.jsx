import {createContext, useEffect, useState} from "react";
import stateOfComponents from "./Flux.jsx";

export const Context = createContext(null);

const InjectContext = (ComponentToInjectContext) => {
    const Container = (props) => {
        const [state, setState] = useState(
            stateOfComponents({
                getTheStore: () => state.store,
                getTheAction: () => state.action,
                setStore: (updatedStore) => {
                    setState({
                        store: {...state.store, ...updatedStore},
                        actions: {...state.actions}
                    })
                }
            })
        );

        //
        // const [isAuthenticated, setIsAuthenticated] = useState(false);
        // const validToken = async () => {
        //
        //     try {
        //
        //         const token = localStorage.getItem('token');
        //         if (!token) {
        //             return false;
        //         }
        //
        //         const response = await fetch(import.meta.env.VITE_VALID_TOKEN_URL, {
        //             method: 'POST',
        //             headers: {
        //                 'Authorization': `Bearer ${token}`
        //             }
        //         });
        //
        //         if (response.ok) {
        //             return true
        //         }
        //         localStorage.removeItem('token');
        //         return false;
        //
        //     } catch(error) {
        //
        //         console.error({'Error validating token': error});
        //         localStorage.removeItem('token');
        //         return false;
        //     }
        // }
        //
        // useEffect(() => {
        //     validToken().then(isValid => setIsAuthenticated(isValid));
        //
        // }, []);

        return (
            <Context.Provider value={state}>
                <ComponentToInjectContext {...props}/>
            </Context.Provider>
        )
    }
    return Container;
}
// eslint-disable-next-line react-refresh/only-export-components
export default InjectContext;