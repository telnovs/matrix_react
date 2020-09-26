import React, { useEffect, useState } from "react";
import usePreciseTimer from "./usePreciseTimer";
import { secondsToTime } from "../utils/helpers";

const Timer = (props) => {
   let { startFlag } = props;
   const { timerSeconds } = props;

   const [timer, setTimer] = useState(0);

   const timerTikTak = (delay) => {
      if (timer > 0) {
         setTimer(timer - delay);
         console.log("тик-так... ", delay);
      }
      startFlag = false;
   };

   useEffect(() => {
      setTimer(timerSeconds);
   }, [timerSeconds, startFlag]);

   usePreciseTimer(timerTikTak, 1000, startFlag);

   return <div className="display-1">{`${secondsToTime(Math.ceil(timer)).string}`}</div>;
};

export default Timer;
