//import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Quiz from "./components/Quiz";
// eslint-disable-next-line no-unused-vars
import Test from "./components/Test";
import Result from "./components/Result";

export const IdContext = React.createContext();
export const DataContext = React.createContext();

function App() {
  const [id, setid] = useState();
  const [ques, setques] = useState({});
  const [name, setname] = useState("");
  const [answers, setanswers] = useState([]);
  const [score, setscore] = useState(0);
  const [qno, setqno] = useState();

  useEffect(() => {
    document.title = "Interview Portal";
    return () => {
      localStorage.clear();
      setid();
      setques({});
      setname("");
      setanswers([]);
      setscore(0);
      store();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    store();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, answers, name, ques, id]);
  // useEffect(() => {
  //   setid(0);
  //   setques({});
  //   setname("");
  //   setanswers([]);
  //   setscore(0);
  //   setqno(0);
  // }, []);
  //useEffect(() => {}, [ques, score, name, id, ques, answers]);
  const store = () => {
    let maintain = [id, ques, name, answers, score, qno];
    window.localStorage.setItem("state", JSON.stringify(maintain));
  };
  // const retrive = () => {
  //   let maintain = JSON.parse(window.localStorage.getItem("state"));
  //   return maintain;
  // };

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
                setqno={setqno}
                store={store}
              />
            }></Route>
          <Route
            path='/Test/:qno'
            element={
              <Test
                store={store}
                setid={setid}
                id={id}
                setques={setques}
                ques={ques}
                name={name}
                setname={setname}
                setanswers={setanswers}
                answers={answers}
                setscore={setscore}
                score={score}
                qno={qno}
                setqno={setqno}
              />
            }></Route>

          <Route
            path='/Result'
            element={
              <Result
                store={store}
                score={score}
                setscore={setscore}
                outof={ques.length}
                id={id}
                setid={setid}
                setques={setques}
              />
            }></Route>
          {/* <Route path='/Result' element={<Result />}></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
