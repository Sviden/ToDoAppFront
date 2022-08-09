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

const onSubmit = async (e) => {
    e.preventDefault();
   const newUser =  await axios.post(process.env.REACT_APP_SIGN_UP, {
       user: userName,
       password: userPassword,
       email: userEmail
   }); 

        console.log(newUser.data);

        if (newUser.data === 'userExist') {
            setUserExist(true);
        } else {
            setUserExist(false);
            window.localStorage.clear();

            navigate('/login');
        };


    }

    const renderWarning = () => {
        if (userExist) {
            return <p style={{ color: 'red' }}>Email already in use, use another or login</p>
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
                    {renderWarning()}
                </div>

                <div className={`form-group ${styles.inputField}`}>
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => { setPassword(e.target.value) }} />
                </div>

                <button type="submit" className={`btn ${styles.btn}`} onClick={(e) => onSubmit(e)}>Sign Up</button>
        <p className="forgot-password text-right">
            Already have account?  <span onClick={() => navigate('/login')}>LOGIN</span>
        </p> 

    </form>
    </div>
    )

}