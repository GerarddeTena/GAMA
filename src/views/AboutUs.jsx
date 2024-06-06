import '../styles/views_Styles/Stathic/AboutUs.scss';
import PropTypes from "prop-types";
import ImageSlogan from "../components/ImageSlogan.jsx";

const AboutUs = () => {
    const CardData = [
        {
            name: 'Mau.St.Angelo',
            description: `I'm MauSantangelo, the programming skills chef. I'm whipping up recipes
                    of code sets to make sure they have the best presentation and flavor possible. My mentor took me under
                    his wing ages ago and instilled in me the gifts of perfection and preparation.`,
            links: {
                github: 'https://github.com/MauSantangelo',
                linkedin: 'https://github.com/MauSantangelo',
                discord: 'https://github.com/MauSantangelo',
            },
        },
        {
            name: 'Adradrom',
            description: `I'm Adrarom, plain but effective. My knack for design and coding knows no bounds, thanks to my
                    upbringing in the rocky mountains of Unity,
                    where they instilled in me the gift of styling and perseverance.`,
            links: {
                github: 'https://github.com/adradrom',
                linkedin: 'https://github.com/adradrom',
                discord: 'https://github.com/adradrom',
            },
        },
        {
            name: 'Korzair',
            description: `I'm a pirate embraced by the lawlessness of the DOM. I spend my days sailing
                    the seas in search of treasures to increase the volume of my knowledge. Ever since 
                    I joined this crew, my goal has been to sail through all languages to become
                    the best fullstack in these seas.`,
            links: {
                github: 'https://github.com/alejo0022',
                linkedin: 'https://github.com/alejo0022',
                discord: 'https://github.com/alejo0022',
            },
        },
        {
            name: 'DonDraper',
            description: ` I'm like the f***ing Don Draper of programming. I'm all about perfection and I won't
                    stop until I find it, even if it means messing with my sleep hours. I lie to people around me
                    so they don't know what time I actually go to bed. (Easter Egg dropped in there
                    for whoever brought my nickname to life.)`,
            links: {
                github: 'https://github.com/GerarddeTena',
                linkedin: 'https://github.com/GerarddeTena',
                discord: 'https://github.com/GerarddeTena',
            },
        },
    ];
    const Card = ({name, description, links}) => {
        return (

            <div className='Card'>
                <h1 className='head'>{name}</h1>
                <div className='body'>{description}</div>
                <div className="icons">
                    <a href={links.github}>
                        <i className="pixel_art github hover"></i>
                    </a>
                    <a href={links.linkedin}>
                        <i className='pixel_art linkedin'></i>
                    </a>
                    <a href={links.discord}>
                        <img className='Log_PX_Art' src="src/Images/DiscordLogoPXART.png" alt="#"/>
                    </a>
                </div>
            </div>
        );
    };

    Card.propTypes = {
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        links: PropTypes.shape({
            github: PropTypes.string,
            linkedin: PropTypes.string,
            discord: PropTypes.string,
        }).isRequired,
    }

    return (
        <section className='Container'>
            <div className='Image'>
                <ImageSlogan/>
            </div>
            {CardData.map(item => <Card key={item} {...item} /> )}
        </section>
    )

}
export default AboutUs;
