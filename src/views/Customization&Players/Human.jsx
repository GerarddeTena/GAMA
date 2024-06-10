import {Link} from "react-router-dom";
import '../../styles/views_Styles/Stathic/Human.scss';
import W_Human from '../../Images/typesOfCharacter/Walking_Human.gif';
import {HUMAN} from "../../DATA/PLAYER_DESC.jsx";
const Human = () => {



    return HUMAN.map((item) => (
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
}
export default Human;