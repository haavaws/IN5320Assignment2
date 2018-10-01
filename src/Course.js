import React from "react";

function Course(props) {
  return (
    <li
      className={
        (props.activeCourse === props.code && "Course activeCourse") || "Course"
      }
      /* Set the onClick function to either getting or resetting the
      schedule, depending on whether the course is the active course or not*/
      onClick={
        (props.activeCourse === props.code && props.activeCourseClickHandler) ||
        props.courseClickHandler
      }
    >
      <p className="courseCode">{props.code}</p>
      <p className="courseName">{props.name}</p>
    </li>
  );
}

export default Course;
