import React, { useEffect, useState } from "react";
import { getBakingJournal, setBakingSuccess } from "../utils/backend";
import { matrixFullName, secondsToTime } from "../utils/helpers";

const passesToStrings = (passes) => {
   if (passes.length === 1) {
      return [secondsToTime(passes[0].durationInSeconds).string];
   }

   return passes.map((eachPass) => {
      return `${eachPass.pass}:[${secondsToTime(eachPass.durationInSeconds).string}]`;
   });
};

const BakingJournal = () => {
   const [bakingList, setBackingList] = useState([]);

   const BakingJournalArrived = (BakingJournalFromBackend) => {
      setBackingList(BakingJournalFromBackend);
   };

   useEffect(() => {
      getBakingJournal(BakingJournalArrived);
   }, []);

   const okOnClick = (event) => {
      if (window.confirm("Точно всё в порядке?")) {
         setBakingSuccess(event.target.value, true);
      }
   };

   const rejectOnClick = (event) => {
      if (window.confirm("Точно всё в порядке?")) {
         setBakingSuccess(event.target.value, false);
      }
   };

   const bakingSuccess = (success, bakingID) => {
      switch (success) {
         case "true":
            return "OK";
         case "false":
            return "БРАК";
         case "???":
            return (
               <div>
                  <button
                     type="button"
                     className="btn btn-success btn-sm"
                     onClick={(e) => okOnClick(e)}
                     value={bakingID}
                  >
                     ОК
                  </button>
                  <button
                     type="button"
                     className="btn btn-danger btn-sm"
                     onClick={(e) => rejectOnClick(e)}
                     value={bakingID}
                  >
                     БРАК
                  </button>
               </div>
            );
         default:
            return success;
      }
   };

   return (
      <table className="table">
         <thead className="thead-dark">
            <tr>
               <th scope="col">#</th>
               <th scope="col">Время</th>
               <th scope="col">Матрица</th>
               <th scope="col">Выпечка</th>
               <th scope="col">Результат</th>
            </tr>
         </thead>
         <tbody>
            {bakingList.map((eachRow, index) => {
               return (
                  <tr key={eachRow.id}>
                     <th scope="row">{index + 1}</th>
                     <td>{eachRow.doc.dateTime.split("T")[1]}</td>
                     <td>{matrixFullName(eachRow.doc.matrix)}</td>
                     <td>{passesToStrings(eachRow.doc.bakingTimes).join(" ")}</td>
                     <td>{bakingSuccess(eachRow.doc.success, eachRow.id)}</td>
                  </tr>
               );
            })}
         </tbody>
      </table>
   );
};

export default BakingJournal;
