import {Link} from "react-router-dom";
import Reptile from '../Images/typesOfCharacter/Reptile.gif';
import Human from '../Images/typesOfCharacter/Human_Thin.gif';
import Cyborg from '../Images/typesOfCharacter/Cyborg-export.gif'
export const CARD_DATA = [
    {
        name: 'Gerard de Tena',
        avatar: 'src/Images/Gerard-export.png',
        links: {
            github: 'https://github.com/GerarddeTena',
            linkedin: 'https://www.linkedin.com/in/gerard-de-tena-948624174/',
        }
    },
    {
        name: 'Adrian Araque',
        avatar: 'src/Images/Adradrom.png',
        links: {
            github: 'https://github.com/adrarom',
            linkedin: 'https://www.linkedin.com/in/adrarom/',
        }
    },
    {
        name: 'Alejandro De Vita',
        avatar: 'src/Images/Alejandro-export.png',
        links: {
            github: 'https://github.com/alejo0022',
            linkedin: 'https://www.linkedin.com/in/alejandro-de-vita-4043861b3/',
        }
    },
    {
        name: 'Mauro Santangelo',
        avatar: 'src/Images/MAu5.png',
        links: {
            github: 'https://github.com/Mauros721',
            linkedin: 'https://www.linkedin.com/in/mauro-alejandro-santangelo-colmenarez-a965082b8/',
        }
    }
];

export const CARD_INFO = [
    {
        id: 0,
        title: 'What we do?',
        description: `Provide a platform for the development of video games,
          where users can create their own characters, share them with the community
          and play with them in a competitive environment.`
    },
    {
        id: 1,
        title: 'TYPES',
        description: `You can choose one of the following types to start and finish our game:`
    },
    {
        id: 2,
        description: <Link to='/player-info-human' className='Link'>HUMAN</Link> ,
        img: Human,
    },
    {
        id: 3,
        description: <Link to='/player-info-cyborg' className='Link'>CYBORG</Link>,
        img: Cyborg,
    },
    {
        id: 4,
        description: <Link to='/player-info-reptile' className='Link'>REPTILE</Link>,
        img: Reptile,
    }
];