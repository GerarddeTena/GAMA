const serverURL = 'https://gama-oyb3.onrender.com/api';
export const setPlayerRequests = async (playerData) => {

    return await fetch(`${serverURL}/player`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(playerData)
    });
}

export const getPlayerRequests = async () => {

    const response = await fetch(`${serverURL}/player`);
    if (!response.ok) {
        throw Error('Error Getting Players')
    }
    return await response.json();

}
export const deletePlayerRequests = async (id) => {

    return await fetch(`${serverURL}/player`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id})
    });
}
