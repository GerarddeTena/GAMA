import {Link} from "react-router-dom";
import '../../styles/views_Styles/Stathic/Cyborg.scss';
<<<<<<< HEAD
import W_Cyborg from '../../Images/typesOfCharacter/Walking_Cyborg.gif'
import {CYBORG} from '../../DATA/PLAYER_DATA.jsx'

const Cyborg = () => {

=======
import {CYBORG} from "../../DATA/PLAYER_DESC.jsx";

const Cyborg = () => {



>>>>>>> 3eeff25 (ticket 003 / styiling 2.0)
    return CYBORG.map((item) => (
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
<<<<<<< HEAD
     
=======
>>>>>>> 3eeff25 (ticket 003 / styiling 2.0)
}
export default Cyborg;