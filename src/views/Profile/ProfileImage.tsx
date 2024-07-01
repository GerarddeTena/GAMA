import { useState } from 'react';
import axios from 'axios';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

interface ProfileImageProps {
    onImageUploaded: (file: any) => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ onImageUploaded}) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'gamapreset');
        setLoading(true);
        const res = await axios.post(`https://api.cloudinary.com/v1_1/gamacloud/image/upload/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        const file = res.data;
        const originalUrl = file.secure_url;
        const transformedUrl = originalUrl.replace('/upload/', '/upload/w_120,h_120/r_max/');

        setImageUrl(transformedUrl);
        setLoading(false);
        onImageUploaded(files[0]);
    };

    return (
        <div>
            <input
                type="file"
                name="file"
                placeholder="Sube una imagen"
                onChange={uploadImage}
            />
            {loading ? (
                <h3>Cargando...</h3>
            ) : (
                imageUrl && <img src={imageUrl} alt="Foto de perfil"/>
            )}
        </div>
    );
};



export default ProfileImage;
