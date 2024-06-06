import {Link} from "react-router-dom";
import '../../styles/views_Styles/Stathic/Human.scss';
import W_Human from '../../Images/typesOfCharacter/Walking_Human.gif';
const Human = () => {

    const description = [
        {
            name: 'Human',
            specs: ['weight: 70', 'strength: 40', 'speed: 30', 'agility: 80', 'endurance: 30'],
            descriptionType: `The Survivor's Tale
                          In a dystopian world ruled by a malevolent tyrant known as "The Bald One,"
                          society is gripped by fear. This despot maintains control through an eerie practice:
                          kidnapping the cousins of anyone who dares to defy him. Among the oppressed is Alex,
                          a resourceful young man with a unique talent for adaptation and strategy, known as a type player human.
                          Alex's life was shattered when The Bald One's forces seized his beloved cousins. Driven by a burning desire
                          for justice, he embarked on a perilous journey to rescue them and overthrow the tyrant. His journey was fraught with danger,
                          navigating through a landscape filled with traps, spies, and mutated creatures loyal to The Bald One.
                          Along the way, Alex formed alliances with other rebels, each driven by their own loss and thirst for freedom.
                          His exceptional skills in leadership and tactics turned this ragtag group into a formidable resistance.
                          Together, they launched daring raids, gathered intelligence, and slowly dismantled The Bald One's power base.`,
            img: W_Human
        }
    ]

    const structure = description.map((item) => (
        <>
            <h1 className='Title'>{item.name}</h1>
            <section className='Contain_Info_Human'>
                <div className='Character_Human'>
                    <img className='Character_W' src={item.img} alt="#"/>
                </div>
                <div className='Specs'>{item.specs.map(spec => (
                        <>
                            <div key={spec}>
                                <span>{spec}</span>
                                <br/>
                            </div>
                            <br/>
                        </>
                    )
                )}
                </div>
                <div className='Description'>
                    {item.descriptionType}
                </div>
                <div className='Button_Character'>
                    <button className='GoLab'>
                        <Link to={'/player-lab-create'} className='Link'>Go To Lab</Link>
                    </button>
                </div>
            </section>
        </>
    ))
    return (
        <>
            {structure}
        </>
    )
}
export default Human;