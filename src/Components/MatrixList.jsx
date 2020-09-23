import React, { useState, useEffect } from "react";
import { getMatrices, getLastSuccessBaking } from "../utils/backend";
import { matrixFullName, secondsToTime } from "../utils/helpers";

const MatrixList = () => {
   const [timerMinutes, setTimerMinutes] = useState("00");
   const [timerSeconds, setTimerSeconds] = useState("00");

   const [matrixList, setMatrixList] = useState([]);

   const listOfMatricesArrived = (matricesFromBackend) => {
      setMatrixList(matricesFromBackend);
   };

   useEffect(() => {
      getMatrices(listOfMatricesArrived);
   }, []);

   const minutesOnInput = (event) => {
      setTimerMinutes(event.target.value);
   }

   const secondsOnChange = (event) => {
      setTimerSeconds(event.target.value);
   }

   const lastSuccessBakingArrived = (lastSuccessBaking) => {
      if (lastSuccessBaking.length === 0) {
         return;
      }
      const tempTime = secondsToTime(lastSuccessBaking[0].value[0].durationInSeconds);
      setTimerMinutes(`${tempTime.minutes}`);
      setTimerSeconds(`${tempTime.seconds}`);
   }

   const selectOnChange = (event) => {
      getLastSuccessBaking(event.target.value, lastSuccessBakingArrived);
   }

   return (
      <div>
         <form>
            <div className="form-group">
               <label htmlFor="exampleFormControlSelect1">Список матриц:</label>
               <select className="form-control" id="exampleFormControlSelect1" onChange={(e) => {selectOnChange(e)}}>
                  {matrixList.map((eachMatrix, index) => {
                     const { id, key } = eachMatrix;
                     return <option key={id} value={id}>{matrixFullName(key)}</option>;
                  })}
               </select>
               <div className="input-group mb-3">
                  <input
                     type="number"
                     min={0}
                     max={20}
                     className="form-control"
                     placeholder="мин"
                     onInput={(e) => {minutesOnInput(e)}}
                     value={timerMinutes}
                  />
                  <div className="input-group-append">
                     <span className="input-group-text" id="basic-addon2">:</span>
                  </div>
                  <input
                     type="number"
                     min={0}
                     max={59}
                     className="form-control"
                     placeholder="сек"
                     onChange={(e) => {secondsOnChange(e)}}
                     value={timerSeconds}
                  />
                  <button type="button" className="btn btn-danger">Запуск!</button>
               </div>
               <div className="display-1">{timerMinutes.toString().padStart(2, "0")}:{timerSeconds.toString().padStart(2, "0")}</div>
            </div>
         </form>
      </div>
   );
};

export default MatrixList;
