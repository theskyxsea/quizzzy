import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Quiz(props) {
  const [data, setdata] = useState([]);
  localStorage.clear();
  useEffect(() => {
    axios
      .get("http://interviewapi.stgbuild.com/getQuizData")
      .then((response) => {
        setdata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let array = data.tests;
  //console.log(array);
  const clickHandler = (i, j, k) => {
    //console.log(i);
    props.setid(i);
    props.setques(j);
    props.setname(k);
    props.setqno(0);

    //console.log("clickHandler");
  };

  const titleList = () => {
    let list = [];
    for (let i = 0; i < array.length; i++) {
      list.push(
        <tr key={array ? array[i]._id : null}>
          {/* <td>{array ? array[i]._id : null}</td> */}
          <td>{array ? array[i].name : null}</td>
          <td className='count'>{array ? array[i].questions.length : null}</td>
          <td>
            <Link to='/Test/0'>
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
      <h2 className='App-header'>THE QUIZ APP</h2>
      <div className='tableholder'>
        <table>
          <tbody>
            <tr>
              {/* <th id='key'>Test Key</th> */}
              <th id='name'>Test Name</th>
              <th id='qty'>No of Questions</th>
              <th id='button'></th>
            </tr>
            {array ? titleList() : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Quiz;
