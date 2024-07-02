import {getPlayerRequests, deletePlayerRequests, setPlayerRequests} from "./Http_calls/HTTP_Player_Requests.jsx";
import {getUsers, logInUserRequests, registerUserRequests} from "./Http_calls/HTTP_User_Requests.jsx";
import {UserTypes} from '../views/Profile/User_Profile.tsx';
import { UserType } from '../views/Profile/EditProfileForm.tsx';

interface PlayerStats {
    player_id: number;
    name: string;
    weight: number,
    strength: number,
    speed: number,
    agility: number,
    endurance: number,
    type: [string, string, string],
    score: number,
    level: number,
}

interface FluxTypes {
    store: {
        users: UserTypes [];
        players: PlayerStats [];
    },
    actions: {
        getUserDispatcher: ({id}: { id: string }) => Promise<void>;
        loginUserDispatcher: (userData: UserType) => Promise<UserType | null>;
        setPlayersDispatcher: (playerData: PlayerStats) => Promise<void>;
        registerUserDispatcher: (userData: UserType) => Promise<UserType>;
        deletePlayersDispatcher: (id: number) => Promise<void>;
        getPlayersDispatcher: () => Promise<void>
    }

}
const stateOfComponents = ({getTheStore, setStore}): FluxTypes => {
    return {
        store: {
            users: [],
            players: [],
        },
        actions: {
            // USER DISPATCHER:

            registerUserDispatcher: async (userData: UserType): Promise<UserType> => {
                try {
                    const newUser = await registerUserRequests(userData)
                    console.log(newUser);
                    const store = getTheStore();
                    setStore({...store, users: { ...store.users, register_user: newUser }});
            
                    // Return the new user data
                    return newUser;
                } catch (error) {
                    console.error({'Error registering user': error});
                }
            },

            loginUserDispatcher: async (userData: UserType): Promise<UserType | null> => {
                try {
                    const response = await logInUserRequests(userData);
                    const token = response.token;
                    if (!token) console.error('Login Failed');
                    localStorage.setItem('token', token);
                    return response;

                } catch(error) {
                    console.error({'Error logging in user': error});
                    return null;
                }
            },

            getUserDispatcher: async ({id}: {id: string}): Promise<void> => {
                await getUsers({id});
                const store = getTheStore();
                const users = store.users.filter((user: { id: string; }) => user.id === id)
                setStore({...store, users: users});
            },

            //PLAYER DISPATCHER:

            getPlayersDispatcher: async (): Promise<void> => {
                const players = await getPlayerRequests();
                const store = getTheStore();
                setStore({...store, players: players});
            },
            setPlayersDispatcher: async (playerData: PlayerStats): Promise<void> => {
                await setPlayerRequests(playerData);
            },
            deletePlayersDispatcher: async (id: number): Promise<void> => {
                await deletePlayerRequests(id);
                const store = getTheStore();
                const players = store.players.filter((player: { id: number; }) => player.id !== id);
                setStore({...store, players: players});
            }
        }
    }
}

export default stateOfComponents;