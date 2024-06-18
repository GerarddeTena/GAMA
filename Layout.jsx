import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
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
import PhaserConfig from "./src/src_Phaser/GameConfig/PhaserConfig.jsx";


const serverURL = import.meta.env.VITE_APP_CODESPACES ? `https://${import.meta.env.VITE_APP_CODESPACE_NAME}-3001.app.github.dev` : 'http://localhost:3001';

// eslint-disable-next-line react-refresh/only-export-components
const Layout = () => {

    const [isVisible, setIsVisible] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const validToken = async () => {

        try {

            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
            }

            const response = await fetch(`${serverURL}/api/validate-token`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setIsAuthenticated(true);

            } else {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
            }


        } catch (error) {

            console.error({ 'Error validating token': error });
            localStorage.removeItem('token');
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        validToken().then(() => console.log('Token validated'))
    }, [isAuthenticated]);

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


    const PrivateRoute = ({component: Component, ...restOfComponents}) => {
        console.log('isAuthenticated', isAuthenticated);
        return isAuthenticated ? <Component {...restOfComponents} /> : <Navigate to='/'/>;
    }

    return (
        <BrowserRouter>
            <Navbar isVisible={isVisible} toggleNavbar={toggleNavbar} />
            <Routes>
                <Route path='/' element={<ProjectSlogan />} />
                <Route path='/about-us' element={<AboutUs />} />
                <Route path='/sign-up' element={<Signup />} />
                <Route path='/sign-in' element={<SignIn />} />
                <Route
                    path='/player-lab-create'
                    element={<PrivateRoute component={PlayerLab} />}
                />
                <Route
                    path='/player-info-human'
                    element={<PrivateRoute component={Human} />}
                />
                <Route
                    path='/player-info-cyborg'
                    element={<PrivateRoute component={Cyborg} />}
                />
                <Route
                    path='/player-info-reptile'
                    element={<PrivateRoute component={Reptile} />}
                />
                <Route
                    path='/user-profile'
                    element={<PrivateRoute component={User_Profile} />}
                />
                <Route
                   path='/game'
                   element={<PhaserConfig />}
                />
            </Routes>
        </BrowserRouter>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export default InjectContext(Layout);