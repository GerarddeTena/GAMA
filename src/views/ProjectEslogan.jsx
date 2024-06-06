import SloganButtons from "../components/SloganButtons.jsx";
import '../styles/views_Styles/Stathic/ProjectSlogan.scss';
const ProjectSlogan = () => {

    const SloganTheme = [{
        title: 'Anonymous project',
       // description: "Anonymous project is our project without any name, but soon we'll choose one",

    }]
    const SloganParts = SloganTheme.map(item => {
        return (
        <>
            <main key={item.description} className='Slogan'>
                <section className='Slogan_Container'>
                    <h1 className='Slogan_Title'>{item.title}</h1>
                    {/*<h3 className='Slogan_Description' >{item.description}</h3>*/}
                    <SloganButtons/>
                </section>
            </main>
        </>
        )
    })

    return (
        <>
            {SloganParts}
        </>
    )
}

export default ProjectSlogan;