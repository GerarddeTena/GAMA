import {useContext, useState} from "react";
import '../../styles/views_Styles/Signup.scss';
import {Context} from "../../store/AppContext.jsx";

const Signup = () => {
    const { actions } = useContext(Context)
    const [user_name, setUser_Name] = useState('');
    const [password, setPassword] = useState('');
    const [email, setMail] = useState('');
    const [error, setError] = useState('');

    const submitUser = async (e) => {
        e.preventDefault();
        const userData = {
            user_name,
            password,
            email
        }
        try {
            const response = await actions.registerUserDispatcher(userData);
            if (response && response.token) {
                localStorage.setItem('token', response.token);
            } else {
                setError('Registration failed');
                console.error('Registration failed:', response);
            }
        } catch (error) {
            setError('An error occurred while registering the user');
            console.error('Error registering user:', error);
        }
    }

    return(
        <>
            <section className="Form_SignUp">
                <h2 className="Form_Title">Sign Up</h2>
                <form className='Body_Form_SU'>
                    <div className="Label_Div">
                        <label>NAME: </label>
                        <input type="text" value={user_name} onChange={(e) => setUser_Name(e.target.value)}/>
                    </div>
                    <div className="Label_Div">
                        <label>E-MAIL: </label>
                        <input type="email" value={email} onChange={(e) => setMail(e.target.value)}/>
                    </div>
                    <div className="Label_Div">
                        <label>PASSWORD: </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>


                    <button type="submit" onClick={submitUser}>Sign Up!</button>
                </form>
                {error && <h1>ERROR! {error}</h1>}
            </section>
        </>
    )

}

export default Signup;