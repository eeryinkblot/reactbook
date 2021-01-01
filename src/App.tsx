import React from 'react';
import './App.css';
import Clock from "./components/Clock";
import TextAreaCounter from "./components/TextAreaCounter";

function App() {
  return (
    <div className="App">
      <Clock />
      <TextAreaCounter defaultText="Ultra" />
    </div>
  );
}

export default App;
