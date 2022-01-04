import React from "react";
import ToDos from './components/ToDos'
import "./App.css";

type Todo = {
  id?: number;
  name: string;
  completed: boolean;
};

function App() {

  return (
    <div className="App">
    <ToDos />
    </div>
  );
}

export default App;
