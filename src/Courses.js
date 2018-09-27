import React from "react";
import CourseList from "./CourseList";
import CourseListHeader from "./CourseListHeader";
import Loader from "./Loader";

class Courses extends React.Component {
  state = {
    courses: [],
    pending: false,
    searchValue: ""
  };

  async componentDidMount() {
    await this.setState({ pending: true });
    try {
      if (localStorage.age) {
        if (Date.now() - Number(localStorage.age) < 60 * 60 * 1000) {
          this.setState({
            courses: JSON.parse(localStorage.courses),
            pending: false
          });
        }
      }
      if (this.state.pending) {
        const response = await fetch(
          "https://data.uio.no/studies/v1/semester/" +
            this.props.year +
            this.props.semester +
            "/courses?lang=en"
        );
        const courses = (await response.json()).courses;

        localStorage.courses = JSON.stringify(courses);
        localStorage.age = Date.now().toString();
        this.setState({ courses: courses, pending: false });
      }
    } catch (e) {
      console.log("Failed to fetch courses!");
      console.log(e.message);
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
          changeHandler={this.inputChangeHandler}
          searchValue={this.state.searchValue}
        />
        {(!this.state.pending && (
          <CourseList
            activeCourse={this.props.activeCourse}
            activeCourseClickHandler={this.props.activeCourseClickHandler}
            courses={this.state.courses}
            courseClickHandler={this.props.courseClickHandler}
            searchValue={this.state.searchValue}
          />
        )) || <Loader />}
      </section>
    );
  }
}

export default Courses;
