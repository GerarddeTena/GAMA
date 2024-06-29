import {Link} from "react-router-dom";
import '../../styles/views_Styles/Stathic/Reptile.scss';
import {REPTILE} from "../../DATA/PLAYER_DESC.jsx";

const Reptile = () => {

    return REPTILE.map((item) => (
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
                        <Link to={'/about'} className='Link'>GO BACK</Link>
                    </button>
                </div>
            </section>
        </>
    ))
}
export default Reptile;