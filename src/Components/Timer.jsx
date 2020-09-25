import React, { useEffect, useState } from "react";
import { secondsToTime } from "../utils/helpers";

const Timer = (props) => {
   let startFlag = props.start;
   let timerSeconds = props.seconds;

   const [timer, setTimer] = useState(0);

   useEffect(() => {
      if (startFlag) {
         const intervalID = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
         }, 1000);
      }
   }, [startFlag]);

   useEffect(() => {
      setTimer(timerSeconds);
   }, [timerSeconds]);

   return <div className="display-1">{`${secondsToTime(timer).string}`}</div>;
};

export default Timer;
