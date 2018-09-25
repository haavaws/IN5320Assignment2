import React from "react";
import ReactDOM from "react-dom";
import Courses from "./Courses";
import Schedule from "./Schedule";
import Loader from "./Loader";

import "./styles.css";

class App extends React.Component {
  state = {
    courses: [],
    pending: false,
    year: 18,
    semester: "h",
    searchValue: "",
    schedule: [],
    schedulePending: true,
    scheduleCourseCode: "",
    groupTitle: ""
  };

  sortSchedules = schedule => {
    var scheduleGroups = [];
    var i;
    var j;

    /* Categories the schedule events */
    for (i = 0; i < schedule.length; i++) {
      for (j = 0; j < scheduleGroups.length; j++) {
        if (schedule[i].activityTitle === scheduleGroups[j].activityTitle) {
          scheduleGroups[j].events.push(schedule[i]);
          break;
        }
      }
      if (j === scheduleGroups.length) {
        scheduleGroups.push({});
        scheduleGroups[j].activityTitle = schedule[i].activityTitle;
        scheduleGroups[j].events = [];
        scheduleGroups[j].events.push(schedule[i]);
      }
    }

    /* Sort the categories according to their names */
    for (i = 0; i < scheduleGroups.length; i++) {
      for (j = 0; j < scheduleGroups.length - 1; j++) {
        if (
          scheduleGroups[j].activityTitle > scheduleGroups[j + 1].activityTitle
        ) {
          var tmp = scheduleGroups[j];
          scheduleGroups[j] = scheduleGroups[j + 1];
          scheduleGroups[j + 1] = tmp;
        }
      }
    }
    return scheduleGroups;
  };

  inputChangeHandler = event => {
    const newVal = event.target.value;
    this.setState({ searchValue: newVal });
  };

  scheduleGroupClickHandler = async event => {
    const groupTitle =
      event.currentTarget.childNodes[0].childNodes[0].innerHTML;
    this.setState({ groupTitle: groupTitle });
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
      const scheduleGroups = await this.sortSchedules(schedule);
      this.setState({
        schedule: scheduleGroups,
        schedulePending: false,
        scheduleCourseCode: courseCode
      });
    } catch (e) {
      console.log("Failed to fetch course schedule!");
      console.log(e.message);
    }
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
      return <Loader />;
    }
    return (
      <section className="App">
        <Courses
          changeHandler={this.inputChangeHandler}
          clickHandler={this.courseClickHandler}
          courses={this.state.courses}
          searchValue={this.state.searchValue}
        />
        {!this.state.schedulePending && (
          <Schedule
            clickHandler={this.scheduleGroupClickHandler}
            courseCode={this.state.scheduleCourseCode}
            schedule={this.state.schedule}
            groupTitle={this.state.groupTitle}
          />
        ) /*|| <Loader />*/}
      </section>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
