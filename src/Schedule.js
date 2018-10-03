import React from "react";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleGroupList from "./ScheduleGroupList";

class Schedule extends React.Component {
  state = {
    courseCode: "",
    schedule: [],
    groupTitle: "",
    schedulePending: false
  };

  componentWillMount(props) {
    this.getSchedule();
  }

  groupClickHandler = async event => {
    const groupTitle = event.currentTarget.childNodes[0].innerHTML;
    this.setState({ groupTitle: groupTitle });
  };

  clearGroupSchedule = () => {
    this.setState({ groupTitle: "" });
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

  getSchedule = async () => {
    this.setState({
      courseCode: this.props.courseCode,
      schedule: [],
      schedulePending: true,
      selectedEvents: [],
      groupTitle: ""
    });
    try {
      var year = this.props.year;
      while (year >= 100) {
        year -= 100;
      }
      const response = await fetch(
        "https://data.uio.no/studies/v1/course/" +
          this.props.courseCode +
          "/semester/" +
          year +
          this.props.semester +
          "/schedule"
      );
      const schedule = (await response.json()).events;
      const scheduleGroups = await this.sortSchedules(schedule);
      this.setState({
        schedule: scheduleGroups,
        schedulePending: false
      });
    } catch (e) {
      console.log("Failed to fetch course schedule!");
      console.log(e.message);
    }
  };

  render() {
    if (!(this.state.courseCode === this.props.courseCode)) this.getSchedule();

    return (
      <section className="Schedule">
        <ScheduleHeader courseCode={this.props.courseCode} />
        <ScheduleGroupList
          pending={this.state.schedulePending}
          activeGroupClickHandler={this.clearGroupSchedule}
          schedule={this.state.schedule}
          groupTitle={this.state.groupTitle}
          selectedEvents={this.props.selectedEvents}
          groupClickHandler={this.groupClickHandler}
          eventClickHandler={this.props.eventClickHandler}
        />
      </section>
    );
  }
}

export default Schedule;
