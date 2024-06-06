import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProjectSlogan from "./src/views/ProjectEslogan.jsx";
import AboutUs from "./src/views/AboutUs.jsx";
import {PlayerLab} from "./src/views/Customization&Players/PlayerLab.jsx";
import './Layout.css';
import Navbar from "./src/components/Navbar.jsx";
import Human from "./src/views/Customization&Players/Human.jsx";
import Cyborg from "./src/views/Customization&Players/Cyborg.jsx";
import Reptile from "./src/views/Customization&Players/Reptile.jsx";
import Signup from "./src/views/SignUp&LogIn_Profile/SignUp.jsx";
import InjectContext from "./src/store/AppContext.jsx";


const Layout = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<ProjectSlogan />}/>
                <Route path='/about-us' element={<AboutUs />}/>
                <Route path='/player-lab-create' element={<PlayerLab />}/>
                <Route path= '/player-info-human' element={<Human />}/>
                <Route path= '/player-info-cyborg' element={<Cyborg />}/>
                <Route path= '/player-info-reptile' element={<Reptile />}/>
                <Route path= '/sign-up' element={<Signup />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default InjectContext(Layout);