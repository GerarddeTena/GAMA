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
                        mail: '',
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
        },
        actions: {
            // USER DISPATCHER:

            registerUserDispatcher: async (userData) => {
                const users = await registerUserRequests(userData);
                const store = getTheStore();
                setStore({...store, users: users});
            },

            loginUserDispatcher: async (userData) => {
                const response = await logInUserRequests(userData);
                if(!response.ok) throw Error('Login Failed');
                const data = await response.json();
                return data.token;
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
        }
    }
}

export default stateOfComponents;