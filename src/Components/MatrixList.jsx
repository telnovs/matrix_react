/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useEffect } from "react";
import { getMatrices, getLastSuccessBaking } from "../utils/backend";
import { matrixFullName } from "../utils/helpers";
import Timer from "./Timer";

const MatrixList = () => {
   const [matrixList, setMatrixList] = useState([]);

   const [timerSeconds, setTimerSeconds] = useState(0);

   const [selectedMatrix, setSelectedMatrix] = useState({});

   const listOfMatricesArrived = (matricesFromBackend) => {
      setMatrixList(matricesFromBackend);
   };

   useEffect(() => {
      getMatrices(listOfMatricesArrived);
   }, []);

   const lastSuccessBakingArrived = (lastSuccessBaking) => {
      if (lastSuccessBaking.length > 0) {
         setTimerSeconds(lastSuccessBaking[0].value[0].durationInSeconds);
      }
   };

   const matrixByID = (matrixID) => {
      const matrix = matrixList.find((item) => item.id === matrixID);
      // eslint-disable-next-line no-underscore-dangle
      matrix.key._id = matrixID;
      return matrix.key;
   };

   const selectOnChange = (event) => {
      setSelectedMatrix(matrixByID(event.target.value));
      getLastSuccessBaking(event.target.value, lastSuccessBakingArrived);
   };

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
            </div>
            <Timer timerSeconds={timerSeconds} matrix={selectedMatrix} />
         </form>
      </div>
   );
};

export default MatrixList;
