import SloganButtons from "../components/SloganButtons.tsx";
import '../styles/views_Styles/Stathic/ProjectSlogan.scss';
import bg from "../assets/Page_Assets/TITLE_PROJECT.png";
import rtl from "../assets/Page_Assets/Walking_Reptile.gif";
import hmn from "../assets/Page_Assets/Walking_Human.gif";
import cbr from "../assets/Page_Assets/Walking_Cyborg.gif";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
const ProjectSlogan = () => {


    return (
        <>
            <section className='Slogan'>
                <section className='Slogan_Container'>
                    <img className='Title_Image' src={bg} alt="Project title"/>
                    <div className='Char_Container'>
                        <img className='Character_BG' src={rtl} alt=""/>
                        <img className='Character_BG' src={hmn} alt=""/>
                        <img className='Character_BG' src={cbr} alt=""/>
                    </div>

                    <SloganButtons/>
                </section>
            </section>
        </>
    )

}

export default ProjectSlogan;