export const registerUserRequests = async (userData) => {
    const response = await fetch(import.meta.env.VITE_POST_NEW_USER_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export const logInUserRequests = async (userData) => {
    const response = await fetch(import.meta.env.VITE_POST_LOGIN_USER_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}