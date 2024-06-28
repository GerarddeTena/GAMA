import {useState} from 'react';
import ProfileImage from "./ProfileImage.jsx";
import '../styles/components_Styles/EditProfileForm.scss';
import PropTypes from "prop-types";

const serverURL = import.meta.env.VITE_APP_CODESPACE_NAME !== 'undefined' ? `https://${import.meta.env.VITE_APP_CODESPACE_NAME}-3001.app.github.dev/api` : 'http://127.0.0.1:3001/api';

const EditProfileForm = ({user, setUser, onSave}) => {
    const [formData, setFormData] = useState(user);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(`${serverURL}/user/profile-pic`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUser(prevState => ({...prevState, profilePic: data.profilePic}));
    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form className='Profile' onSubmit={handleSubmit}>
            <div className='Profile_Image'>
                <label>Foto perfil:</label>
                <ProfileImage onImageUpload={handleImageUpload}/>
            </div>
            <div className='Bio_Profile'>
                <label>
                    Biografía:
                    <textarea name="bio" value={formData.bio} onChange={handleChange}></textarea>
                </label>
            </div>
            <button type="submit">Guardar</button>
        </form>
    );
};

EditProfileForm.propTypes = {
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
}

export default EditProfileForm;