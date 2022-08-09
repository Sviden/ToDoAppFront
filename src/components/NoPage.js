import React, {useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { BsEmojiFrown} from 'react-icons/bs';
import styles from '../styles/noPage.module.scss';
import Lottie from "lottie-web";
import animationData from '../styles/img/page-not-found.json';
import { BsArrowLeft } from 'react-icons/bs';


export default function NoPage () {
    const navigate = useNavigate();
   const anime = useRef(null);
   useEffect(()=>{
    Lottie.loadAnimation({
        container: anime.current,
        animationData: animationData,
        renderer: "svg", // "canvas", "html"
        loop: true, // boolean
        autoplay: true, // boolean
      });
   },[])


    return(
        <>
       <div className={styles.arrowContainer}>
            <div  onClick={() => navigate(-1)} className={styles.arrow}>
            <BsArrowLeft/>
            </div>
        </div>
        <div className={styles.container}>
        <div>Page not found <BsEmojiFrown/></div>
        <div ref={anime} className={styles.gif}></div>
        </div>  
          </>
    )
}