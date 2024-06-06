
export const setPlayerRequests = async (playerData) => {

    return await fetch(import.meta.env.VITE_POST_PLAYER_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(playerData)
    });
}

export const getPlayerRequests = async () => {

    const response = await fetch(import.meta.env.VITE_GET_PLAYER_URL);
    const data = await response.json();
    if (!response.ok) {
        throw Error('Error Getting Players')
    }
    return data;
}
export const deletePlayerRequests = async (id) => {

    return await fetch(import.meta.env.VITE_DELETE_PLAYER_URL, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id})
    });
}
