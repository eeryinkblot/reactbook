import React from 'react';
import '../App.css';
import Excel from "./Excel";
import excelData from "../excelData";

function App() {
  return (
    <div className="App">
        <Excel headers={excelData[0]}
               initialData={excelData[1]} />
    </div>
  );
}

export default App;
