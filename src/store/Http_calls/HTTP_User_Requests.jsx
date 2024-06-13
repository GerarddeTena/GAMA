const serverURL = import.meta.env.VITE_APP_CODESPACES ? `https://${import.meta.env.VITE_APP_CODESPACE_NAME}-3001.app.github.dev` : 'http://localhost:3001';

export const registerUserRequests = async (userData) => {
    const response = await fetch(`${serverURL}/api/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonResponse = await response.json();
    console.log('Response:', jsonResponse);
    return jsonResponse;
}

export const logInUserRequests = async (userData) => {
    const response = await fetch(`${serverURL}/api/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}