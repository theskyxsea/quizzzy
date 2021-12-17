import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Quiz(props) {
  const [data, setdata] = useState([]);

  useEffect(() => {
    props.setstart(false);
    axios
      .get("http://interviewapi.stgbuild.com/getQuizData")
      .then((response) => {
        setdata(response.data);
      })
      .then((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //console.log(data);
  let array = data.tests;
  console.log(array);
  const clickHandler = (i, j, k) => {
    // console.log(i);
    // console.log(j);
    if (props.start) return;
    props.setid(i);
    props.setques(j);
    props.setname(k);
    props.setstart(true);
  };

  const titleList = () => {
    let list = [];
    for (let i = 0; i < array.length; i++) {
      list.push(
        <tr key={array ? array[i]._id : null}>
          {/* <td>{array ? array[i]._id : null}</td> */}
          <td>{array ? array[i].name : null}</td>
          <td>{array ? array[i].questions.length : null}</td>
          <td>
            <Link to='/Test'>
              <button
                onClick={() => {
                  clickHandler(array[i]._id, array[i].questions, array[i].name);
                }}>
                Start Test
              </button>
            </Link>
          </td>
        </tr>
      );
    }
    return list;
  };

  return (
    <div>
      The Quiz App
      <table>
        <tbody>
          <tr>
            <th id='key'>Test Key</th>
            <th id='name'>Test Name</th>
            <th id='qty'>No of Questions</th>
            <th id='button'></th>
          </tr>
          {array ? titleList() : null}
        </tbody>
      </table>
    </div>
  );
}

export default Quiz;
