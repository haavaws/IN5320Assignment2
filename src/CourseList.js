import React from "react";
import LoadingOverlay from "./LoadingOverlay";
import Course from "./Course";

/**
 * Component for listing all courses provided in the courses field in props
 * Will provide an error message if the fetch for courses failed previously
 */
class CourseList extends React.Component {
  render() {
    /* Error message in case course fetch failed */
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
    /* Render the courses */
    return (
      <section className="CourseList">
        {/* Provide a loading overlay while waiting for courses to be fetched */}
        {this.props.pending && <LoadingOverlay />}
        {this.props.courses.map((course, index) => {
          /* Map the courses */
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
            /* Don't render the course if it doesn't match the filter string */
            return null;
          }
        })}
      </section>
    );
  }
}

export default CourseList;
