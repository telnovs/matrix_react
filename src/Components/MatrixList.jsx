import React, { useState, useEffect } from "react";
import { getMatrices, getLastSuccessBaking } from "../utils/backend";
import { matrixFullName, secondsToTime } from "../utils/helpers";

const MatrixList = () => {
   const [timer, setTimer] = useState(secondsToTime(0));

   const [matrixList, setMatrixList] = useState([]);

   const listOfMatricesArrived = (matricesFromBackend) => {
      setMatrixList(matricesFromBackend);
   };

   useEffect(() => {
      getMatrices(listOfMatricesArrived);
   }, []);

   const timerOnInput = (event, type) => {
      switch (type) {
         case "минуты":
            setTimer(secondsToTime(parseInt(event.target.value) * 60 + timer.seconds));
            break;
         case "секунды":
            setTimer(secondsToTime(timer.minutes * 60 + parseInt(event.target.value)));
            break;
         default:
            break;
      }
   }

   const lastSuccessBakingArrived = (lastSuccessBaking) => {
      if (lastSuccessBaking.length === 0) {
         return;
      }
      setTimer(secondsToTime(lastSuccessBaking[0].value[0].durationInSeconds));
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
                     className="form-control"
                     placeholder="мин"
                     onInput={(e) => {timerOnInput(e, "минуты")}}
                     defaultValue={timer.minutes}
                  />
                  <div className="input-group-append">
                     <span className="input-group-text" id="basic-addon2">:</span>
                  </div>
                  <input
                     type="number"
                     className="form-control"
                     placeholder="сек"
                     onChange={(e) => {timerOnInput(e, "секунды")}}
                     defaultValue={timer.seconds}
                  />
                  <button type="button" className="btn btn-danger">Запуск!</button>
               </div>
               <div className="display-1">{timer.string}</div>
            </div>
         </form>
      </div>
   );
};

export default MatrixList;
