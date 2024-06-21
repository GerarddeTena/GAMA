import {getPlayerRequests, deletePlayerRequests, setPlayerRequests} from "./Http_calls/HTTP_Player_Requests.jsx";
import {logInUserRequests, registerUserRequests} from "./Http_calls/HTTP_User_Requests.jsx";

const stateOfComponents = ({getTheStore, setStore}) => {
    return {
        store: {
            users: [
                {
                    register_user: {
                        user_name: '',
                        email: '',
                        password: ''
                    },
                    logIn_User: {
                        email: '',
                        password: ''
                    }
                }
            ],

            players: [

                {
                    name: '',
                    weight: 0,
                    strength: 0,
                    speed: 0,
                    agility: 0,
                    endurance: 0,
                    type: ['Human', 'Cyborg', 'Reptile']
                }

            ],

            isLoggedIn: false
        },
        actions: {
            // USER DISPATCHER:

            registerUserDispatcher: async (userData) => {
                try {
                    const newUser = await registerUserRequests(userData);
                    console.log(newUser);
                    const store = getTheStore();
                    setStore({...store, users: { ...store.users, register_user: newUser }});
            
                    // Return the new user data
                    return newUser;
                } catch (error) {
                    console.error({'Error registering user': error});
                }
            },

            loginUserDispatcher: async (userData) => {
                try {
                    const response = await logInUserRequests(userData);
                    console.log(response);
                    const token = response.token;
                    if (!token) console.error('Login Failed');
                    localStorage.setItem('token', token);
                    return response;

                } catch(error) {
                    console.error({'Error logging in user': error});
                    return null;
                }
            },

            //PLAYER DISPATCHER:

            getPlayersDispatcher: async () => {
                const players = await getPlayerRequests();
                const store = getTheStore();
                setStore({...store, players: players});
            },
            setPlayersDispatcher: async (playerData) => {
                await setPlayerRequests(playerData);
            },
            deletePlayersDispatcher: async (id) => {
                await deletePlayerRequests(id);
                const store = getTheStore();
                const players = store.players.filter(player => player.id !== id);
                setStore({...store, players: players});
            },

            setIsLoggedIn: (bool) => {
                const store = getTheStore();
                setStore({...store, isLoggedIn: bool});
            }
        }
    }
}

export default stateOfComponents;