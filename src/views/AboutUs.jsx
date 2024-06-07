import About_Cards from "../components/About_Cards.jsx";
import '../styles/views_Styles/Stathic/AboutUs.scss';

const AboutUs = () => {

    return (
        <>
            <main className='About_Container'>
                <div className='About_Title'>
                    <h1>About Us</h1>
                    <h3>We are a team of developers.</h3>
                </div>
            </main>
            <About_Cards/>
        </>

    );
}

export default AboutUs;