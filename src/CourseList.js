import React from "react";
import Course from "./Course";

function CourseList(props) {
  return (
    <section className="CourseList">
      {console.log(props.courses)}
      {props.courses.map((course, index) => {
        if (
          course.code.toUpperCase().startsWith(props.searchValue.toUpperCase())
        )
          return (
            <Course
              clickHandler={props.clickHandler}
              key={index}
              name={course.name}
              code={course.code}
            />
          );
        else {
          return null;
        }
      })}
    </section>
  );
}

export default CourseList;
