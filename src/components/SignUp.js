import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from '../styles/signUp.module.scss';


import axios from "axios";

export function SignUp() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
    const [userExist, setUserExist] = useState();
    const [inputWarning, setInputWarning] = useState(false);
    const [wrongInfoRender, setwrongInfoRender] = useState(false);

const onSubmit = async (e) => {
    e.preventDefault();
    if(userName && userPassword && userEmail.includes("@")){

     const newUser =  await axios.post(process.env.REACT_APP_SIGN_UP, {
       user: userName,
       password: userPassword,
       email: userEmail
      }); 

        if (newUser.data === 'userExist') {
            setUserExist(true);
            setwrongInfoRender(true);
        } else {
            setUserExist(false);
            setwrongInfoRender(false);
            window.localStorage.clear();

            navigate('/login');
        };
    }
    else{
       setInputWarning(!inputWarning);
       setwrongInfoRender(true);
    }
 


    }

    const renderWarning = () => {
        if (userExist) {
            return <p style={{ color: 'red' }}>Email already in use, use another or login</p>
        }else if(inputWarning){
            return <p style={{ color: 'red' }}>Check your information</p>
        }
    }



    return (
        <div>
            <form className={styles.form}>
                <div className={`form-group ${styles.inputField}`}>
                    <label>User name</label>
                    <input maxLength={20} type="text" className="form-control" placeholder="User name" onChange={(e) => { setUserName(e.target.value) }} />
                </div>
                <div className={`form-group ${styles.inputField}`}>
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} />
                   
                </div>

                <div className={`form-group ${styles.inputField}`}>
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => { setPassword(e.target.value) }} />
                </div>
              {wrongInfoRender ? renderWarning() : ""}
                <button type="submit" className={`btn ${styles.btn}`} onClick={(e) => onSubmit(e)}>Sign Up</button>
        <p className="forgot-password text-right">
            Already have account?  <span onClick={() => navigate('/login')}>LOGIN</span>
        </p> 

    </form>
    </div>
    )

}