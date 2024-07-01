import {useState} from 'react';
import ProfileImage from "./ProfileImage.tsx";
import '../../styles/components_Styles/Profile/EditProfileForm.scss';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

const serverURL = import.meta.env.VITE_APP_CODESPACE_NAME !== 'undefined' ? `https://${import.meta.env.VITE_APP_CODESPACE_NAME}-3001.app.github.dev/api` : 'http://127.0.0.1:3001/api';

export interface UserType {
    user_id: string;
    user_name: string;
    profilePic: string;
    email: string;
    bio: string;
    level: number;
}

interface EditProfileFormProps {
    user: UserType,
    onSave: (user: UserType) => void,
    setUser?: (value: (((prevState: UserType) => UserType) | UserType)) => void
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({user, onSave}) => {
    const [formData, setFormData] = useState(user);

    const handleImageUploaded = async (imageUrl) => {
        setFormData({...formData, profilePic: imageUrl})
    };

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
                <ProfileImage onImageUploaded={handleImageUploaded}/>
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
export default EditProfileForm;
