import {CARD_DATA} from "../DATA/GLOBAL.jsx";
import '../styles/components_Styles/Cards/About_Cards.scss';
const Cards = () => {

    return (
        <section className='Container_Info'>
            <article className='Card_Container'>
                {CARD_DATA.map(card => (
                    <div key={card.name} className='Card'>
                        <img className='About_Avatar' src={card.avatar} alt={card.name}/>
                        <h1>{card.name}</h1>
                        <div className='icons'>
                            <a href={card.links.github} target='_blank'>
                                <i></i>
                            </a>
                            <a href={card.links.linkedin} target='_blank'>
                                <i></i>
                            </a>
                        </div>
                    </div>
                ))}
            </article>
        </section>
    )

}
export default Cards;