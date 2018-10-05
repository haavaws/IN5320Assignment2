import React from "react";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleGroupList from "./ScheduleGroupList";

/**
 * Component for showing the schedule section of the web application
 * Contains a header and content section
 */
class Schedule extends React.Component {
  state = {
    /* Course code to determine if the course code has changed since the last render */
    courseCode: "",
    /* The schedule of the selected course */
    schedule: [],
    /* The title of the currently selected group schedule */
    groupTitle: "",
    /* Is the schedule currently loading? */
    schedulePending: false,
    /* Did the schedule fetch fail? */
    scheduleFetchFailed: false
  };
  /**
   * Handles the click of the check mark in the header setting all events to selected
   * Calls a function provided in props, to change the state of a parent component
   */
  selectAllClickHandler = event => {
    this.props.selectAllEvents(this.state.schedule);
  };

  /**
   * Handles the click of the chekc mark in the group schedule box setting all associated events
   * to selected. Calls a function provided in props, to change the state of a parent component.
   */
  groupSelectAllClickHandler = event => {
    event.stopPropagation();
    for (const groupSchedule of this.state.schedule) {
      if (
        event.currentTarget.parentNode.childNodes[0].innerHTML ===
        groupSchedule.activityTitle
      ) {
        this.props.selectAllGroupEvents(groupSchedule);
        return;
      }
    }
  };

  /**
   * Making sure to retrieve a new schedule if the course-year-semester combo has changed
   */
  componentWillMount(props) {
    this.getSchedule();
  }

  /**
   * Handles the click of a group schedule
   * The group schedule will expand to show all its associated events
   */
  groupClickHandler = async event => {
    const groupTitle =
      event.currentTarget.childNodes[0].childNodes[0].innerHTML;
    await this.setState({ groupTitle: groupTitle });
  };

  /**
   * Clear the selection of group schedule, when clicking a selected group schedule
   * or another
   */
  clearGroupSchedule = event => {
    this.setState({ groupTitle: "" });
  };

  /**
   * Sort the schedule into group schedules, with all events of the same group being together
   */
  sortSchedules = schedule => {
    var scheduleGroups = [];
    var i;
    var j;

    /* Categorize the schedule events */
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

  /**
   * Retrieve the schedule using the UiO data API
   */
  getSchedule = async () => {
    this.setState({
      courseCode: this.props.courseCode,
      schedule: [],
      schedulePending: true,
      selectedEvents: [],
      groupTitle: ""
    });

    /* Fetch the schedule */
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
      /* Signify that the schedule fetch failed */
      this.setState({ scheduleFetchFailed: true });
    }
  };

  /**
   * Render the schedule section
   * Contains a header and the schedule
   */
  render() {
    /* If the course has changed since the last time, fetch the new schedul */
    if (!(this.state.courseCode === this.props.courseCode)) this.getSchedule();

    /* Render the header and schedule groups */
    return (
      <section className="Schedule">
        <ScheduleHeader
          selectAllClickHandler={this.selectAllClickHandler}
          handleBackClick={this.props.handleBackClick}
          handleSelectAll={this.props.scheduleSelectAll}
          courseCode={this.props.courseCode}
          schedule={this.state.schedule}
          selectedEvents={this.props.selectedEvents}
        />
        <ScheduleGroupList
          selectAllGroupEventsClickHandler={this.groupSelectAllClickHandler}
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
