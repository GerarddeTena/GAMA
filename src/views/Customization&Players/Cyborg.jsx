import {Link} from "react-router-dom";
import '../../styles/views_Styles/Stathic/Characters/Cyborg.scss';
import {CYBORG} from "../../DATA/PLAYER_DESC.jsx";

const Cyborg = () => {

    return CYBORG.map((item) => (
        <main key={item.name}>
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
                        <Link to={'/about'} className='Link'>GO BACK</Link>
                    </button>
                </div>
            </section>
        </main>
    ))
}
export default Cyborg;