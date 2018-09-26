import React from "react";
import Course from "./Course";

function CourseList(props) {
  return (
    <section className="CourseList">
      {props.courses.map((course, index) => {
        if (
          course.code.toUpperCase().startsWith(props.searchValue.toUpperCase())
        )
          return (
            <Course
              activeCourse={props.activeCourse}
              activeCourseClickHandler={props.activeCourseClickHandler}
              courseClickHandler={props.courseClickHandler}
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
