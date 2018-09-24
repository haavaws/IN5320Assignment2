import React from "react";
import ReactDOM from "react-dom";
import CourseList from "./CourseList";
import CourseListHeader from "./CourseListHeader";
import Schedule from "./Schedule";

import "./styles.css";

class App extends React.Component {
  state = {
    courses: [],
    pending: false,
    year: 18,
    semester: "h",
    searchValue: "",
    schedule: [],
    schedulePending: true
  };

  inputChangeHandler = event => {
    const newVal = event.target.value;
    this.setState({ searchValue: newVal });
  };

  courseClickHandler = async event => {
    this.setState({ schedule: [], schedulePending: true });
    try {
      const courseCode = event.currentTarget.childNodes[0].innerHTML;
      const response = await fetch(
        "https://data.uio.no/studies/v1/course/" +
          courseCode +
          "/semester/" +
          this.state.year +
          this.state.semester +
          "/schedule"
      );
      const schedule = (await response.json()).events;
      this.setState({ schedule: schedule, schedulePending: false });
      console.log(schedule);
    } catch (e) {
      console.log("Failed to fetch course schedule!");
      console.log(e.message);
    }
  };

  async componentDidMount() {
    this.setState({ pending: true });
    console.log(this.state.pending);
    try {
      if (localStorage.age) {
        console.log(this.state.pending);
        if (Date.now() - Number(localStorage.age) < 60 * 60 * 1000) {
          this.setState({
            courses: JSON.parse(localStorage.courses),
            pending: false
          });
        } else {
          console.log("BAAAD");
          console.log(this.state.pending);
        }
      }
      if (this.state.pending) {
        const response = await fetch(
          "https://data.uio.no/studies/v1/semester/" +
            this.state.year +
            this.state.semester +
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

  render() {
    if (this.state.pending) {
      return <div className="loader">Loading...</div>;
    }
    return (
      <section className="App">
        {console.log("courses")}
        <section className="CourseSection">
          <CourseListHeader
            changeHandler={this.inputChangeHandler}
            searchValue={this.state.searchValue}
          />
          <CourseList
            clickHandler={this.courseClickHandler}
            courses={this.state.courses}
            searchValue={this.state.searchValue}
          />
        </section>
      </section>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
