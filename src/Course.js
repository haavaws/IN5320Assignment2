import React from "react";

function Course(props) {
  return (
    <li className="Course" onClick={props.clickHandler}>
      <p className="courseCode">{props.code}</p>
      <p className="courseName">{props.name}</p>
      <div className="border" />
    </li>
  );
}

export default Course;
