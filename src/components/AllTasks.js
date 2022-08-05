import React, { useState, useEffect,useRef } from "react";
import Axios from "axios";
import styles from "../styles/AllTasks.module.scss";
import { EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";
import axios from "axios";
import { GrAdd } from "react-icons/gr";
import { NavLink } from "react-router-dom";



export function AllTasks() {
    let [taskList, setTaskList] = useState([]);
    const [details, setUpdateDescription] = useState();
    const [updateID, setUpdateID] = useState();
    const [userName, setUserName] = useState("");
    const [checkedTask, setCheckTask] = useState([]);
    const userMail = window.localStorage.getItem("email");
     const anime = useRef(null);
     
    useEffect(() => {
       const checkFromStorage = localStorage.getItem('checkedTasks');
       checkFromStorage && setCheckTask(checkFromStorage.split(','));
        getUserName(userMail);
        if (userMail) {
            createTaskList();
            updateID && setUpdatedTask(updateID);
        }
    }, [details]);

    const getUserName = async (email) => {
        const userData = await axios.get(`${process.env.REACT_APP_GET_USER_NAME}=${email}`);
        setUserName(userData.data);
    };
    const createTaskList = async () => {
        const tasks = await Axios.get(`${process.env.REACT_APP_ALL_TASKS}=${userMail}`);
        setTaskList(tasks.data);
    };

    const deleteOp = async (e,id) => {
        const task = e.target.id;
         let arr = checkedTask.filter(el => el !== task);
        setCheckTask(arr);
        console.log(id);
        await Axios.delete(`${process.env.REACT_APP_DELETE_TASK}/${id}/${userMail}`);
        createTaskList();
    };

    const updateTask = async (e, id) => {
        setUpdateDescription(e.value);
        setUpdateID(id);
        console.log(details, updateID);
    };

    const setUpdatedTask = async (id) => {
        await Axios.put(`${process.env.REACT_APP_UPDATE_TASK}/${id}`, {
            details: details,
        });
    };

    const checkBoxHandler = (el) => {
        const task = el.target.id;
        let arr = checkedTask;
        if(!arr.includes(task)){
            console.log('not includes ' + task);
            arr.push(task);
            
        }else{
             arr = arr.filter(el => el !== task);
            setCheckTask(arr);
         
        }
        console.log(arr,arr.length)
        arr.length === 0 ? localStorage.removeItem('checkedTasks') : localStorage.setItem('checkedTasks', arr);
    }
    return (
        <div className={styles.mainContainer}>
            <div className={`container ${styles.tasksContainer}`}>
                <div className={styles.userName}> {userName}</div>

                <h1 className={styles.headerStyle}>You have {taskList.length} tasks</h1>
                {taskList.map((el, key) => {
                    return (
                        <div id={key} key={key} className={`${styles.liContainer}`}>
                            <li className={`row ${styles.titleContainer}`}>
                                <input className={styles.taskCheckbox} id={`custom-checkbox-${key}`} type="checkbox" name={el.key} ref={el.key} onChange={e=>checkBoxHandler(e)} defaultChecked={checkedTask.includes(`custom-checkbox-${key}`) ? true : false}> 
                                </input>
                                <p className={styles.taskTitle}>
                                    {el.title}
                                </p>
                            </li>
                          <div className={styles.descriptionContainer}><EditTextarea rows={2} name="textbox1" defaultValue={el.description} onSave={(e) => updateTask(e, el._id)} className={styles.descriptionField} style={{whiteSpace: "initial", height: "fit-content"}}/></div>
                            <small className={styles.dateToDo}>{el.dateToDo}</small>
                            <br></br>
                            <small onClick={(e) => deleteOp(e,el._id)}  className={styles.deleteTask}> Delete</small>{" "}
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
