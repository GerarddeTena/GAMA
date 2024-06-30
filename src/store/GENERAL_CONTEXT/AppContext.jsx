import {createContext, useState} from "react";
import stateOfComponents from "../Flux.tsx";

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

        return (
            <Context.Provider value={state}>
                <ComponentToInjectContext {...props} />
            </Context.Provider>
        )
    }
    return Container;
}
// eslint-disable-next-line react-refresh/only-export-components
export default InjectContext;