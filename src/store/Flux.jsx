import {getPlayerRequests, deletePlayerRequests, setPlayerRequests} from "./Http_calls/HTTP_Player_Requests.jsx";
import {getUserRequests, setUserRequests} from "./Http_calls/HTTP_User_Requests.jsx";

const stateOfComponents = ({getTheStore, setStore}) => {
    return {
        store: {
            users: [
                {
                    user_name: '',
                    mail: '',
                    password: ''
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

            getUserDispatcher: async() => {
              const users = await getUserRequests();
              const store = getTheStore();
              setStore({...store, users: users});
            },
            setUserDispatcher: async(userData) => {
              await setUserRequests(userData);
            },

            //PLAYER DISPATCHER:

            getPlayersDispatcher: async() => {
                const players = await getPlayerRequests();
                const store = getTheStore();
                setStore({...store, players: players});
            },
            setPlayersDispatcher: async(playerData) => {
                 await setPlayerRequests(playerData);
            },
            deletePlayersDispatcher: async(id) => {
                await deletePlayerRequests(id);
                const store = getTheStore();
                const players = store.players.filter(player => player.id !== id);
                setStore({...store, players: players});
            },
        }
    }
}

export default stateOfComponents;