import React from "react";
import LoadingOverlay from "./LoadingOverlay";
import Course from "./Course";

class CourseList extends React.Component {
  render() {
    if (this.props.courseFetchFailed) {
      return (
        <section className="CourseList">
          <h2>Failed to fetch courses!</h2>
          <h3>
            <a href="http://data.uio.no/studies/v1/">API</a> may be down. Check{" "}
            <a href="https://data.uio.no/studies/v1/semester/18h/courses">
              here
            </a>{" "}
            to see if the API is available for semster courses for autumn 2018.
          </h3>
          <p>
            Manual course search may still be available. Try typing the exact
            code of the course whose schedule you want to add in the search
            field and hitting enter.
          </p>
        </section>
      );
    }
    return (
      <section className="CourseList">
        {this.props.pending && <LoadingOverlay />}
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
