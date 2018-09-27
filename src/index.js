import React from "react";
import ReactDOM from "react-dom";
import Courses from "./Courses";
import Schedule from "./Schedule";

import "./styles.css";

class App extends React.Component {
  state = {
    year: 18,
    semester: "h",
    scheduleCourseCode: ""
  };

  clearSchedule = () => {
    this.setState({
      scheduleCourseCode: ""
    });
  };

  courseClickHandler = async event => {
    const courseCode = event.currentTarget.childNodes[0].innerHTML;
    this.setState({
      scheduleCourseCode: courseCode
    });
  };

  render() {
    return (
      <section className="App">
        <Courses
          courseClickHandler={this.courseClickHandler}
          activeCourse={this.state.scheduleCourseCode}
          activeCourseClickHandler={this.clearSchedule}
          year={this.state.year}
          semester={this.state.semester}
        />
        {!(this.state.scheduleCourseCode === "") && (
          <Schedule
            courseCode={this.state.scheduleCourseCode}
            year={this.state.year}
            semester={this.state.semester}
          />
        ) /*|| <Loader />*/}
      </section>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
