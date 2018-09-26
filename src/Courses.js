import React from "react";
import CourseList from "./CourseList";
import CourseListHeader from "./CourseListHeader";

function Courses(props) {
  return (
    <section className="Courses">
      <CourseListHeader
        changeHandler={props.changeHandler}
        searchValue={props.searchValue}
      />
      <CourseList
        activeCourse={props.activeCourse}
        activeCourseClickHandler={props.activeCourseClickHandler}
        courses={props.courses}
        courseClickHandler={props.courseClickHandler}
        searchValue={props.searchValue}
      />
    </section>
  );
}

export default Courses;
