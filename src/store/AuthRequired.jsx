// import {useNavigate} from "react-router-dom";
// import {useEffect} from "react";
//
// const AuthRequired = (ToAuthorizedComponent) => {
//     const Container = (props) => {
//         const navigate = useNavigate();
//         const token = localStorage.getItem('token');
//         useEffect(() => {
//             if(!token) navigate('/sign-in');
//         }, [navigate, token]);
//         return token ? <ToAuthorizedComponent {...props}/> : null;
//     }
//     return Container;
// }
//
// export default AuthRequired;