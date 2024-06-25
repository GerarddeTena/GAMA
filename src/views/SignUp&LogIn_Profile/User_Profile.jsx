import {useEffect, useState} from 'react';
import {useUser} from "../../DATA/customHooks.jsx";
import EditProfileForm from "../../components/EditProfileForm.jsx";
import '../../styles/views_Styles/Stathic/User_Profile.scss';

const UserProfile = () => {
    const [userNameStore] = useUser('username', 'defaultUserName');
    const [userEmailStore] = useUser('email', 'defaultEmail');
    const [userScore] = useUser('score', 'defaultScore')
    const [isEditing, setIsEditing] = useState(false);

    const [user, setUser] = useState({});

    useEffect(() => {
        const userState = {
            bio: 'I am a user',
            level: 1,
            points: 0,
        }
        setUser(userState);
    }, [])

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSave = (updatedUser) => {
        setUser(updatedUser);
        setIsEditing(false);
    };

    if (isEditing) {
        return <EditProfileForm user={user} onSave={handleSave}/>;
    }


    return (
        <main className="Profile_Container">
            {/*<img className="profile-pic" src="https://i.imgur.com/0rX1WmD.png" alt="Avatar de prueba"/>*/}
            <section className='Profile_Body'>
                <div className='User_Creds'>
                    <h2>{userNameStore}</h2>
                    <p>{userEmailStore}</p>
                </div>
                <div className='User_Bio'>
                    <p>{user.bio}</p>
                </div>

                <div className="User_Stats">
                    <p>Nivel: {user.level}</p>
                    <p>Score: {userScore}</p>
                </div>
            </section>
            <button onClick={handleEditClick}>Edit profile</button>
        </main>
    );
};

export default UserProfile;