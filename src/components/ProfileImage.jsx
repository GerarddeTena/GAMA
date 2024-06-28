import {useState} from "react";
import axios from "axios";
import PropTypes from "prop-types";


const ProfileImage = ({onImageUpload}) => {
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
        onImageUpload(e);
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
                <img src={imageUrl} alt="Perfil de Personaje" style={{ width: '50px', height: '50px', borderRadius: '.25rem'}} />
            )}
        </div>
    );
};
ProfileImage.propTypes = {
    onImageUpload: PropTypes.func.isRequired
}

export default ProfileImage;