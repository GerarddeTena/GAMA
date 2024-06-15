import {CARD_INFO} from "../../DATA/DEV_DESCRIPTION.jsx";
import '../../styles/components_Styles/Cards/Info_Cards.scss';
const Info_Cards = () => {
    return (
        <div className='About_Description'>
            {CARD_INFO.map(card => (
                <article key={card.description} className='Craft_Description'>
                    <h3 className='Description_Title'>{card.title}</h3>
                    <span className='Description_Info'>{card.description}</span>
                </article>
            ))}
        </div>
    )
}
export default Info_Cards;