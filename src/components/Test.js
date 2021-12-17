import React from "react";

function Test(props) {
  console.log(typeof props.ques);
  const questions = [props.ques];
  return (
    <div>
      <div>
        <div>welcome to test</div>
        {props && props.id}
        {props.name}
        {typeof questions}
        {/* {questions.map((x) => (
          <div key={x[0]}> {x[0]} </div>
        ))} */}
      </div>
    </div>
  );
}

export default Test;
