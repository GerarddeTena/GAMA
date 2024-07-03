import {useState} from 'react';
import ProfileImage from "./ProfileImage.tsx";
import '../../styles/Profile/EditProfileForm.scss';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

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

    const handleImageUploaded = async (imageUrl: string): Promise<void> => {
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
        <section className='Profile_Container'>
            <form className='Profile' onSubmit={handleSubmit}>
                <div className='Profile_Image'>
                    <label className='Label_Profile'>Change Profile Image:</label>
                    <ProfileImage onImageUploaded={handleImageUploaded}/>
                </div>
                <div className='Bio_Profile'>
                    <label>
                        Your Bio:
                        <textarea name="bio" value={formData.bio} onChange={handleChange}></textarea>
                    </label>
                </div>
                <button className='Submit_Profile' type="submit">Save</button>
            </form>
        </section>

    );
};
export default EditProfileForm;
