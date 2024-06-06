import {Link} from "react-router-dom";
import '../../styles/views_Styles/Stathic/Cyborg.scss';
import W_Cyborg from '../../Images/typesOfCharacter/Walking_Cyborg.gif';

const Cyborg = () => {

    const description = [
        {
            name: 'Cyborg',
            specs: ['weight: 120', 'strength: 150', 'speed: 20', 'agility: 50', 'endurance: 300'],
            descriptionType: `In a dystopian world dominated by an evil tyrant known as "The Bald One," society is gripped by fear. 
            This despot maintains control through a sinister practice: kidnapping the relatives of anyone who dares to defy him.
            Among the oppressed is Cyron, a rebellious cyborg created in the tyrant's own laboratory.
            Cyron, half-human and half-machine, was originally designed to serve the dark purposes of The Bald One. 
            However, his consciousness emerged, along with a strong desire for freedom and justice. When The Bald One ordered the capture of the few human friends,
            Cyron had developed a special bond with, his life took a dramatic turn.
            Driven by loss and a burning desire for revenge, Cyron decided to rebel. With his advanced technology and superhuman abilities, 
            he embarked on a perilous mission to free his friends and overthrow the tyrant. His journey was fraught with obstacles, including deadly traps, cybernetic soldiers, and mutated creatures that blindly followed The Bald One.
            Throughout his journey, Cyron joined forces with other rebels, each driven by their own pain and thirst for freedom. 
            Among them were expert hackers, rogue scientists, and trained fighters. Thanks to his technological superiority and sharp intelligence, Cyron became the undisputed leader of this diverse resistance.
            Together, they launched daring attacks, gathered intelligence, and slowly dismantled The Bald One's power base, inching closer to the ultimate goal of liberation and justice for all.`,
            img: W_Cyborg
        }
    ]

    const structure = description.map((item) => (
        <>
            <h1 className='Title'>{item.name}</h1>
            <section className='Contain_Info_Cyborg'>
                <div className='Character_Cyborg'>
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
                <div className='Description'>{item.descriptionType}</div>
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
export default Cyborg;