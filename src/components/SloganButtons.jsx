import '../styles/components_Styles/SloganButtons.scss'
import {Link} from "react-router-dom";

const SloganButtons = () => {

    return (
        <>
            <Link className='nes-btn is-warning' to={'/sign-up'}>Sing Up</Link>
            <Link className='nes-btn is-warning' to={'/sign-in'}>Sing In</Link>
        </>
    );
};

export default SloganButtons;