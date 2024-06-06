import {Link} from "react-router-dom";
import '../../styles/views_Styles/Stathic/Reptile.scss';
import W_Reptile from '../../Images/typesOfCharacter/Walking_Reptile.gif';

const Reptile = () => {

    const description = [
        {
            name: 'Reptile',
            specs: ['weight: 40', 'strength: 30', 'speed: 200', 'agility: 500', 'endurance: 30'],
            descriptionType: `In a dystopian world ruled by an evil tyrant known as "The Bald One," society is gripped by fear. 
            This despot maintains control through a sinister practice: kidnapping the relatives of anyone who dares to defy him. 
            Among the oppressed is Zarnak, a member of a native reptilian species known for their strict codes and savage nature.
            Zarnak, a fierce and cunning warrior, lived by the ancient laws of his people until The Bald One's forces captured his kin. 
            Driven by a deep sense of honor and vengeance, Zarnak rebelled. Using his natural agility and combat skills, 
            he embarked on a dangerous mission to rescue his relatives and overthrow the tyrant.
            His journey was filled with peril, navigating through deadly traps, hostile spies, and mutated creatures loyal to The Bald One. 
            Along the way, Zarnak formed alliances with other rebels, each motivated by their own losses and desire for freedom.
            With his unparalleled strength and strategic mind, Zarnak became the leader of this diverse resistance. 
            Together, they launched bold raids, gathered crucial intelligence, and gradually dismantled The Bald One's power, fighting tirelessly for liberation and justice.`,
            img: W_Reptile
        }
    ]

    const structure = description.map((item) => (
        <>
            <h1 className='Title'>{item.name}</h1>
            <section className='Contain_Info_Reptile'>
                <div className='Character_Reptile'>
                    <img className='Character_W' src={item.img} alt="#"/>
                </div>
                <div className='Specs'>{item.specs.map(spec => (
                        <>
                            <div>
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
export default Reptile;