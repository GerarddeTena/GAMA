import About_Cards from "../components/Cards/About_Cards.tsx";
import '../styles/views_Styles/Stathic/AboutUs.scss';
import Info_Cards from "../components/Cards/Info_Cards.tsx";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {ReactHTML} from 'react';

const AboutUs = () => {

    return (
        <main className='About_Container'>
            <div className='About_Title' data-testid='h1'>
                <h1>DEV Team</h1>
            </div>
            <About_Cards/>
            <div className='About_Title' data-testid='h2'>
                <h2>Our Mission</h2>
            </div>
            <section className="About_Text">
            <Info_Cards />
            </section>
            <div className='Heart'></div>
        </main>

    );
}

export default AboutUs;