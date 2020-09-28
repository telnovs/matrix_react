import React, { useEffect, useState, useRef } from "react";
import { secondsToTime } from "../utils/helpers";
import { addNewBaking } from "../utils/backend";

const Timer = (props) => {
   const [timer, setTimer] = useState(0);
   const [startFlag, setStartFlag] = useState(false);
   const { timerSeconds, matrix } = props;

   const timerTikTak = useRef(null);
   const intervalObject = useRef(null);
   const startTime = useRef(null);

   const bakingSeconds = useRef(null);

   const soundClick = () => {
      const audio = new Audio(); // Создаём новый элемент Audio
      audio.src = 'dolgij-svistok-sudi.mp3'; // Указываем путь к звуку "клика"
      audio.autoplay = true; // Автоматически запускаем
    }

   timerTikTak.current = (delay) => {
      const tempTimer = timer - delay;

      if (tempTimer <= 0) {
         setStartFlag(false);
         clearInterval(intervalObject.current);
         soundClick();
         addNewBaking(matrix, bakingSeconds.current);
      }
      setTimer(tempTimer);
   };

   useEffect(() => {
      setTimer(timerSeconds);
   }, [timerSeconds]);

   // eslint-disable-next-line consistent-return
   useEffect(() => {
      if (startFlag) {
         startTime.current = Date.now();
         intervalObject.current = setInterval(() => {
            const currentTime = Date.now();
            const delay = currentTime - startTime.current;
            startTime.current = currentTime;
            timerTikTak.current(delay / 1000);
         }, 1000);

         return () => {
            clearInterval(intervalObject.current);
         };
      }
   }, [startFlag]);

   return (
      <div className="container">
         <div className="row justify-content-between">
            <div className="col-6 text-left">
               <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                     setTimer(timer + 60);
                  }}
               >
                  +1
               </button>
               <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                     setTimer(timer - 60);
                  }}
               >
                  -1
               </button>
            </div>
            <div className="col-6 text-right">
               <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                     setTimer(timer + 5);
                  }}
               >
                  +5
               </button>
               <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                     setTimer(timer - 5);
                  }}
               >
                  -5
               </button>
            </div>
         </div>
         <div className="display-1 text-center">{`${secondsToTime(Math.ceil(timer)).string}`}</div>
         <button
            type="button"
            className="btn btn-danger btn-lg btn-block"
            onClick={() => {
               setStartFlag(true);
               bakingSeconds.current = timer;
            }}
         >
            Запуск
         </button>
      </div>
   );
};

export default Timer;
