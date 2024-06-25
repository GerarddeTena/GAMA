import { useState } from 'react';

const EditProfileForm = ({ user, onSave }) => {
    const [formData, setFormData] = useState(user);

    const handleChange = () => {
        setFormData({ ...formData });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Biografía:
                <textarea name="bio" value={formData.bio} onChange={handleChange}></textarea>
            </label>
            <br />
            <button type="submit">Guardar</button>
        </form>
    );
};

export default EditProfileForm;