import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "../styles/addNewTaskStyle.module.scss";
import Axios from "axios";
import moment from "moment";
import { AiOutlineCheck } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import { BsArrowLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";

export function NewTaskForm() {
    const [taskTitle, setTaskTitle] = useState("");
    const [details, setDetails] = useState("");
    const [dateToDo, setdateToDo] = useState();
    const [randomPhrase, setPhrase] = useState("");
    const [inputStyle, setInputStyle] = useState({});
    const inputTitle = useRef(null);
    const inputDetails = useRef(null);

    const clearInput = () => {
        setTaskTitle("");
        setDetails("");
        setdateToDo();
    };

    const addToList = async (e) => {
        if (!taskTitle && !details) {
            // alert('please add desc or title');
        } else {
            const date = await new Date().toDateString();
            await Axios.post("https://exchangeappback.herokuapp.com/addtask", {
                taskTitle: taskTitle,
                details: details,
                dateToDo: moment(dateToDo).format("MMMM DD, YYYY"),
                createDate: date,
                userEmail: window.localStorage.getItem("email"),
            });
            clearInput();
        }
    };

    const randPhrase = async () => {
        if (!randomPhrase) {
            const rnd = Math.floor(Math.random() * 6) + 1;
            const res = await Axios.get("https://exchangeappback.herokuapp.com/newtask");
            const phrase = res.data[rnd].text;
            setPhrase(phrase);
        }
    };
    randPhrase();

    const onInputChange = (e) => {
        setInputStyle({ backgroundColor: "rgba(255, 241, 230, 0.158)", color: "white" });
    };

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            inputDetails.current.focus();
        }
    };

    return (
        <div className={styles.mainContainer}>
            <div className={`card ${styles.cardContainer}`}>
                <p className={`${styles.phraseContainer}`}>{randomPhrase}</p>

                <label htmlFor="title">Title:</label>
                <input
                    onKeyPress={(e) => handleEnter(e)}
                    ref={inputTitle}
                    type="text"
                    className={`form-control ${styles.inputStyle}`}
                    style={inputStyle}
                    id="title"
                    placeholder=""
                    value={taskTitle}
                    onChange={(e) => {
                        setTaskTitle(e.target.value);
                    }}
                    onClick={onInputChange}
                    autoComplete="off"
                    required={true}
                />

                <label htmlFor="details">Details:</label>
                <textarea
                    className={`form-control ${styles.inputStyle}`}
                    ref={inputDetails}
                    id="details"
                    rows="3"
                    value={details}
                    style={inputStyle}
                    onChange={(e) => {
                        setDetails(e.target.value);
                    }}
                    onClick={onInputChange}
                    autoComplete="off"
                ></textarea>
                <label>Date:</label>
                <input
                    type="date"
                    className={`form-control ${styles.inputStyle}`}
                    value={dateToDo}
                    style={inputStyle}
                    onChange={(e) => {
                        setdateToDo(e.target.value);
                    }}
                    onClick={onInputChange}
                />

                <div className={styles.btnContainer}>
                    <div type="button" className={styles.button} onClick={() => addToList()}>
                        <AiOutlineCheck />
                    </div>
                    <div className={styles.button} onClick={clearInput}>
                        <MdClear />
                    </div>
                </div>
            </div>
            <div className={styles.backToAll}>
                <NavLink to="/alltasks">
                    {" "}
                    <BsArrowLeft /> ALL
                </NavLink>
            </div>
        </div>
    );
}
