import React from "react";

function CourseListHeader(props) {
  return (
    <section className="CourseListHeader">
      <h3>Courses</h3>
      <input
        onChange={props.changeHandler}
        className="searchField"
        value={props.searchValue}
        placeholder="Search..."
      />
    </section>
  );
}

export default CourseListHeader;
