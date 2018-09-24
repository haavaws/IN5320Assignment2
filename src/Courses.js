import React from "react";
import Course from "./Course";
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
        courses={props.courses}
        clickHandler={props.clickHandler}
        searchValue={props.searchValue}
      />
    </section>
  );
}

export default Courses;
