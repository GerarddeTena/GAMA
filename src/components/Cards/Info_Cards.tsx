import {CARD_INFO} from "../../DATA/DEV_DESCRIPTION.tsx";
import '../../styles/components_Styles/Cards/Info_Cards.scss';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
const Info_Cards = () => {
    return (
        <div className='About_Description'>
            <div className='Grid_Cards'>
                {CARD_INFO.map(card => (
                    <article key={card.id} className='Craft_Description' data-testid='info-cards'>
                        <h3 className='Description_Title'>{card.title}</h3>
                        <span className='Description_Info'>{card.description}</span>
                        <img className='Gif' src={card.img}/>
                    </article>
                ))}
            </div>
        </div>
    )
}
export default Info_Cards;