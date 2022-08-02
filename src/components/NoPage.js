import React, {useEffect, useRef} from "react";
import { BsEmojiFrown} from 'react-icons/bs';
import styles from '../styles/noPage.module.scss';
import Lottie from "lottie-web";
import animationData from '../styles/img/page-not-found.json';

export default function NoPage () {
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
        <div className={styles.container}>
        <div>Page not found <BsEmojiFrown/></div>
        <div ref={anime} className={styles.gif}></div>
        </div>
    )
}