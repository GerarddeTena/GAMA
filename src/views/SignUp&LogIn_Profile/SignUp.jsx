import {useContext, useState} from "react";
import '../../styles/views_Styles/Signup.scss';
import {Context} from "../../store/AppContext.jsx";
import {useNavigate} from 'react-router-dom';

const Signup = () => {
    const { actions } = useContext(Context)
    const [user_name, setUser_Name] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const navigate = useNavigate();

    const submitUser = async (e) => {
        e.preventDefault();
        const userData = {
            user_name,
            password,
            mail
        }
        const response = await actions.registerUserDispatcher(userData);
        if(response.success){
            localStorage.setItem('token', JSON.stringify(response.token));
            navigate('/home');
        } else {
            console.log(response.message);
        }
    }

    return(
        <>
            <section className="Form">
                <h2 className="Form_Title">Sign Up</h2>
                <form className='Body_Form'>
                    <label>NAME: </label>
                    <input type="text" value={user_name} onChange={(e) => setUser_Name(e.target.value)}/>
                    <label>PASSWORD: </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <label>E-MAIL: </label>
                    <input type="email" value={mail} onChange={(e) => setMail(e.target.value)}/>
                </form>

                <button type="submit" onClick={submitUser}>Sign Up!</button>
            </section>
        </>
    )

}

export default Signup;