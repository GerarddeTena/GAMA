import {CARD_DATA} from "../DATA/GLOBAL.jsx";
import '../styles/components_Styles/About_Cards.scss';
const Cards = () => {

    return (
        <section className='Container_Info'>
            <article className='Card_Container'>
                {CARD_DATA.map(card => (
                    <div key={card.name} className='Card'>
                        <img src={card.avatar} alt={card.name}/>
                        <h1>{card.name}</h1>
                        <div className='icons'>
                            <a href={card.links.github} target='_blank' rel='noreferrer'>
                                <i className='pixel_art'></i>
                            </a>
                            <a href={card.links.linkedin} target='_blank' rel='noreferrer'>
                                <i className='pixel_art'></i>
                            </a>
                            <a href={card.links.twitter} target='_blank' rel='noreferrer'>
                                <i className='pixel_art'></i>
                            </a>
                        </div>
                    </div>
                ))}
            </article>
        </section>
    )

}
export default Cards;