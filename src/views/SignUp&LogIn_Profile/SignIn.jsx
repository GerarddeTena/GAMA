import {useContext, useEffect, useState} from "react";
import {Context} from "../../store/AppContext.jsx";
import {useNavigate} from 'react-router-dom';
import '../../styles/views_Styles/SignIn.scss';

const SignIn = () => {

    const {actions} = useContext(Context);
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    //const [isLogged, setIsLogged] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const signIn = async (e) => {
        e.preventDefault();
        if (!mail || !password) {
            setError('Please fill in all fields');
            return;
        }
        const userData = {
            mail,
            password
        }
        const response = await actions.loginUserDispatcher(userData);
        if(!response.success){
            setError('Invalid credentials');
            return;
        }
        //setIsLogged(true);
        localStorage.setItem('token', JSON.stringify(response));
        navigate('/home');
    }
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if(token) setIsLogged(true)
    // }, [])
    return (
        <>
            <section className="Form_SignIn">
                <h2 className="Form_Title">Sign In</h2>
                <form className='Body_Form_SI'>
                    <label>E-MAIL: </label>
                    <input type="email" value={mail} onChange={(e) => setMail(e.target.value)}/>
                    <label>PASSWORD: </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </form>
                {error && <p>{error}</p>}
                <button className='Submit_SI' type="submit" onClick={signIn}>Sign In</button>
            </section>
        </>
    )
}

export default SignIn;