import {useContext, useState} from "react";
import {Context} from "../../store/GENERAL_CONTEXT/AppContext.jsx";
import '../../styles/views_Styles/SignIn.scss';
import {AuthContext} from "../../store/GENERAL_CONTEXT/AuthContext.jsx";

const SignIn = () => {

    const {validToken} = useContext(AuthContext);
    const {actions} = useContext(Context);
    const [password, setPassword] = useState('');
    const [email, setMail] = useState('');
    const [error, setError] = useState(null);
    console.log(import.meta.env)

    const checkUser = async (e) => {

        e.preventDefault();
        const userData = {
            email,
            password
        };

        try {
            console.log(userData);
            const response = await actions.loginUserDispatcher(userData);
            if (response.token) {
                localStorage.setItem('token', response.token);
                validToken();
                setError(null);
            } else {
                setError('Login failed: Invalid email or password');
            }

        } catch (error) {
            setError('An error occurred while logging in');
            console.error('Error logging in user:', error);
        }
    };


    return (
        <>
            <section className="Form_SignIn">
                <h2 className="Form_Title">Sign In</h2>
                <form className='Body_Form_SI'>
                    <div className="Label_Div">
                        <label>E-MAIL: </label>
                        <input type="email" value={email} onChange={(e) => setMail(e.target.value)}/>
                    </div>

                    <div className="Label_Div">
                        <label>PASSWORD: </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button className='Submit_SI' type="submit" onClick={checkUser}>Sign In</button>
                </form>
                {error && <p>{error}</p>}
            </section>
        </>
    )
}

export default SignIn;