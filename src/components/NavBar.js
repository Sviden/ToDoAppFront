import React, { useEffect} from "react";
import styles from "../styles/NavBar.module.scss";
import { NavLink } from "react-router-dom";
import {MdOutlineLogin} from "react-icons/md";
import { useLocation} from "react-router-dom";


export function NavBar() {
    const location = useLocation();

    useEffect(() => {

    }, [location]);

    const logOut = () => {
        if (!localStorage.getItem("rememberMeCheck")) {
            window.localStorage.clear();
        }
        window.localStorage.setItem("login", false);
        window.location.reload(true);

    };
    if (location.pathname === "/signup") {
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
    }else{
        return(<div></div>)
    }

      
    
}
