import '../styles/components_Styles/SloganButtons.scss';
import {Link} from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

const SloganButtons = () => {

    return (
        <div>
            <Link className='Btn-Link nes-btn is-warning' to={'/sign-up'}>Sing Up</Link>
            <Link className='Btn-Link nes-btn is-warning' to={'/sign-in'}>Sing In</Link>
        </div>
    );
};

export default SloganButtons;