import React, { useEffect,useRef } from "react";
import styles from "../styles/NavBar.module.scss";
import { NavLink } from "react-router-dom";
import {MdOutlineLogin} from "react-icons/md";
import { BsArrowLeft } from 'react-icons/bs';
import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-web";
import LottieOnLog from '../styles/img/login-anime.json'

export function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();

    // const [userLog, setUserLog] = useState(true);
    const animeLog = useRef(null);

    useEffect(() => {
      Lottie.loadAnimation({
        container: animeLog.current,
        animationData: LottieOnLog,
        renderer: "svg", 
        loop: true, 
        autoplay: true, 
      });
        // localStorage.getItem("email") ? setUserLog(true) : setUserLog(false);

    }, [location]);

    const logOut = () => {
        if (!localStorage.getItem("rememberMeCheck")) {
            window.localStorage.clear();
        }
        // setUserLog(false);
        window.localStorage.setItem("login", false);
        // navigate('/login');
        window.location.reload(true);

    };

    if (location.pathname === "/login" || location.pathname === "/") {
        return (
            <div className={styles.onLogin}>
                <p>Log In</p>
                <div className={styles.gifContainer} ref={animeLog}></div>
            </div>
        );
    } else if (location.pathname === "/signup") {
        return (
            <div className={styles.onSignUp}>
                <div>Create your account </div>
            </div>
        );
    }else if(location.pathname === "/alltasks" || location.pathname === "/newtask"){  
      return (
            <div className={styles.logOutContainer}>
                <NavLink exact="true" to="/login" className={styles.logOutBtn} onClick={() => logOut()}>
                  <MdOutlineLogin/> 
                </NavLink>
            </div>
        );
    }
     else {
      return (
        <div className={styles.noPage}>
            <div  onClick={() => navigate(-1)} className={styles.logOutBtn}>
            <BsArrowLeft/>
            </div>
        </div>
    );
      
    }
}
