import {useEffect, useState} from 'react';
import {useUser} from "../../DATA/customHooks.jsx";
import EditProfileForm from "./EditProfileForm.tsx";
import '../../styles/views_Styles/Stathic/User_Profile.scss';
// import {Context} from "../../store/GENERAL_CONTEXT/AppContext.jsx";
import {getUsers} from "../../store/Http_calls/HTTP_User_Requests.jsx";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
export interface UserTypes {
    user_id: string;
    user_name: string;
    profilePic: string;
    email: string;
    bio: string;
    level: number;
}


const UserProfile = () => {
    //const {actions} = useContext(Context)
    const [userScore] = useUser('score', 0)
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState<UserTypes>({
        user_id: '',
        user_name: '',
        profilePic: '',
        email: '',
        bio: '',
        level: 0
    });
    const fetchUser = async () => {
        const userID = localStorage.getItem('user_id');
        const fetchedUser = await getUsers({id: userID});
        setUser(fetchedUser);
    }
    useEffect(() => {
        fetchUser();
    }, [])

    useEffect(() => {
        const userState = {
            ...user,
            bio: 'I am a user',
            level: 1,
        }
        setUser(userState);
    }, [])

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSave = (updatedUser: UserTypes) => {
        setUser(updatedUser);
        setIsEditing(false);
    };

    if (isEditing) {
        return <EditProfileForm setUser={setUser} user={user} onSave={handleSave}/>;
    }


    return (
        <section className="Profile_Container">
            <section className='Profile_Body'>
                <img className="Profile_Pic" src={user.profilePic} alt="Avatar de prueba"/>
                <div className='User_Creds'>
                    <h2>{user.user_name}</h2>
                    <p>{user.email}</p>
                </div>
                <div className='User_Bio'>
                    <p>{user.bio}</p>
                </div>

                <div className="User_Stats">
                    <p>LEVEL: {user.level}</p>
                    <p>SCORE: {userScore}</p>
                </div>
            </section>
            <button onClick={handleEditClick}>Edit profile</button>
        </section>
    );
};

export default UserProfile;