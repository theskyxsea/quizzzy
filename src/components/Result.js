import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Result(props) {
  const retrive = () => {
    let maintain = JSON.parse(window.localStorage.getItem("state"));
    return maintain;
  };
  let maintain = retrive();

  useEffect(() => {
    if (!props.id) {
      props.setid(maintain[0]);
      props.setques(maintain[1]);
      //props.setname(maintain[2]);
      //props.setanswers(maintain[3]);
      props.setscore(maintain[4]);
      //props.setqno(maintain[5]);
    }
    return () => {
      localStorage.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <h2>you are {props.score >= props.outof / 2 ? "passed" : "failed"}</h2>
        <h2>
          with {props.score > props.outof ? props.outof : props.score} marks out
          of {props.outof} questions
        </h2>
        <br />
        <h4>
          which means you submitted
          {` ${
            props.outof - props.score >= 0 ? props.outof - props.score : 0
          } `}
          wrong answers
        </h4>
        <Link to={"/"}>
          <button>Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Result;
