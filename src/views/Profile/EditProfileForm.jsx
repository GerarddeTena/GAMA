import { useState } from 'react';
import ProfileImage from "./ProfileImage.jsx";
import '../../styles/components_Styles/Profile/EditProfileForm.scss';
import PropTypes from "prop-types";
const serverURL = import.meta.env.VITE_APP_CODESPACE_NAME !== 'undefined' ? `https://${import.meta.env.VITE_APP_CODESPACE_NAME}-3001.app.github.dev/api` : 'http://127.0.0.1:3001/api';
const EditProfileForm = ({ user, onSave }) => {
    const [formData, setFormData] = useState(user);

    const handleImageUploaded = async (url) => {
        const formData = new FormData();
        formData.append('image', url);
        formData.append('user_id', user.user_id);

        const response = await fetch(`${serverURL}/user/profile-pic`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            console.error('Failed to update profile picture URL');
        }
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form className='Profile' onSubmit={handleSubmit}>
            <div className='Profile_Image'>
                <label>Foto perfil:</label>
                <ProfileImage onImageUploaded={handleImageUploaded} />
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
};

export default EditProfileForm;
