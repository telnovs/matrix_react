import { useEffect, useRef, useState } from "react";

const usePreciseTimer = (handler, periodInMilliseconds, activityFlag) => {
   const [timeDelay, setTimeDelay] = useState(1);
   const savedCallback = useRef(null);
   const initialTime = useRef(null);

   useEffect(() => {
      savedCallback.current = handler;
   }, [handler]);

   // eslint-disable-next-line consistent-return
   useEffect(() => {
      if (activityFlag) {
         initialTime.current = Date.now();
         const id = setInterval(() => {
            const currentTime = Date.now();
            const delay = currentTime - initialTime.current;
            initialTime.current = currentTime;
            setTimeDelay(delay / 1000);
            savedCallback.current(timeDelay);
         }, periodInMilliseconds);

         return () => {
            clearInterval(id);
         };
      }
   }, [periodInMilliseconds, activityFlag, timeDelay]);
};

export default usePreciseTimer;
