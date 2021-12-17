//import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Quiz from "./components/Quiz";
// eslint-disable-next-line no-unused-vars
import Test from "./components/Test";

export const IdContext = React.createContext();
export const DataContext = React.createContext();

function App() {
  const [id, setid] = useState();
  const [ques, setques] = useState({});
  const [name, setname] = useState("");
  const [start, setstart] = useState(true);

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <Quiz
                setid={setid}
                setques={setques}
                setname={setname}
                setstart={setstart}
                start={start}
              />
            }></Route>
          <Route
            path='/Test'
            element={<Test id={id} ques={ques} name={name} />}></Route>
          {/* <IdContext value={id}>
        <DataContext value={ques}>{id ? <Test /> : null}</DataContext>
      </IdContext> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
