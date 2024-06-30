import {Link} from "react-router-dom";
import '../../styles/views_Styles/Stathic/Characters/Human.scss';
import {HUMAN} from "../../DATA/PLAYER_DESC.tsx";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

const Human = () => {


    return HUMAN.map((item) => (

        <main key={item.name}>
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
                        <Link to={'/about'} className='Link'>GO BACK</Link>
                    </button>
                </div>
            </section>
        </main>
    ))
}
export default Human;