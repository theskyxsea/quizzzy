import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

function Test(props) {
  const questions = props.ques.length >= 1 ? props.ques : retrive()[1];
  const [thisanswer, setthisanswer] = useState();
  const [ansarre, setansarre] = useState([]);
  const [thiskey, setthiskey] = useState();
  //const questions = props.ques ? props.ques : maintain[1];

  function retrive() {
    let maintain = JSON.parse(window.localStorage.getItem("state"));
    return maintain;
  }
  let maintain = retrive();

  useEffect(() => {
    //console.log(questions);
    if (!props.id) {
      props.setid(maintain[0]);
      props.setques(maintain[1]);
      props.setname(maintain[2]);
      props.setanswers(maintain[3]);
      props.setscore(maintain[4]);
      props.setqno(maintain[5]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        props.setscore((prevscore) => prevscore + 1);
      }
    }
    if (correctans === answer) {
      props.setscore((prevscore) => prevscore + 1);
    }
  };
  const finalize = () => {
    let answer = questions[props.qno].type ? ansarre : thisanswer;
    props.setanswers((prevanswer) => [...prevanswer, { thiskey, answer }]);
    result(questions[props.qno].correctOptionIndex, answer);
    props.store();
  };

  const nextHandler = () => {
    if (props.qno > questions.length - 2) return;
    if (!questions) return;
    props.setqno((prevqno) => prevqno + 1);
    finalize();
  };

  const backhandler = () => {
    if (props.qno < 0) return;
    if (!questions) return;
    props.setqno((prevqno) => prevqno - 1);
    finalize();
  };

  function handleClick(answerh, key) {
    questions[props.qno].type
      ? setansarre((prevansarre) => [...prevansarre, answerh])
      : setthisanswer(answerh);
    setthiskey(key);
  }

  useEffect(() => {
    //console.log(props.answers[props.qno].answer)
    //isthere();
  }, [props.qno]);

  const options = () => {
    if (!questions) return;
    //console.log(questions);
    let qnos = props.qno === undefined ? maintain[5] : props.qno;
    //var status = isthere() ? "ckecked" : null;
    // if (isthere()) {
    //   status = true;
    // } else {
    //   status = false;
    // }
    //console.log(qnos);
    let opt = [];
    for (let i = 0; i < questions[qnos].options.length; i++) {
      opt.push(
        <div key={questions[qnos].options[i]}>
          <input
            type={questions[qnos].type ? "checkbox" : "radio"}
            id={questions[qnos].options[i]}
            name='answer'
            value={true}
            //status
            onClick={() => handleClick(i, questions[qnos]._id)}
          />
          <label htmlFor={questions[qnos].options[i]}>
            {questions[qnos].options[i]}
          </label>
        </div>
      );
    }
    return opt;
  };

  return questions ? (
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
            {props.qno !== 0 ? (
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
            ) : null}
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
  ) : null;
}

export default Test;
