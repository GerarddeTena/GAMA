import {useEffect, useState} from "react";

export const useUser = (key, initialState) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(localStorage.getItem(`${key}`) || initialState);
    }, [value, key]);

    return [value, setValue];
}