import React, { useEffect } from "react";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      props.store();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div>
        <h2>you are {props.score >= props.outof / 2 ? "passed" : "failed"}</h2>
        <h3>
          with {props.score} marks out of {props.outof} questions
        </h3>
        <h2>
          which means you submitted {props.outof - props.score} wrong answers
        </h2>
      </div>
    </div>
  );
}

export default Result;
