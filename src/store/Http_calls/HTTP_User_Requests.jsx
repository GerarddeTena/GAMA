export const setUserRequests = async (userData) => {

    return await fetch(import.meta.env.VITE_POST_USER_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    });
}

export const getUserRequests = async () => {
    const response = await fetch(import.meta.env.VITE_GET_USER_URL);
    if (!response.ok) throw Error('Error getting player');
    return await response.json();

}


