export const registerUserRequests = async (userData) => {
    const response = await fetch(import.meta.env.VITE_REGISTER_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Response:', data);
    return data;
}

export const logInUserRequests = async (userData) => {
    const response = await fetch(`${import.meta.env.VITE_LOGIN_URL}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = response.json()
    console.log(`Response: ${data}`);
    return data;
}