const serverURL = 'https://gama-oyb3.onrender.com/api';

export const registerUserRequests = async (userData) => {
    console.log('serverURL:', serverURL)
    const response = await fetch(`${serverURL}/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData),
        mode: 'cors'
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();

}

export const logInUserRequests = async (userData) => {
    const response = await fetch(`${serverURL}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();

}
export const getUsers = async ({id}) => {
    const response = await fetch(`${serverURL}/user?user_id=${id}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}
