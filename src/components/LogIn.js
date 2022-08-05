import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import styles from "../styles/login.module.scss";

import axios from "axios";

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMeCheck, setRememberMeCheck] = useState(false);
    const [wrongInput, setWrongInputDislay] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("rememberMeCheck")) {
            setPassword(localStorage.getItem("password"));
            setEmail(localStorage.getItem("email"));
        }

        console.log(localStorage.getItem("rememberMeCheck"));
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        const resData = await axios.post(process.env.REACT_APP_LOGIN, {
            email,
            password,
        });

        console.log(resData);
        if (resData.data === "User does not exist") {
            console.log("error: user does not exist");
            setWrongInputDislay(true);
        } else {
            window.localStorage.setItem("email", resData.data.email);
            setWrongInputDislay(false);
            if (rememberMeCheck) {
                localStorage.setItem("password", resData.data.password);
                localStorage.setItem("rememberMeCheck", rememberMeCheck);
            }
            navigate("/alltasks");
        }
    };

    return (
        <>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className={styles.inputContainer}>
                    <label>Email</label>
                    <input
                        value={email}
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <small style={{ color: "red", display: wrongInput ? "block" : "none" }}>Check your Email</small>
                </div>

                <div className={styles.inputContainer}>
                    <label for="passwod">Password</label>
                    <input
                        id="password"
                        value={password}
                        type={showPassword ? "text" : "password"}
                        className={`form-control`}
                        placeholder="Enter password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    ></input>
                    <span className={styles.eyeIcon} onClick={(e) => setShowPassword(!showPassword)}>
                        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </span>
                    <small style={{ color: "red", display: wrongInput ? "block" : "none" }}>Check your Password</small>
                </div>

                <div className={styles.rememberMeCheck}>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" checked={rememberMeCheck} onChange={(e) => setRememberMeCheck(!rememberMeCheck)} />
                        <label className="custom-control-label" htmlFor="customCheck1">
                            Remember me
                        </label>
                    </div>
                </div>

                <button type="submit" className={`btn btn-block ${styles.btn}`}>
                    Submit
                </button>
                <p className="forgot-password text-right">
                </p> 
                <p>Or</p>
                <button onClick={() => navigate('/signup')} className={`btn btn-block ${styles.btnSignUp}`}>
               Join
                </button>
            </form>
           
            {/* <div className={styles.createAccBtn}>
                <p>
                    <a href="/signup">Create your ToDo Accaunt</a>
                </p>
            </div> */}
        </>
    );
}
