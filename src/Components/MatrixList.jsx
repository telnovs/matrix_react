import React, { useState, useEffect } from "react";
import { getMatrices, getLastSuccessBaking } from "../utils/backend";
import { matrixFullName, secondsToTime } from "../utils/helpers";
import Timer from "./Timer";

const MatrixList = () => {
   const [timerMinutes, setTimerMinutes] = useState(0);
   const [timerSeconds, setTimerSeconds] = useState(0);

   const [matrixList, setMatrixList] = useState([]);

   const [startFlag, setStartFlag] = useState(false);

   const listOfMatricesArrived = (matricesFromBackend) => {
      setMatrixList(matricesFromBackend);
   };

   useEffect(() => {
      getMatrices(listOfMatricesArrived);
   }, []);

   const minutesOnChange = (event) => setTimerMinutes(parseInt(event.target.value, 10));

   const secondsOnChange = (event) => setTimerSeconds(parseInt(event.target.value, 10));

   const lastSuccessBakingArrived = (lastSuccessBaking) => {
      if (lastSuccessBaking.length === 0) {
         return;
      }

      const tempTime = secondsToTime(lastSuccessBaking[0].value[0].durationInSeconds);
      setTimerMinutes(tempTime.minutes);
      setTimerSeconds(tempTime.seconds);
   };

   const selectOnChange = (event) => {
      getLastSuccessBaking(event.target.value, lastSuccessBakingArrived);
   };

   const startButtonOnClick = () => setStartFlag(true);

   return (
      <div>
         <form>
            <div className="form-group">
               <label htmlFor="matrixListSelect">Список матриц:</label>
               <select
                  className="form-control"
                  id="matrixListSelect"
                  onChange={(e) => {
                     selectOnChange(e);
                  }}
               >
                  {matrixList.map((eachMatrix) => {
                     const { id, key } = eachMatrix;
                     return (
                        <option key={id} value={id}>
                           {matrixFullName(key)}
                        </option>
                     );
                  })}
               </select>
               <div className="input-group mb-3">
                  <input
                     type="number"
                     className="form-control"
                     placeholder="мин"
                     onChange={(e) => {
                        minutesOnChange(e);
                     }}
                     value={timerMinutes}
                  />
                  <div className="input-group-append">
                     <span className="input-group-text" id="basic-addon2">
                        :
                     </span>
                  </div>
                  <input
                     type="number"
                     className="form-control"
                     placeholder="сек"
                     onChange={(e) => {
                        secondsOnChange(e);
                     }}
                     value={timerSeconds}
                  />
                  <button
                     type="button"
                     className="btn btn-danger"
                     onClick={() => {
                        startButtonOnClick();
                     }}
                  >
                     Запуск!
                  </button>
               </div>
               <Timer timerSeconds={timerMinutes * 60 + timerSeconds} startFlag={startFlag}/>
            </div>
         </form>
      </div>
   );
};

export default MatrixList;
