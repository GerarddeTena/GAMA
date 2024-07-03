import SloganButtons from "../components/SloganButtons.tsx";
import '../styles/views_Styles/Stathic/ProjectSlogan.scss';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
const ProjectSlogan = () => {


    return (
        <>
            <section className='Slogan'>
                <section className='Slogan_Container'>
                    <img className='Title_Image' src="src/Images/TITLE_PROJECT.png" alt="Projject title"/>
                    <div className='Char_Container'>
                        <img className='Character_BG' src="src/Images/typesOfCharacter/Walking_Reptile.gif" alt=""/>
                        <img className='Character_BG' src="src/Images/typesOfCharacter/Walking_Human.gif" alt=""/>
                        <img className='Character_BG' src="src/Images/typesOfCharacter/Walking_Cyborg.gif" alt=""/>
                    </div>

                    <SloganButtons/>
                </section>
            </section>
        </>
    )

}

export default ProjectSlogan;