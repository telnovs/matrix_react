import React from "react";
import "./App.css";
import MatrixList from "./Components/MatrixList";
import BakingJournal from "./Components/BakingJournal";

function App() {
   return (
      <div className="App container">
         <div className="row">
            <div className="col-3">
               <MatrixList />
            </div>
            <div className="col-9">
               <BakingJournal />
            </div>
         </div>
      </div>
   );
}

export default App;
