import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useState, useEffect, useContext} from "react";
import ProjectSlogan from "./src/views/ProjectEslogan.jsx";
import AboutUs from "./src/views/AboutUs.jsx";
import Navbar from "./src/components/Navbar.jsx";
import UploadWidget from "./src/components/ProfileImage.jsx";
//import { Cloudinary } from "@cloudinary/url-gen";
// import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import Human from "./src/views/Customization&Players/Human.jsx";
import Cyborg from "./src/views/Customization&Players/Cyborg.jsx";
import Reptile from "./src/views/Customization&Players/Reptile.jsx";
import Signup from "./src/views/SignUp&LogIn_Profile/SignUp.jsx";
import InjectContext from './src/store/GENERAL_CONTEXT/AppContext.jsx';
import SignIn from "./src/views/SignUp&LogIn_Profile/SignIn.jsx";
import User_Profile from "./src/views/SignUp&LogIn_Profile/User_Profile.jsx";
import PhaserConfig from "./src/src_Phaser/GameConfig/PhaserConfig.jsx";
import {AuthContext, AuthProvider} from "./src/store/GENERAL_CONTEXT/AuthContext.jsx";

// eslint-disable-next-line react-refresh/only-export-components
const Layout = () => {
    const [isVisible, setIsVisible] = useState(false);
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


    const PrivateRoute = ({component: Component, ...restOfComponents}) => {
        const {isAuthenticated} = useContext(AuthContext);
        return isAuthenticated ? <Component {...restOfComponents} /> : <Navigate to='/sign-in'/>;
    }

    return (<BrowserRouter>
        <Navbar toggleNavbar={toggleNavbar} isVisible={isVisible} />
        <AuthProvider>
            <Routes>

                <Route path='/' element={<ProjectSlogan/>}/>
                <Route path='/upload-wodget' element={<UploadWidget/>}/>
                <Route path='/about-us' element={<AboutUs/>}/>
                <Route path='/sign-up' element={<Signup/>}/>
                <Route path='/sign-in' element={<SignIn/>}/>
                {/*<Route path='/player-lab-create' element={<PrivateRoute component={PlayerLab}/>}/>*/}
                <Route path='/player-info-human' element={<PrivateRoute component={Human} />}/>
                <Route path='/player-info-cyborg' element={<PrivateRoute component={Cyborg} />}/>
                <Route path='/player-info-reptile' element={<PrivateRoute component={Reptile} />}/>
                <Route path='/user-profile' element={<PrivateRoute component={User_Profile} />}/>
                <Route path='/game' element={<PrivateRoute component={PhaserConfig}/>}/>
            </Routes>
        </AuthProvider>
    </BrowserRouter>)
}

// eslint-disable-next-line react-refresh/only-export-components
export default InjectContext(Layout);