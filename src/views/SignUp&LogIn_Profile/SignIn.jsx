import {useContext, useEffect, useState} from "react";
import {Context} from "../../store/AppContext.jsx";
import {useNavigate} from 'react-router-dom';

const SignIn = () => {

    const {actions} = useContext(Context);
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [isLogged, setIsLogged] = useState(false);
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
        setIsLogged(true);
        localStorage.setItem('token', JSON.stringify(response));
        navigate('/home');
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) setIsLogged(true)
    }, [])
    return (
        <>
            {isLogged ? <section className="Form">
                <h2 className="Form_Title">Sign In</h2>
                <form className='Body_Form'>
                    <label>E-MAIL: </label>
                    <input type="email" value={mail} onChange={(e) => setMail(e.target.value)}/>
                    <label>PASSWORD: </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </form>
                {error && <p>{error}</p>}
                <button type="submit" onClick={signIn}>Sign In</button>
            </section> : <h1>Please Log In</h1>}
        </>
    )
}

export default SignIn;