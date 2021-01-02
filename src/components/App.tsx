import React from 'react';
import '../App.css';
import Clock from "./Clock";
import TextAreaCounter from "./TextAreaCounter";

function App() {
  return (
    <div className="App">
      <Clock />
      <TextAreaCounter defaultText="Ultra" />
    </div>
  );
}

export default App;
