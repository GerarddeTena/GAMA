import {Link} from "react-router-dom";
import Reptile from '../assets/Page_Assets/Reptile.gif';
import Human from '../assets/Page_Assets/Human_Thin.gif';
import Cyborg from '../assets/Page_Assets/Cyborg-export.gif';
import Gerard_Avatar from '../assets/Page_Assets/Gerard-export.png';
import Adrian_Avatar from '../assets/Page_Assets/Adradrom.png';
import Alejandro_Avatar from '../assets/Page_Assets/Alejandro-export.png';
import Mauro_Avatar from '../assets/Page_Assets/MAu5.png'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {ReactNode} from "react";

interface CardDataTypes {
    name?: string;
    links?: {github?: string; linkedin?: string;};
    avatar?:string
}

interface CardInfoTypes {
    id?: number;
    title?: string;
    description?: (string | ReactNode);
    img?: string;
}

export const CARD_DATA: CardDataTypes [] =
    [
        {
            name: 'Gerard de Tena',
            avatar: Gerard_Avatar,
            links: {
                github: 'https://github.com/GerarddeTena',
                linkedin: 'https://www.linkedin.com/in/gerard-de-tena-948624174/',
            }
        },
        {
            name: 'Adrian Araque',
            avatar: Adrian_Avatar ,
            links: {
                github: 'https://github.com/adrarom',
                linkedin: 'https://www.linkedin.com/in/adrarom/',
            }
        },
        {
            name: 'Alejandro De Vita',
            avatar: Alejandro_Avatar,
            links: {
                github: 'https://github.com/alejo0022',
                linkedin: 'https://www.linkedin.com/in/alejandro-de-vita-4043861b3/',
            }
        },
        {
            name: 'Mauro Santangelo',
            avatar: Mauro_Avatar,
            links: {
                github: 'https://github.com/Mauros721',
                linkedin: 'https://www.linkedin.com/in/mauro-alejandro-santangelo-colmenarez-a965082b8/',
            }
        }
    ];

export const CARD_INFO: CardInfoTypes [] = [
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
        description: <Link to='/player-info-human' className='PlayerGoButton'>HUMAN</Link>,
            img: Human,
            },
            {
                id: 3,
        description: <Link to='/player-info-cyborg' className='PlayerGoButton'>CYBORG</Link>,
        img: Cyborg,
    },
    {
        id: 4,
        description: <Link to='/player-info-reptile' className='PlayerGoButton'>REPTILE</Link>,
        img: Reptile,
    }
];