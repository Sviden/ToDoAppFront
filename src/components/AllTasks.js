import React, { useState, useEffect } from "react";
import Axios from "axios";
import styles from "../styles/AllTasks.module.scss";
import { EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";
import axios from "axios";
import { GrAdd } from "react-icons/gr";
import { NavLink } from "react-router-dom";




export function AllTasks() {
    let [taskList, setTaskList] = useState([]);
    const [userName, setUserName] = useState("");
    const [shouldRerender, setShouldRerender] = useState();
    const [newDescription, setNewDescription] = useState();
    const userMail = window.localStorage.getItem("email");

    useEffect(() => {
            getUserName(userMail);
            createTaskList();
           

    }, [shouldRerender]);

    const getUserName = async (email) => {
        const userData = await axios.get(`${process.env.REACT_APP_GET_USER_NAME}=${email}`);
        setUserName(userData.data);
    };
    const createTaskList = async () => {
        const tasks = await Axios.get(`${process.env.REACT_APP_ALL_TASKS}=${userMail}`);
        console.log(tasks.data);
        setTaskList(tasks.data);
    };

    const deleteOp = async (e, id) => {
        const task = id;      
        console.log(task);
        await Axios.delete(`${process.env.REACT_APP_DELETE_TASK}/${id}/${userMail}`);
        setShouldRerender(!shouldRerender);
    };

    const updateTask = async (description, id, isChecked) => {
        await setUpdatedTask(id, description, isChecked);
        setShouldRerender(!shouldRerender);
       
    };

    const setUpdatedTask = async (id, desc, isChecked) => {
        await Axios.put(`${process.env.REACT_APP_UPDATE_TASK}/${id}`, {
            details: desc,
            isChecked: isChecked
        });
    };



    return (
        <div className={styles.mainContainer}>
            <div className={`container ${styles.tasksContainer}`}>
                <div className={styles.userName}> {userName}</div>

                <h1 className={styles.headerStyle}>You have {taskList.length} tasks</h1>
                {taskList.map((el, key) => {
                    console.log(el);
                    return (
                        <div id={key} key={key} className={`${styles.liContainer}`}>
                            <li className={`row ${styles.titleContainer}`}>
                                <input className={styles.taskCheckbox} id={el._id} type="checkbox" name={el.key} onChange={async e => await updateTask(el.description, el._id, !el.isChecked)} checked={el.isChecked}>
                                </input>
                                <p className={styles.taskTitle}>
                                    {el.title}
                                </p>
                            </li>
                            <div className={styles.descriptionContainer}>
                                <EditTextarea rows={2} name="textbox1" value={newDescription ? newDescription : el.description} onChange={e => setNewDescription(e.target.value)} onSave={(e) => updateTask(e.value, el._id, el.isChecked)} className={styles.descriptionField} style={{ whiteSpace: "initial", height: "fit-content" }} />
                            </div>
                            <small className={styles.dateToDo}>{el.dateToDo}</small>
                            <br></br>
                            <small onClick={(e) => deleteOp(e, el._id)} className={styles.deleteTask} id={key}> Delete</small>{" "}
                        </div>
                    );
                })}
            </div>
            <div className={styles.addTaskFooter}>
                <NavLink exact="true" to="/newtask">
                    Add task <GrAdd />
                </NavLink>
            </div>
        </div>
    );
}
