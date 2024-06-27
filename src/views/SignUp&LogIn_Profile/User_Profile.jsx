import {useEffect, useState} from 'react';
import {useUser} from "../../DATA/customHooks.jsx";
import EditProfileForm from "../../components/EditProfileForm.jsx";
import '../../styles/views_Styles/Stathic/User_Profile.scss';

const UserProfile = () => {
    const [userScore] = useUser('score', 0)
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
            <section className='Profile_Body'>
                <img className="Profile_Pic" src={user.profilePic} alt="Avatar de prueba"/>
                <div className='User_Creds'>
                    <h2>Name</h2>
                    <p>Email</p>
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