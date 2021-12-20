import React, { useState, useEffect } from "react";
//import Result from "./Result";
import { Link } from "react-router-dom";

function Test(props) {
  //console.log(typeof props.ques);
  const questions = props.ques;
  //const [props.qno, props.setqno] = useState(0);
  const [thisanswer, setthisanswer] = useState();
  const [ansarre, setansarre] = useState([]);
  const [thiskey, setthiskey] = useState();
  let maintain = JSON.parse(window.localStorage.getItem("state"));
  //console.log(props.ques[props.qno].questionText);

  useEffect(() => {
    console.log(maintain);

    // [id, ques, name, answers, score, qno]
    // const index = props.answers.indexOf(questions[props.qno]._id);
    // if (index > -1) {
    //   props.answers.splice(index, 1);
    //   console.log(props.answers);
    // }
    //console.log(props.answers[0].thiskey);
    //console.log(questions);
    //console.log(questions.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.qno]);

  useEffect(() => {
    //console.log(props.answers);
    //answerCheck();
    //if (questions[0]) console.log(props.answer[props.qno].thisanswer.length);
  }, [props.answers]);

  const result = (correctans, answer) => {
    for (let i = 0; i < props.answers.length; i++) {
      if (props.answers[i].thiskey === questions[props.qno]._id) {
        if (
          props.answers[i].answer === questions[props.qno].correctOptionIndex
        ) {
          props.setscore((prevscore) => prevscore - 1);
        }
        let temp = [...props.answers];
        temp.splice(i, 1);
        props.setanswers(temp);
      }
    }
    if (questions[props.qno].type) {
      let count = 0;
      for (let i = 0; i < correctans.length; i++) {
        for (let j = 0; j < answer.length; j++) {
          if (correctans[i] === answer[j]) {
            count++;
          }
        }
      }
      if (count === correctans.length) {
        //console.log(true);
        props.setscore((prevscore) => prevscore + 1);
      }
    }
    if (correctans === answer) {
      //console.log(true);
      props.setscore((prevscore) => prevscore + 1);
    }
  };
  const finalize = () => {
    //if (props.qno >= questions.length - 1) return;
    if (!questions) return;
    let answer = questions[props.qno].type ? ansarre : thisanswer;
    props.setanswers((prevanswer) => [...prevanswer, { thiskey, answer }]);
    result(questions[props.qno].correctOptionIndex, answer);
    //console.log("Done");
  };

  const nextHandler = () => {
    if (props.qno > questions.length - 1) return;
    if (!questions) return;
    props.setqno((prevqno) => prevqno + 1);
    finalize();
  };

  const backhandler = () => {
    if (props.qno === 0) return;
    if (!questions) return;
    props.setqno((prevqno) => prevqno - 1);
    finalize();
  };

  function handleClick(answerh, key) {
    //console.log(i);
    questions[props.qno].type
      ? setansarre((prevansarre) => [...prevansarre, answerh])
      : setthisanswer(answerh);
    setthiskey(key);
  }

  const options = () => {
    let opt = [];
    for (let i = 0; i < questions[props.qno].options.length; i++) {
      opt.push(
        <div key={questions[props.qno].options[i]}>
          <input
            type={questions[props.qno].type ? "checkbox" : "radio"}
            id={questions[props.qno].options[i]}
            name='answer'
            // value={questions[props.qno].options[i]}
            value={true}
            onClick={() => handleClick(i, questions[props.qno]._id)}
          />
          <label htmlFor={questions[props.qno].options[i]}>
            {questions[props.qno].options[i]}
          </label>
        </div>
      );
    }
    return opt;
  };
  //let nom = props.qno + 1;

  return (
    <React.Fragment>
      <div>
        <h2 className='App-header'>welcome to test</h2>
        <h2>{props.name}</h2>
        <div>{questions[props.qno] ? questions[props.qno]._id : null}</div>
        <form className='formm'>
          <h4 className='question'>
            {questions[props.qno] && questions[props.qno].questionText}
          </h4>
          <div className='options'>{questions.length && options()}</div>
        </form>
        <div>
          {questions[props.qno]
            ? questions[props.qno].correctOptionIndex
            : null}
        </div>
        <div className='btnHolder'>
          <div>
            <Link to={`/Test/${props.qno - 1}`}>
              <button
                className='btn1'
                onClick={() => {
                  backhandler();
                }}>
                {questions[props.qno] === questions.length - 3
                  ? "finish"
                  : "Back"}
              </button>
            </Link>
            {/* <div>{questions[props.qno] ? questions[props.qno].correctOptionIndex : null}</div> */}
            {props.qno < questions.length - 1 ? (
              <Link to={`/Test/${props.qno + 1}`}>
                <button
                  className='btn1'
                  onClick={() => {
                    nextHandler();
                  }}>
                  Next
                </button>
              </Link>
            ) : null}
          </div>
          <div>
            <Link to='/Result'>
              <button
                className='btn'
                onClick={() => {
                  finalize();
                }}>
                Finish Test
              </button>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Test;
