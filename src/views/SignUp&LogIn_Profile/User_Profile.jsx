import {useEffect, useState} from 'react';
import {useUser} from "../../DATA/customHooks.jsx";
import EditProfileForm from "../../components/EditProfileForm.jsx";
import '../../styles/views_Styles/Stathic/User_Profile.scss';

const UserProfile = () => {
    const [userNameStore] = useUser('username', 'userName');
    const [userEmailStore] = useUser('email', 'defaultEmail');
    const [userScore] = useUser('score', 'defaultScore')
    const [isEditing, setIsEditing] = useState(false);

    const [user, setUser] = useState({})
    useEffect(() => {
        const userState = {
            profilePic: '',
            name: `${userNameStore}`,
            mail: `${userEmailStore}`,
            score: `${userScore}`,
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
                    <h2>{user.name}</h2>
                    <p>{user.mail}</p>
                </div>
                <div className='User_Bio'>
                    <p>{user.bio}</p>
                </div>

                <div className="User_Stats">
                    <p>Nivel: {user.level}</p>
                    <p>Score: {user.score}</p>
                </div>
                <button onClick={handleEditClick}>Edit profile</button>
            </section>

        </main>
    );
};

export default UserProfile;