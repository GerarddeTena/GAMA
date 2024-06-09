import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useState, useEffect} from "react";
import ProjectSlogan from "./src/views/ProjectEslogan.jsx";
import AboutUs from "./src/views/AboutUs.jsx";
import {PlayerLab} from "./src/views/Customization&Players/PlayerLab.jsx";
import Navbar from "./src/components/Navbar.jsx";
import Human from "./src/views/Customization&Players/Human.jsx";
import Cyborg from "./src/views/Customization&Players/Cyborg.jsx";
import Reptile from "./src/views/Customization&Players/Reptile.jsx";
import Signup from "./src/views/SignUp&LogIn_Profile/SignUp.jsx";
import InjectContext from "./src/store/AppContext.jsx";
import SignIn from "./src/views/SignUp&LogIn_Profile/SignIn.jsx";
import User_Profile from "./src/views/SignUp&LogIn_Profile/User_Profile.jsx";


const Layout = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const toggleNavbar = () => {
        setIsVisible(!isVisible);
    };


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (windowWidth <= 768) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }, [windowWidth]);
    return (
        <BrowserRouter>
            <Navbar isVisible={isVisible} toggleNavbar={toggleNavbar}/>
            <Routes>
                <Route path='/' element={<ProjectSlogan />}/>
                <Route path='/about-us' element={<AboutUs />}/>
                <Route path='/player-lab-create' element={<PlayerLab />}/>
                <Route path= '/player-info-human' element={<Human />}/>
                <Route path= '/player-info-cyborg' element={<Cyborg />}/>
                <Route path= '/player-info-reptile' element={<Reptile />}/>
                <Route path= '/sign-up' element={<Signup />}/>
                <Route path= '/sign-in' element={<SignIn />}/>
                <Route path= '/user-profile' element={<User_Profile />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default InjectContext(Layout);