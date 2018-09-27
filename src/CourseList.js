import React from "react";
import Course from "./Course";

class CourseList extends React.Component {
  render() {
    return (
      <section className="CourseList">
        {this.props.courses.map((course, index) => {
          if (
            course.code
              .toUpperCase()
              .startsWith(this.props.searchValue.toUpperCase())
          )
            return (
              <Course
                activeCourse={this.props.activeCourse}
                activeCourseClickHandler={this.props.activeCourseClickHandler}
                courseClickHandler={this.props.courseClickHandler}
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
}

export default CourseList;
