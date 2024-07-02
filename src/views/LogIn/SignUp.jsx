import {useContext, useState} from "react";
import '../../styles/views_Styles/Signup.scss';
import {Context} from "../../store/GENERAL_CONTEXT/AppContext.jsx";
import {AuthContext} from "../../store/GENERAL_CONTEXT/AuthContext.tsx";

const Signup = () => {
    const {validToken} = useContext(AuthContext);

    const {actions} = useContext(Context)
    const [user_name, setUser_Name] = useState('');
    const [password, setPassword] = useState('');
    const [email, setMail] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null)
    const submitUser = async (e) => {
        e.preventDefault();
        const userData = {
            user_name,
            password,
            email
        }
        try {
            const result = await actions.registerUserDispatcher(userData);
            console.log(result)
            console.log('Response:', result);
            if (result && result.success) {
                setError('REGISTRATION SUCCESFUL');
                localStorage.setItem('username', result.user_name);
                localStorage.setItem('email', result.email);
                localStorage.setItem('user_id', result.user_id);
                localStorage.setItem('token', result.token);
                validToken();
                const userID = localStorage.getItem('user_id')
                const fetchedUser = await actions.getUserDispatcher({id: userID});
                if (fetchedUser) {
                    setUser(fetchedUser);
                } else {
                    setError('Fetch ID incorrect');
                }
            } else {
                setError('Registration failed');
                console.error('Registration failed:', result);
            }
            window.location.href = '/user-profile';
        } catch (error) {
            console.error('Error:', error);
            setError('Registration failed');
        }
    }
    return (
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
                {error && <h1>{error}</h1>}
                {user && <h1>Welcome, {user.user_name}!</h1>}
            </section>
        </>
    )

}

export default Signup;