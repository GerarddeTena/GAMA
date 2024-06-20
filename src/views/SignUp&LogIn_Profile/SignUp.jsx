import {useContext, useState} from "react";
import '../../styles/views_Styles/Signup.scss';
import {Context} from "../../store/GENERAL_CONTEXT/AppContext.jsx";

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
        const result = await actions.registerUserDispatcher(userData);
        console.log(result)
        console.log('Response:', result);
        if (result && result.success) {
            setError('REGISTRATION SUCCESFUL');
        } else {
            setError('Registration failed');
            console.error('Registration failed:', result);
        }
    } catch (error) {
        console.error('Error:', error);
        setError('Registration failed');
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
                {error && <h1>{error}</h1>}
            </section>
        </>
    )

}

export default Signup;