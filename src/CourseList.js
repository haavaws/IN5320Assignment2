import React from "react";
import Course from "./Course";
import CourseListHeader from "./CourseListHeader";

function CourseList(props) {
  return (
    <section className="CourseList">
      <CourseListHeader
        changeHandler={props.inputChangeHandler}
        searchValue={props.searchValue}
      />
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
