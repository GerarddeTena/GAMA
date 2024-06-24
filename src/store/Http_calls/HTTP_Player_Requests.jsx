// const serverURL = import.meta.env.VITE_APP_CODESPACE_NAME !== 'undefined' ? `https://${import.meta.env.VITE_APP_CODESPACE_NAME}-3001.app.github.dev/api` : 'http://127.0.0.1:3001/api';
// export const setPlayerRequests = async (playerData) => {
//
//     return await fetch(`${serverURL}/player`, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(playerData)
//     });
// }
//
// export const getPlayerRequests = async () => {
//
//     const response = await fetch(`${serverURL}/player`);
//     if (!response.ok) {
//         throw Error('Error Getting Players')
//     }
//     const data = await response.json();
//     console.log(data);
//     return data;
// }
// export const deletePlayerRequests = async (id) => {
//
//     return await fetch(`${serverURL}/player`, {
//         method: 'DELETE',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({id})
//     });
// }
