import React from "react";
import CourseList from "./CourseList";
import CourseListHeader from "./CourseListHeader";

class Courses extends React.Component {
  state = {
    courses: [],
    pending: false,
    searchValue: "",
    courseFetchFailed: false
  };

  async componentDidMount() {
    var i;
    var storedCourses = [];
    var semesterCourses = {};

    await this.setState({ pending: true });
    try {
      if (localStorage.storedCourses) {
        storedCourses = JSON.parse(localStorage.storedCourses);
        for (i = 0; i < storedCourses.length; i++) {
          /* Remove any data more than an hour old */
          if (Date.now() - Number(storedCourses[i].age) > 60 * 60 * 1000) {
            storedCourses.splice(i, 1);
            i--;
          } else if (
            /* If there is unexpired data stored about the courses for
            the given semester, use that */
            storedCourses[i].semester ===
            this.props.year + this.props.semester
          ) {
            semesterCourses = storedCourses[i];
            await this.setState({
              courses: semesterCourses.courses,
              pending: false
            });
          }
        }
        localStorage.storedCourses = JSON.stringify(storedCourses);
      }
      if (this.state.pending) {
        var year = this.props.year;
        while (year >= 100) {
          year -= 100;
        }
        const response = await fetch(
          "https://data.uio.no/studies/v1/semester/" +
            year +
            this.props.semester +
            "/courses?lang=en"
        );
        const courses = (await response.json()).courses;

        semesterCourses = {
          courses: courses,
          age: Date.now(),
          semester: this.props.year + this.props.semester
        };

        storedCourses.push(semesterCourses);
        localStorage.storedCourses = JSON.stringify(storedCourses);
        this.setState({ courses: courses, pending: false });
      }
    } catch (e) {
      console.log("Failed to fetch courses!");
      console.log(e.message);
      this.setState({ courseFetchFailed: true });
    }
  }

  inputChangeHandler = event => {
    const newVal = event.target.value;
    this.setState({ searchValue: newVal });
  };

  render() {
    return (
      <section className="Courses">
        <CourseListHeader
          baseYear={this.props.baseYear}
          onKeyPressInputField={this.props.onKeyPressInputField}
          year={this.props.year}
          semester={this.props.semester}
          inputChangeHandler={this.inputChangeHandler}
          yearChangeHandler={this.props.yearChangeHandler}
          semesterChangeHandler={this.props.semesterChangeHandler}
          searchValue={this.state.searchValue}
        />
        <CourseList
          courseFetchFailed={this.state.courseFetchFailed}
          pending={this.state.pending}
          activeCourse={this.props.activeCourse}
          activeCourseClickHandler={this.props.activeCourseClickHandler}
          courses={this.state.courses}
          courseClickHandler={this.props.courseClickHandler}
          searchValue={this.state.searchValue}
        />
      </section>
    );
  }
}

export default Courses;
