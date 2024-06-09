import SloganButtons from "../components/SloganButtons.jsx";
import '../styles/views_Styles/Stathic/ProjectSlogan.scss';

const ProjectSlogan = () => {


    return (
        <>
            <main className='Slogan'>
                <section className='Slogan_Container'>
                    <img className='Title_Image' src="src/Images/TITLE_PROJECT.png" alt="Projject title"/>
                    <div className='Char_Container'>
                        <img className='Character_BG' src="src/Images/typesOfCharacter/Walking_Reptile.gif" alt=""/>
                        <img className='Character_BG' src="src/Images/typesOfCharacter/Walking_Human.gif" alt=""/>
                        <img className='Character_BG' src="src/Images/typesOfCharacter/Walking_Cyborg.gif" alt=""/>
                    </div>

                    <SloganButtons/>
                </section>
            </main>
        </>
    )

}

export default ProjectSlogan;